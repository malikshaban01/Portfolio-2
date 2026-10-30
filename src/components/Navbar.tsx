import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUpRight, Menu, Terminal, X } from 'lucide-react';
import { EASE } from '../lib/motion';

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const loc = useLocation();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.2 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (loc.pathname !== '/') return;
    const sections = links
      .map(l => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );

    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, [loc.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const onHome = loc.pathname === '/';

  return (
    <>
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400"
      />
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled || open
            ? 'border-b border-white/5 bg-navy-950/75 backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6" aria-label="Main navigation">
          <Link to="/" className="group flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 text-navy-950 transition-transform duration-300 group-hover:scale-105">
              <Terminal size={18} strokeWidth={2.5} />
            </div>
            <div className="font-mono text-sm">
              <span className="text-teal-400">~/</span>
              <span className="text-slate-200">shaban</span>
            </div>
          </Link>

          {onHome && (
            <ul className="hidden items-center gap-1 md:flex">
              {links.map((l, i) => {
                const isActive = active === l.href;
                return (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      aria-current={isActive ? 'true' : undefined}
                      className={`group relative rounded-lg px-3 py-2 text-sm transition-colors ${
                        isActive ? 'text-teal-300' : 'text-slate-400 hover:text-slate-100'
                      }`}
                    >
                      <span className="mr-1 font-mono text-[11px] text-teal-400/80">0{i + 1}.</span>
                      {l.label}
                      <span
                        className={`absolute inset-x-3 -bottom-px h-px bg-gradient-to-r from-transparent via-teal-400 to-transparent transition-opacity duration-300 ${
                          isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                        }`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          )}

          <div className="flex items-center gap-2">
            {onHome && (
              <a
                href="#contact"
                className="hidden items-center gap-1.5 rounded-lg border border-teal-400/30 bg-teal-400/[0.06] px-4 py-2 text-sm font-medium text-teal-300 transition-all hover:border-teal-400/60 hover:bg-teal-400/10 md:inline-flex"
              >
                Let&apos;s talk <ArrowUpRight size={15} />
              </a>
            )}
            {onHome && (
              <button
                type="button"
                onClick={() => setOpen(v => !v)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? 'Close menu' : 'Open menu'}
                className="rounded-lg p-2 text-slate-300 transition-colors hover:bg-white/5 hover:text-teal-300 md:hidden"
              >
                {open ? <X size={22} /> : <Menu size={22} />}
              </button>
            )}
          </div>
        </nav>

        <AnimatePresence>
          {open && onHome && (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="overflow-hidden border-t border-white/5 bg-navy-950/95 backdrop-blur-xl md:hidden"
            >
              <ul className="space-y-1 px-6 py-4">
                {links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04 }}
                  >
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-lg px-3 py-3 text-slate-300 transition-colors hover:bg-white/[0.03] hover:text-teal-300"
                    >
                      <span>
                        <span className="mr-2 font-mono text-xs text-teal-400">0{i + 1}.</span>
                        {l.label}
                      </span>
                      <ArrowUpRight size={15} className="text-slate-600" />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
