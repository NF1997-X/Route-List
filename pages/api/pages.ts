import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

export default async function handler(req, res) {
  try {
    console.log('Create page request body:', req.body);

    const supabase = createServerSupabaseClient({ req, res });

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.error('Session error:', sessionError);
    }

    const user = session?.user;
    if (!user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const { data, error } = await supabase.from('pages').insert({
      title: req.body.title,
      content: req.body.content,
      user_id: user.id,
    });

    if (error) {
      console.error('Create page failed:', error);
      return res.status(500).json({ message: 'Failed to create page', detail: error.message || error });
    }

    return res.status(201).json({ message: 'Page created successfully', data });
  } catch (err) {
    console.error('Create page failed:', err);
    return res.status(500).json({ message: 'Failed to create page', detail: err.message || err });
  }
}