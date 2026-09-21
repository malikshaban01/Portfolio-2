import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    const { data: cats, error: catErr } = await supabase
      .from('skill_categories')
      .select('*')
      .order('order_index', { ascending: true });
    if (catErr) throw catErr;

    const { data: skills, error: skErr } = await supabase
      .from('skills')
      .select('*')
      .order('id', { ascending: true });
    if (skErr) throw skErr;

    const grouped = cats.map(c => ({
      id: c.id,
      name: c.name,
      icon: c.icon,
      skills: skills.filter(s => s.category_id === c.id).map(s => s.name),
    }));

    return res.status(200).json(grouped);
  } catch (err) {
    console.error('skills API:', err);
    return res.status(500).json({ error: err.message });
  }
}
