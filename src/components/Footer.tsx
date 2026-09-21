import { Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="py-10 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-5">
          <a href="https://github.com/shabanmalik" target="_blank" rel="noreferrer" aria-label="GitHub" className="text-slate-400 hover:text-teal-400 transition">
            <Github size={20} />
          </a>
          <a href="https://linkedin.com/in/shabanmalik" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-slate-400 hover:text-teal-400 transition">
            <Linkedin size={20} />
          </a>
          <a href="mailto:shabanmalik1238@gmail.com" aria-label="Email" className="text-slate-400 hover:text-teal-400 transition">
            <Mail size={20} />
          </a>
        </div>
        <p className="font-mono text-xs text-slate-500">
          Designed & built by Muhammad Shaban Malik · © {new Date().getFullYear()}
        </p>
        <p className="font-mono text-[10px] text-slate-600">
          React · Tailwind · Node · Docker · GitHub Actions · AWS
        </p>
        <Link to="/admin" className="font-mono text-[10px] text-slate-700 hover:text-teal-400 transition">admin</Link>
      </div>
    </footer>
  );
}
