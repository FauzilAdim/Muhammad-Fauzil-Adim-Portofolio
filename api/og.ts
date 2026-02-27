import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { design } = req.query;

  if (!design) {
    return res.status(400).json({ error: 'Design ID is required' });
  }

  // Use environment variables without VITE_ prefix for serverless functions
  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ error: 'Supabase configuration missing' });
  }

  try {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/design_projects?id=eq.${design}&select=*`,
      {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
        },
      }
    );

    const data = await response.json();
    const designData = data[0];

    if (!designData) {
      // Redirect to homepage if design not found
      return res.redirect(302, '/');
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
    <meta property="og:url" content="https://muhammad-fauzil-adim.vercel.app/design/${design}" />
    <meta property="og:title" content="${designData.name} - Muhammad Fauzil Adim" />
    <meta property="og:description" content="${designData.description || 'View my design project'}" />
    <meta property="og:image" content="${designData.cover_image}" />
    <meta property="og:image:secure_url" content="${designData.cover_image}" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${designData.name}" />
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="https://muhammad-fauzil-adim.vercel.app/design/${design}" />
    <meta name="twitter:title" content="${designData.name} - Muhammad Fauzil Adim" />
    <meta name="twitter:description" content="${designData.description || 'View my design project'}" />
    <meta name="twitter:image" content="${designData.cover_image}" />
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    
    <meta http-equiv="refresh" content="0;url=/?design=${design}">
  </head>
  <body class="font-inter bg-dark-900">
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <p>Redirecting...</p>
  </body>
</html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    return res.status(200).send(html);
  } catch (error) {
    console.error('Error fetching design:', error);
    return res.redirect(302, '/');
  }
}
