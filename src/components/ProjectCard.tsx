import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { fadeUp } from '../lib/motion';

export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  github_url: string;
  featured?: boolean;
}

const covers = [
  'from-teal-400/25 via-cyan-400/10 to-transparent',
  'from-indigo-400/25 via-sky-400/10 to-transparent',
  'from-amber-400/20 via-orange-400/10 to-transparent',
];

export default function ProjectCard({
  project,
  index,
  featured = false,
}: {
  project: Project;
  index: number;
  featured?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  const cover = covers[index % covers.length];

  return (
    <motion.article
      ref={ref}
      variants={fadeUp}
      onPointerMove={onPointerMove}
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] transition-colors duration-300 hover:border-teal-400/30 ${
        featured ? 'md:col-span-2 md:grid md:grid-cols-[0.9fr_1.1fr]' : ''
      }`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(320px circle at var(--mx, 50%) var(--my, 20%), rgba(45,212,191,0.10), transparent 65%)',
        }}
      />

      <div
        aria-hidden
        className={`relative z-[1] overflow-hidden bg-gradient-to-br ${cover} ${
          featured ? 'min-h-52 md:min-h-full' : 'h-40'
        }`}
      >
        <div className="bg-grid absolute inset-0 opacity-40" />
        <div className="absolute inset-0 flex items-end justify-between p-5">
          <span className="font-mono text-4xl font-medium text-white/15">0{index + 1}</span>
          <span className="rounded-full border border-white/10 bg-navy-950/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-slate-400 backdrop-blur">
            {featured ? 'featured' : 'project'}
          </span>
        </div>
      </div>

      <div className="relative z-[1] flex flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-lg font-semibold text-slate-100 transition-colors group-hover:text-teal-300">
            {project.title}
          </h3>
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.title} on GitHub`}
              className="relative z-10 shrink-0 rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-white/5 hover:text-teal-300"
            >
              <Github size={18} />
            </a>
          )}
        </div>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{project.description}</p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tech.map(t => (
            <span
              key={t}
              className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 font-mono text-[11px] text-slate-400"
            >
              {t}
            </span>
          ))}
        </div>

        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs text-teal-300/90 hover:text-teal-300"
          >
            view project
            <ArrowUpRight
              size={13}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
            <span className="absolute inset-0" aria-hidden />
          </a>
        )}
      </div>
    </motion.article>
  );
}
