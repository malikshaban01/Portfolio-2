import supabase from './db-client.js';
import { createClient } from '@supabase/supabase-js';

async function verifyAdmin(req) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return null;
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  const { data: { user }, error } = await client.auth.getUser(token);
  if (error || !user) return null;
  return user;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('resume')
        .select('*')
        .order('uploaded_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      if (error) throw error;

      if (req.query.download) {
        if (data?.url) return res.redirect(302, data.url);
        // No resume uploaded to Supabase yet: fall back to the bundled PDF in /public
        return res.redirect(302, '/Muhammad_Shaban_Malik_Resume.pdf');
      }
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      const user = await verifyAdmin(req);
      if (!user) return res.status(401).json({ error: 'Unauthorized' });

      const { fileName, fileBase64 } = req.body;
      if (!fileName || !fileBase64) return res.status(400).json({ error: 'Missing file' });
      if (!fileName.toLowerCase().endsWith('.pdf')) return res.status(400).json({ error: 'PDF only' });

      const buffer = Buffer.from(fileBase64, 'base64');
      if (buffer.length > 5 * 1024 * 1024) return res.status(400).json({ error: 'File too large (max 5MB)' });

      const timestamp = Date.now();
      const path = `resume-${timestamp}.pdf`;

      const { error: upErr } = await supabase.storage
        .from('resumes')
        .upload(path, buffer, { contentType: 'application/pdf', upsert: true });
      if (upErr) throw upErr;

      const { data: urlData } = supabase.storage.from('resumes').getPublicUrl(path);

      const { data, error } = await supabase.from('resume').insert({
        filename: fileName,
        storage_path: path,
        url: urlData.publicUrl,
      }).select().single();
      if (error) throw error;

      return res.status(201).json(data);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('resume API:', err);
    return res.status(500).json({ error: err.message });
  }
}
