import type { VercelRequest, VercelResponse } from '@vercel/node';

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

  try {
    // Get current view count first
    const getResponse = await fetch(
      `${supabaseUrl}/rest/v1/design_projects?id=eq.${designId}&select=views`,
      {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
        },
      }
    );

    const data = await getResponse.json();
    const currentViews = data[0]?.views || 0;

    // Increment view count
    const response = await fetch(
      `${supabaseUrl}/rest/v1/design_projects?id=eq.${designId}`,
      {
        method: 'PATCH',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({
          views: currentViews + 1
        })
      }
    );

    if (!response.ok) {
      throw new Error('Failed to increment view count');
    }

    const updatedData = await response.json();
    
    return res.status(200).json({ 
      success: true, 
      views: updatedData[0]?.views || 0 
    });
  } catch (error) {
    console.error('Error incrementing view:', error);
    return res.status(500).json({ error: 'Failed to increment view count' });
  }
}
