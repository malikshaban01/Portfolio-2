/**
 * Production server for the portfolio site.
 *
 * Runs the existing Vercel-style API handlers from /api under Express and
 * serves the Vite build output from /dist, with an SPA fallback so React
 * Router routes (/admin, /admin/login) work on a fresh load.
 *
 * Used on the EC2 instance (behind nginx). Not needed for `npm run dev`.
 */
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import 'dotenv/config';

import contact from './api/contact.js';
import education from './api/education.js';
import experience from './api/experience.js';
import messages from './api/messages.js';
import projects from './api/projects.js';
import resume from './api/resume.js';
import skills from './api/skills.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;
const DIST = path.join(__dirname, 'dist');

const app = express();

// Behind nginx, honour X-Forwarded-* so req.ip / rate limiting work correctly.
app.set('trust proxy', 1);

// Resume uploads arrive as base64 (up to 5MB PDF -> ~7MB payload).
app.use(express.json({ limit: '12mb' }));
app.use(express.urlencoded({ extended: true, limit: '12mb' }));

// Permissive CORS: the API is consumed by the same origin, but the handlers
// already set these headers, so keep behaviour identical to Vercel.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();
  next();
});

// Mount each /api route on its existing handler.
const routes = { contact, education, experience, messages, projects, resume, skills };
for (const [name, handler] of Object.entries(routes)) {
  app.use(
    `/api/${name}`,
    (req, res) => Promise.resolve(handler(req, res)).catch((err) => {
      console.error(`${name} API:`, err);
      if (!res.headersSent) res.status(500).json({ error: 'Internal server error' });
    })
  );
}

// Static assets built by Vite. index:false so the SPA fallback below decides.
app.use(
  express.static(DIST, {
    maxAge: '1h',
    index: false,
  })
);

// Unknown API routes should 404 as JSON, not return index.html.
app.all('/api/*', (req, res) => res.status(404).json({ error: 'Not found' }));

// SPA fallback: every other route renders the React app.
app.get('*', (req, res) => res.sendFile(path.join(DIST, 'index.html')));

app.listen(PORT, () => {
  console.log(`portfolio server listening on :${PORT}`);
});
