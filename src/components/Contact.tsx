import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, CheckCircle2, AlertCircle, Mail } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [err, setErr] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr('');

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErr('Please fill in all fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setErr('Please enter a valid email address.');
      return;
    }
    if (form.message.trim().length < 10) {
      setErr('Message must be at least 10 characters.');
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send');
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (e: any) {
      setStatus('error');
      setErr(e.message || 'Something went wrong.');
    }
  };

  return (
    <section id="contact" className="py-24 max-w-3xl mx-auto px-6 text-center">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-mono text-teal-400 text-sm mb-4"
      >
        05. What's Next?
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-4xl sm:text-5xl font-extrabold text-slate-100 dark:text-slate-100 mb-6"
      >
        Get In Touch
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-slate-400 leading-relaxed mb-12"
      >
        I'm actively looking for software development or DevOps internship / entry-level roles. If you have an
        opportunity, a question, or just want to say hi — my inbox is always open. I'll get back to you as fast as I can.
      </motion.p>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        onSubmit={submit}
        className="text-left space-y-4 bg-navy-900/50 border border-white/5 rounded-2xl p-6 sm:p-8"
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="font-mono text-xs text-teal-400 mb-1.5 block">01. name</label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              maxLength={80}
              className="w-full px-4 py-3 bg-navy-950/60 border border-white/10 rounded-lg text-slate-100 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/20 transition"
              placeholder="Jane Recruiter"
            />
          </div>
          <div>
            <label className="font-mono text-xs text-teal-400 mb-1.5 block">02. email</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              maxLength={120}
              className="w-full px-4 py-3 bg-navy-950/60 border border-white/10 rounded-lg text-slate-100 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/20 transition"
              placeholder="jane@company.com"
            />
          </div>
        </div>
        <div>
          <label className="font-mono text-xs text-teal-400 mb-1.5 block">03. message</label>
          <textarea
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            maxLength={2000}
            rows={5}
            className="w-full px-4 py-3 bg-navy-950/60 border border-white/10 rounded-lg text-slate-100 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/20 transition resize-none"
            placeholder="Hi Shaban, we're hiring interns for our DevOps team..."
          />
          <div className="text-xs text-slate-500 mt-1 text-right font-mono">{form.message.length}/2000</div>
        </div>

        {err && (
          <div className="flex items-center gap-2 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
            <AlertCircle size={16} /> {err}
          </div>
        )}
        {status === 'success' && (
          <div className="flex items-center gap-2 text-sm text-teal-300 bg-teal-400/10 border border-teal-400/20 rounded-lg px-4 py-3">
            <CheckCircle2 size={16} /> Message sent! I'll get back to you soon.
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-teal-400 text-navy-950 rounded-lg font-semibold hover:bg-teal-300 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-teal-500/20"
        >
          {status === 'loading' ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
          Send Message
        </button>
      </motion.form>

      <div className="mt-8 flex items-center justify-center gap-2 text-slate-500 text-sm font-mono">
        <Mail size={14} /> shabanmalik1238@gmail.com
      </div>
    </section>
  );
}
