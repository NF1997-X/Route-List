import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export async function createPageClient(title, content) {
  const { data: userData, error: userErr } = await supabase.auth.getUser();
  if (userErr || !userData?.user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('pages')
    .insert({ title, content, owner: userData.user.id }); // <-- adjust key to your column

  if (error) throw error;
  return data;
}

// pages/api/pages.ts (server)
// await supabase.from('pages').insert({
//   title: req.body.title,
//   content: req.body.content,
//   user_id: user.id // atau user_id berdasarkan schema
// });