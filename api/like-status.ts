import type { VercelRequest, VercelResponse } from '@vercel/node';

// Helper function to get client IP
function getClientIp(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  const ip = forwarded 
    ? (typeof forwarded === 'string' ? forwarded.split(',')[0] : forwarded[0])
    : req.headers['x-real-ip'] || req.socket?.remoteAddress || 'unknown';
  
  return typeof ip === 'string' ? ip : 'unknown';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { designId } = req.query;

  if (!designId || typeof designId !== 'string') {
    return res.status(400).json({ error: 'Design ID is required' });
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ error: 'Supabase configuration missing' });
  }

  const ipAddress = getClientIp(req);

  try {
    // Check if user already liked this design
    const response = await fetch(
      `${supabaseUrl}/rest/v1/design_likes?design_id=eq.${designId}&ip_address=eq.${ipAddress}`,
      {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
        },
      }
    );

    const data = await response.json();
    const hasLiked = data.length > 0;

    return res.status(200).json({ 
      success: true, 
      liked: hasLiked 
    });
  } catch (error) {
    console.error('Error checking like status:', error);
    return res.status(500).json({ error: 'Failed to check like status' });
  }
}
