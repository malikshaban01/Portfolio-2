import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X, Terminal } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onHome = loc.pathname === '/';

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? 'backdrop-blur-lg bg-navy-950/70 border-b border-white/5' : 'bg-transparent'} ${theme === 'light' && scrolled ? 'bg-white/70 border-slate-200' : ''}`}>
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-navy-950 font-bold group-hover:scale-105 transition">
            <Terminal size={18} strokeWidth={2.5} />
          </div>
          <div className="font-mono text-sm">
            <span className="text-teal-400">~/</span>
            <span className="text-slate-200 dark:text-slate-200">shaban</span>
          </div>
        </Link>

        {onHome && (
          <ul className="hidden md:flex items-center gap-1">
            {links.map((l, i) => (
              <li key={l.href}>
                <a href={l.href} className="px-3 py-2 text-sm text-slate-400 hover:text-teal-400 transition-colors">
                  <span className="text-teal-400 font-mono text-xs mr-1">0{i + 1}.</span>{l.label}
                </a>
              </li>
            ))}
          </ul>
        )}

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="p-2 rounded-lg text-slate-400 hover:text-teal-400 hover:bg-white/5 transition"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          {onHome && (
            <a
              href="/api/resume?download=1"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 border border-teal-400 text-teal-400 rounded-lg text-sm font-medium hover:bg-teal-400/10 transition"
            >
              Resume
            </a>
          )}
          {onHome && (
            <button className="md:hidden p-2 text-slate-300" onClick={() => setOpen(!open)} aria-label="Menu">
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          )}
        </div>
      </nav>

      {onHome && open && (
        <div className="md:hidden bg-navy-900 border-t border-white/5">
          <ul className="flex flex-col p-4 gap-1">
            {links.map((l, i) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-3 text-slate-300 hover:text-teal-400"
                >
                  <span className="text-teal-400 font-mono text-xs mr-2">0{i + 1}.</span>{l.label}
                </a>
              </li>
            ))}
            <li>
              <a href="/api/resume?download=1" className="block mt-2 text-center px-4 py-2 border border-teal-400 text-teal-400 rounded-lg">Download Resume</a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
