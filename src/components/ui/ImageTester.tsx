import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const ImageTester = () => {
  const [testUrl, setTestUrl] = useState('');
  const [storageUrl, setStorageUrl] = useState('');

  const generateTestUrl = () => {
    // Test with a known file from storage
    const { data } = supabase.storage.from('immagini').getPublicUrl('blog/test-image.jpg');
    setStorageUrl(data.publicUrl);
  };

  return (
    <div className="p-4 border rounded-lg bg-card">
      <h3 className="font-semibold mb-4">Image URL Tester</h3>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Test URL:</label>
          <Input 
            value={testUrl} 
            onChange={(e) => setTestUrl(e.target.value)}
            placeholder="Paste image URL to test"
          />
          {testUrl && (
            <div className="mt-2">
              <img 
                src={testUrl} 
                alt="Test image" 
                className="max-w-full h-auto max-h-40 border rounded"
                onLoad={() => console.log('✅ Image loaded successfully:', testUrl)}
                onError={(e) => console.error('❌ Image failed to load:', testUrl, e)}
              />
            </div>
          )}
        </div>

        <div>
          <Button onClick={generateTestUrl}>Generate Storage URL</Button>
          {storageUrl && (
            <div className="mt-2">
              <p className="text-sm text-muted-foreground">Generated URL:</p>
              <code className="text-xs bg-muted p-1 rounded">{storageUrl}</code>
              <img 
                src={storageUrl} 
                alt="Storage test" 
                className="mt-2 max-w-full h-auto max-h-40 border rounded"
                onLoad={() => console.log('✅ Storage image loaded:', storageUrl)}
                onError={(e) => console.error('❌ Storage image failed:', storageUrl, e)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};