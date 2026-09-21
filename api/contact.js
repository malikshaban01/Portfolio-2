import supabase from './db-client.js';

// Simple in-memory rate limit (per serverless instance). Prod would use Redis.
const RATE = new Map();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;

function rateLimited(ip) {
  const now = Date.now();
  const arr = (RATE.get(ip) || []).filter(t => now - t < WINDOW_MS);
  if (arr.length >= MAX_PER_WINDOW) return true;
  arr.push(now);
  RATE.set(ip, arr);
  return false;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 'unknown';
  if (rateLimited(ip)) {
    return res.status(429).json({ error: 'Too many messages. Please try again in a minute.' });
  }

  try {
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) return res.status(400).json({ error: 'All fields required' });
    if (typeof name !== 'string' || name.length > 80) return res.status(400).json({ error: 'Invalid name' });
    if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 120) return res.status(400).json({ error: 'Invalid email' });
    if (typeof message !== 'string' || message.length < 10 || message.length > 2000) return res.status(400).json({ error: 'Message must be 10-2000 characters' });

    const { data, error } = await supabase.from('messages').insert({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
    }).select().single();
    if (error) throw error;

    return res.status(201).json({ ok: true, id: data.id });
  } catch (err) {
    console.error('contact API:', err);
    return res.status(500).json({ error: 'Failed to send message' });
  }
}
