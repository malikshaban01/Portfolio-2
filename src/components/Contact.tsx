import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Copy,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Send,
} from 'lucide-react';
import { EMAIL, GITHUB_URL, LINKEDIN_URL, LOCATION } from '../data/links';
import { fadeUp, staggerContainer, viewport } from '../lib/motion';

const FORM_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined;
const FORM_READY = Boolean(FORM_ENDPOINT && !FORM_ENDPOINT.includes('YOUR_FORM_ID'));

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState('');
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr('');
    setSent(false);

    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!name || !email || !message) {
      setErr('Please fill in all fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErr('Please enter a valid email address.');
      return;
    }
    if (message.length < 10) {
      setErr('Message must be at least 10 characters.');
      return;
    }

    if (!FORM_READY) {
      const subject = encodeURIComponent(`Portfolio contact from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
      setSent(true);
      return;
    }

    setSending(true);
    try {
      const res = await fetch(FORM_ENDPOINT as string, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `Portfolio contact from ${name}`,
          _gotcha: '',
        }),
      });
      if (!res.ok) throw new Error('Formspree request failed');
      setSent(true);
      setForm({ name: '', email: '', message: '' });
    } catch {
      setErr(`Could not send your message. Please email me directly at ${EMAIL}.`);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-24 md:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewport}>
          <motion.p variants={fadeUp} className="mb-4 font-mono text-sm text-teal-400">
            05. What&apos;s next?
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl"
          >
            Get in touch
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 max-w-md leading-relaxed text-slate-400">
            I&apos;m actively looking for software development or DevOps internship / entry-level roles.
            If you have an opportunity, a question, or just want to say hi — my inbox is always open.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 space-y-2.5">
            <div className="card flex items-center gap-3 p-4">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-teal-400/10 text-teal-300">
                <Mail size={16} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="font-mono text-[10px] uppercase tracking-wider text-slate-500">email</div>
                <a
                  href={`mailto:${EMAIL}`}
                  className="block truncate text-sm text-slate-200 transition-colors hover:text-teal-300"
                >
                  {EMAIL}
                </a>
              </div>
              <button
                type="button"
                onClick={copyEmail}
                aria-label="Copy email address"
                className="grid h-8 w-8 place-items-center rounded-lg border border-white/[0.07] text-slate-400 transition-colors hover:border-teal-400/40 hover:text-teal-300"
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
              </button>
              <span className="sr-only" aria-live="polite">
                {copied ? 'Email copied' : ''}
              </span>
            </div>

            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className="card flex items-center gap-3 p-4 transition-colors hover:border-teal-400/30"
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-teal-400/10 text-teal-300">
                <Linkedin size={16} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="font-mono text-[10px] uppercase tracking-wider text-slate-500">linkedin</div>
                <div className="truncate text-sm text-slate-200">shaban-malik</div>
              </div>
            </a>

            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="card flex items-center gap-3 p-4 transition-colors hover:border-teal-400/30"
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-teal-400/10 text-teal-300">
                <Github size={16} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="font-mono text-[10px] uppercase tracking-wider text-slate-500">github</div>
                <div className="truncate text-sm text-slate-200">malikshaban01</div>
              </div>
            </a>

            <div className="card flex items-center gap-3 p-4">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-teal-400/10 text-teal-300">
                <MapPin size={16} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="font-mono text-[10px] uppercase tracking-wider text-slate-500">location</div>
                <div className="truncate text-sm text-slate-200">{LOCATION}</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={submit}
          aria-label="Contact form"
          className="card h-fit p-6 sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="mb-1.5 block font-mono text-xs text-teal-400">
                01. name
              </label>
              <input
                id="contact-name"
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                maxLength={80}
                autoComplete="name"
                className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-slate-100 transition-colors placeholder:text-slate-600 focus:border-teal-400/60 focus:outline-none focus:ring-2 focus:ring-teal-400/15"
                placeholder="Jane Recruiter"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-1.5 block font-mono text-xs text-teal-400">
                02. email
              </label>
              <input
                id="contact-email"
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                maxLength={120}
                autoComplete="email"
                className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-slate-100 transition-colors placeholder:text-slate-600 focus:border-teal-400/60 focus:outline-none focus:ring-2 focus:ring-teal-400/15"
                placeholder="jane@company.com"
              />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="contact-message" className="mb-1.5 block font-mono text-xs text-teal-400">
              03. message
            </label>
            <textarea
              id="contact-message"
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              maxLength={2000}
              rows={6}
              className="w-full resize-none rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-slate-100 transition-colors placeholder:text-slate-600 focus:border-teal-400/60 focus:outline-none focus:ring-2 focus:ring-teal-400/15"
              placeholder="Hi Shaban, we're hiring interns for our DevOps team..."
            />
            <div className="mt-1 text-right font-mono text-xs text-slate-500">
              {form.message.length}/2000
            </div>
          </div>

          <div aria-live="polite">
            {err && (
              <div className="mt-3 flex items-center gap-2 rounded-lg border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-400">
                <AlertCircle size={16} /> {err}
              </div>
            )}
            {sent && (
              <div className="mt-3 flex items-center gap-2 rounded-lg border border-teal-400/20 bg-teal-400/10 px-4 py-3 text-sm text-teal-300">
                <CheckCircle2 size={16} />
                {FORM_READY
                  ? "Message sent — I'll get back to you soon."
                  : 'Opening your email app — just hit send to deliver it.'}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={sending}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-teal-400 px-6 py-3 font-semibold text-navy-950 shadow-lg shadow-teal-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-300 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:w-auto"
          >
            {sending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            {sending ? 'Sending…' : 'Send Message'}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
