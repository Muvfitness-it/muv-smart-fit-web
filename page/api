import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end('Method Not Allowed')
  }

  const baseUrl = 'https://www.muvfitness.it'

  const twoDaysAgo = new Date()
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 7)

  const { data: articoli, error } = await supabase
    .from('articoli')
    .select('slug, titolo, data_pubblicazione')
    .gte('data_pubblicazione', twoDaysAgo.toISOString())
    .order('data_pubblicazione', { ascending: false })

  if (error) {
    return res.status(500).send('Errore nel recupero articoli da Supabase')
  }

  const xmlItems = articoli.map(a => `
    <url>
      <loc>${baseUrl}/blog/${a.slug}</loc>
      <news:news>
        <news:publication>
          <news:name>MUV Fitness</news:name>
          <news:language>it</news:language>
        </news:publication>
        <news:publication_date>${a.data_pubblicazione}</news:publication_date>
        <news:title><![CDATA[${a.titolo}]]></news:title>
      </news:news>
    </url>
  `).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${xmlItems}
</urlset>`

  res.setHeader('Content-Type', 'application/xml')
  res.status(200).send(xml)
}
