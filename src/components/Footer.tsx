import { Github, Linkedin, Mail, Terminal } from 'lucide-react';
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from '../data/links';

const links = [
  { href: '#about', label: 'about' },
  { href: '#skills', label: 'skills' },
  { href: '#projects', label: 'projects' },
  { href: '#experience', label: 'experience' },
  { href: '#contact', label: 'contact' },
];

export default function Footer() {
  return (
    <footer className="relative mt-8">
      <div className="h-px bg-gradient-to-r from-transparent via-teal-400/25 to-transparent" />
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
          <div className="text-center md:text-left">
            <a href="#main" className="inline-flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 text-navy-950">
                <Terminal size={16} strokeWidth={2.5} />
              </span>
              <span className="font-mono text-sm">
                <span className="text-teal-400">~/</span>
                <span className="text-slate-200">shaban</span>
              </span>
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-500">
              BS Computer Science student &amp; aspiring DevOps engineer building for the web.
            </p>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-mono text-xs">
            {links.map(l => (
              <a key={l.href} href={l.href} className="text-slate-500 transition-colors hover:text-teal-300">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="grid h-9 w-9 place-items-center rounded-lg border border-white/[0.07] text-slate-400 transition-colors hover:border-teal-400/40 hover:text-teal-300"
            >
              <Github size={17} />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="grid h-9 w-9 place-items-center rounded-lg border border-white/[0.07] text-slate-400 transition-colors hover:border-teal-400/40 hover:text-teal-300"
            >
              <Linkedin size={17} />
            </a>
            <a
              href={`mailto:${EMAIL}`}
              aria-label="Email"
              className="grid h-9 w-9 place-items-center rounded-lg border border-white/[0.07] text-slate-400 transition-colors hover:border-teal-400/40 hover:text-teal-300"
            >
              <Mail size={17} />
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-white/5 pt-6 text-center font-mono text-[11px] text-slate-600 sm:flex-row">
          <p>© {new Date().getFullYear()} Muhammad Shaban Malik</p>
          <p>React · Tailwind · Framer Motion</p>
        </div>
      </div>
    </footer>
  );
}
