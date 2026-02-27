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
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { designId } = req.body;

  if (!designId) {
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
    const checkResponse = await fetch(
      `${supabaseUrl}/rest/v1/design_likes?design_id=eq.${designId}&ip_address=eq.${ipAddress}`,
      {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
        },
      }
    );

    const existingLikes = await checkResponse.json();
    const hasLiked = existingLikes.length > 0;

    if (hasLiked) {
      // Unlike: Remove from design_likes and decrement count
      await fetch(
        `${supabaseUrl}/rest/v1/design_likes?design_id=eq.${designId}&ip_address=eq.${ipAddress}`,
        {
          method: 'DELETE',
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
          },
        }
      );

      // Decrement like count
      await fetch(
        `${supabaseUrl}/rest/v1/rpc/decrement_likes`,
        {
          method: 'POST',
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ design_id: designId })
        }
      );

      return res.status(200).json({ 
        success: true, 
        liked: false,
        message: 'Like removed'
      });
    } else {
      // Like: Add to design_likes and increment count
      await fetch(
        `${supabaseUrl}/rest/v1/design_likes`,
        {
          method: 'POST',
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            design_id: designId,
            ip_address: ipAddress
          })
        }
      );

      // Increment like count
      await fetch(
        `${supabaseUrl}/rest/v1/rpc/increment_likes`,
        {
          method: 'POST',
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ design_id: designId })
        }
      );

      return res.status(200).json({ 
        success: true, 
        liked: true,
        message: 'Like added'
      });
    }
  } catch (error) {
    console.error('Error toggling like:', error);
    return res.status(500).json({ error: 'Failed to toggle like' });
  }
}
