import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Helper: Get GSC Access Token
async function getGSCAccessToken(supabaseUrl: string, supabaseKey: string): Promise<string | null> {
  try {
    const tokenManagerUrl = `${supabaseUrl}/functions/v1/gsc-token-manager`;
    const response = await fetch(tokenManagerUrl, {
      headers: { 'Authorization': `Bearer ${supabaseKey}` },
    });

    if (!response.ok) {
      console.log('⚠️ GSC token manager not available or not authorized');
      return null;
    }

    const data = await response.json();
    return data.success ? data.accessToken : null;
  } catch (error) {
    console.error('Failed to get GSC access token:', error);
    return null;
  }
}

// Helper: Check URL with Google Search Console API
async function checkURLWithGSC(url: string, accessToken: string) {
  try {
    const inspectUrl = 'https://searchconsole.googleapis.com/v1/urlInspection/index:inspect';
    
    const response = await fetch(inspectUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inspectionUrl: url,
        siteUrl: 'https://www.muvfitness.it/',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('GSC API error:', response.status, errorText);
      return null;
    }

    const data = await response.json();
    console.log('✅ GSC API response for', url);
    
    return {
      verdict: data.inspectionResult?.indexStatusResult?.verdict || 'UNKNOWN',
      coverageState: data.inspectionResult?.indexStatusResult?.coverageState,
      lastCrawlTime: data.inspectionResult?.indexStatusResult?.lastCrawlTime,
      mobileUsable: data.inspectionResult?.mobileUsabilityResult?.verdict === 'PASS',
    };
  } catch (error) {
    console.error('GSC inspection failed for', url, error);
    return null;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('🔍 Starting SEO Monitor check...');

    // Try to get GSC access token
    const gscAccessToken = await getGSCAccessToken(supabaseUrl, supabaseServiceKey);
    const useGSCAPI = !!gscAccessToken;
    
    if (useGSCAPI) {
      console.log('✅ GSC API available - using official Google Search Console data');
    } else {
      console.log('⚠️ GSC API not available - using HTTP fallback');
    }

    // 1. Fetch published posts
    const { data: posts, error: postsError } = await supabase
      .from('blog_posts')
      .select('id, slug, title, meta_title, meta_description, featured_image, content, published_at, updated_at')
      .eq('status', 'published');

    if (postsError) {
      console.error('Error fetching posts:', postsError);
      throw postsError;
    }

    if (!posts || posts.length === 0) {
      console.log('No published posts found');
      return new Response(JSON.stringify({ error: 'No published posts' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    console.log(`📊 Checking ${posts.length} articles...`);

    const results = [];

    // 2. Check each article
    for (const post of posts) {
      const url = `https://www.muvfitness.it/${post.slug}`;
      
      let gscData = null;
      let gscError = null;

      // Try GSC API first if available
      if (useGSCAPI && gscAccessToken) {
        gscData = await checkURLWithGSC(url, gscAccessToken);
        if (!gscData) {
          gscError = 'GSC API check failed';
        }
        // Respect rate limits: 4 requests/sec max
        await new Promise(resolve => setTimeout(resolve, 250));
      }
      
      try {
        // Verify HTTP accessibility (always as backup)
        const startTime = Date.now();
        const checkResponse = await fetch(url, { 
          method: 'HEAD',
          headers: { 'User-Agent': 'MUV-SEO-Monitor/1.0' }
        });
        const responseTime = Date.now() - startTime;

        // Determine indexing status based on GSC data or HTTP fallback
        let indexingStatus = 'unknown';
        const daysSincePublish = Math.floor((Date.now() - new Date(post.published_at).getTime()) / (1000 * 60 * 60 * 24));
        
        if (gscData) {
          // Use GSC verdict for accurate status
          if (gscData.verdict === 'PASS') {
            indexingStatus = 'indexed';
          } else if (gscData.verdict === 'PARTIAL') {
            indexingStatus = 'partially_indexed';
          } else if (gscData.verdict === 'FAIL') {
            indexingStatus = 'not_indexed';
          } else if (gscData.coverageState === 'Submitted and indexed') {
            indexingStatus = 'indexed';
          } else if (gscData.coverageState?.includes('Discovered')) {
            indexingStatus = 'discovered';
          } else {
            indexingStatus = 'pending';
          }
        } else {
          // HTTP fallback logic
          if (checkResponse.status === 200) {
            if (daysSincePublish > 7) {
              indexingStatus = 'indexed';
            } else if (daysSincePublish >= 0) {
              indexingStatus = 'pending_first_check';
            }
          } else if (checkResponse.status >= 400) {
            indexingStatus = 'error';
          } else {
            indexingStatus = 'crawled_not_indexed';
          }
        }

        // Normalize status to match DB constraint
        const normalizeStatus = (status: string, daysSincePublish: number): string => {
          if (status === 'partially_indexed') return 'indexed';
          if (status === 'not_indexed' || status === 'discovered') return 'crawled_not_indexed';
          if (status === 'pending') return 'pending_first_check';
          if (status === 'unknown') return daysSincePublish < 7 ? 'pending_first_check' : 'crawled_not_indexed';
          return status;
        };

        indexingStatus = normalizeStatus(indexingStatus, daysSincePublish);

        // 3. Check historical data
        const { data: lastCheck } = await supabase
          .from('seo_monitoring_log')
          .select('indexing_status, check_date, days_in_current_status')
          .eq('post_id', post.id)
          .order('check_date', { ascending: false })
          .limit(1)
          .single();

        let daysInStatus = 0;
        let statusChangedFrom = null;

        if (lastCheck) {
          if (lastCheck.indexing_status === indexingStatus) {
            // Status unchanged, calculate days since last check
            const daysSinceLastCheck = Math.floor((Date.now() - new Date(lastCheck.check_date).getTime()) / (1000 * 60 * 60 * 24));
            daysInStatus = (lastCheck.days_in_current_status || 0) + daysSinceLastCheck;
          } else {
            // Status changed
            statusChangedFrom = lastCheck.indexing_status;
            daysInStatus = 0;
          }
        } else {
          // First check
          daysInStatus = daysSincePublish;
        }

        // 4. Detect issues and generate suggestions
        const issues: string[] = [];
        const suggestions: string[] = [];

        // Check for critical status (>14 days not indexed)
        if ((indexingStatus === 'crawled_not_indexed' || indexingStatus === 'pending_first_check') && daysInStatus > 14) {
          issues.push('Articolo non indicizzato da oltre 14 giorni');
          suggestions.push('Aggiornare contenuto e data di modifica');
          suggestions.push('Richiedere indicizzazione manuale in Google Search Console');
          suggestions.push('Verificare presenza in sitemap.xml');
        }

        // Check meta description
        if (!post.meta_description || post.meta_description.length < 120) {
          issues.push('Meta description assente o troppo corta');
          suggestions.push('Scrivere meta description tra 150-160 caratteri con keyword principale');
        }

        // Check featured image
        if (!post.featured_image) {
          issues.push('Immagine in evidenza mancante');
          suggestions.push('Aggiungere featured image ottimizzata (min 1200x630px)');
        }

        // Check content length
        const contentLength = post.content?.length || 0;
        if (contentLength < 800) {
          issues.push('Contenuto troppo breve');
          suggestions.push('Espandere contenuto ad almeno 1000-1500 parole');
        }

        // Check title
        const titleToCheck = post.meta_title || post.title;
        if (titleToCheck && titleToCheck.length < 30) {
          issues.push('Title troppo corto');
          suggestions.push('Espandere title a 50-60 caratteri con keyword');
        }

        if (titleToCheck && titleToCheck.length > 60) {
          issues.push('Title troppo lungo');
          suggestions.push('Ridurre title sotto i 60 caratteri');
        }

        // 5. Insert log with GSC data
        const { error: insertError } = await supabase
          .from('seo_monitoring_log')
          .insert({
            post_id: post.id,
            url,
            indexing_status: indexingStatus,
            title: post.meta_title || post.title,
            meta_description: post.meta_description,
            canonical_url: url,
            featured_image: post.featured_image,
            response_time_ms: responseTime,
            http_status_code: checkResponse.status,
            days_in_current_status: daysInStatus,
            status_changed_from: statusChangedFrom,
            issues_detected: issues,
            suggestions: suggestions,
            check_date: new Date().toISOString(),
            // GSC API fields
            gsc_verdict: gscData?.verdict || null,
            gsc_coverage_state: gscData?.coverageState || null,
            gsc_last_crawl_time: gscData?.lastCrawlTime || null,
            gsc_mobile_usable: gscData?.mobileUsable || null,
            gsc_check_error: gscError,
          });

        if (insertError) {
          console.error(`Error inserting log for ${post.slug}:`, insertError);
        }

        results.push({
          slug: post.slug,
          status: indexingStatus,
          daysInStatus,
          issuesCount: issues.length,
          httpStatus: checkResponse.status,
          gscVerdict: gscData?.verdict || null
        });

        console.log(`✅ ${post.slug}: ${indexingStatus} ${gscData?.verdict ? `(GSC: ${gscData.verdict})` : ''} (${daysInStatus}d) - ${issues.length} issues`);

      } catch (error) {
        console.error(`Error checking ${post.slug}:`, error);
        
        // Log error status
        await supabase.from('seo_monitoring_log').insert({
          post_id: post.id,
          url,
          indexing_status: 'error',
          title: post.meta_title || post.title,
          issues_detected: [`Error checking URL: ${String(error)}`],
          suggestions: ['Verificare accessibilità URL manualmente'],
          check_date: new Date().toISOString(),
          gsc_check_error: String(error)
        });

        results.push({
          slug: post.slug,
          status: 'error',
          error: String(error)
        });
      }
    }

    // 6. Update summary
    const indexed = results.filter(r => r.status === 'indexed').length;
    const crawledNotIndexed = results.filter(r => r.status === 'crawled_not_indexed' || r.status === 'pending_first_check').length;
    const critical = results.filter(r => 
      (r.status === 'crawled_not_indexed' || r.status === 'pending_first_check') && 
      (r.daysInStatus || 0) > 14
    ).length;

    await supabase.from('seo_monitoring_summary').upsert([
      { metric_name: 'total_articles', metric_value: results.length, updated_at: new Date().toISOString() },
      { metric_name: 'indexed_articles', metric_value: indexed, updated_at: new Date().toISOString() },
      { metric_name: 'crawled_not_indexed', metric_value: crawledNotIndexed, updated_at: new Date().toISOString() },
      { metric_name: 'critical_articles', metric_value: critical, updated_at: new Date().toISOString() }
    ], { onConflict: 'metric_name' });

    console.log(`📈 Summary: ${indexed} indexed, ${crawledNotIndexed} not indexed, ${critical} critical`);
    console.log(`🔑 GSC API: ${useGSCAPI ? 'ENABLED' : 'DISABLED'}`);

    return new Response(JSON.stringify({
      success: true,
      checked: results.length,
      indexed,
      crawledNotIndexed,
      critical,
      gscEnabled: useGSCAPI,
      results
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('SEO Monitor error:', error);
    return new Response(JSON.stringify({ 
      error: 'SEO Monitor failed',
      details: String(error)
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
