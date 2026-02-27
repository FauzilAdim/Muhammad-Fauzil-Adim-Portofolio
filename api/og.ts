import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { design } = req.query;

  if (!design) {
    return res.status(400).json({ error: 'Design ID is required' });
  }

  // Fetch design data from Supabase
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

  try {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/design_projects?id=eq.${design}&select=*`,
      {
        headers: {
          'apikey': supabaseKey!,
          'Authorization': `Bearer ${supabaseKey}`,
        },
      }
    );

    const data = await response.json();
    const designData = data[0];

    if (!designData) {
      return res.status(404).json({ error: 'Design not found' });
    }

    // Generate HTML with dynamic meta tags
    const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <link rel="icon" type="image/x-icon" href="/Logo.png" />
    <title>${designData.name} - Muhammad Fauzil Adim</title>
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://muhammad-fauzil-adim.vercel.app/?design=${design}" />
    <meta property="og:title" content="${designData.name} - Muhammad Fauzil Adim" />
    <meta property="og:description" content="${designData.description}" />
    <meta property="og:image" content="${designData.cover_image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://muhammad-fauzil-adim.vercel.app/?design=${design}" />
    <meta property="twitter:title" content="${designData.name} - Muhammad Fauzil Adim" />
    <meta property="twitter:description" content="${designData.description}" />
    <meta property="twitter:image" content="${designData.cover_image}" />
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    
    <script>
      // Redirect to main app with design parameter
      window.location.href = '/?design=${design}';
    </script>
  </head>
  <body class="font-inter bg-dark-900">
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <script src="/src/index.tsx" type="module"></script>
  </body>
</html>
    `;

    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(html);
  } catch (error) {
    console.error('Error fetching design:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
