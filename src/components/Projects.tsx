import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { Github, ExternalLink, Folder, Loader2 } from 'lucide-react';
import { FALLBACK_PROJECTS } from '../data/fallback';

interface Project { id: number; title: string; description: string; tech: string[]; github_url: string; featured?: boolean }

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(FALLBACK_PROJECTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects').then(r => r.json()).then(d => { if (Array.isArray(d) && d.length) setProjects(d); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="py-24 max-w-6xl mx-auto px-6">
      <SectionHeading num="03" title="Things I've Built" />

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="animate-spin text-teal-400" /></div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative bg-navy-900/50 border border-white/5 rounded-xl p-6 flex flex-col hover:border-teal-400/40 hover:-translate-y-1 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-teal-400/10 flex items-center justify-center text-teal-400">
                  <Folder size={22} />
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  {p.github_url && (
                    <a href={p.github_url} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-teal-400 transition">
                      <Github size={18} />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-slate-100 dark:text-slate-100 group-hover:text-teal-400 transition">
                <a href={p.github_url || '#'} target="_blank" rel="noreferrer" className="before:absolute before:inset-0">
                  {p.title}
                </a>
              </h3>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed flex-1">{p.description}</p>

              <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-slate-500">
                {p.tech.map(t => <li key={t}>{t}</li>)}
              </ul>
            </motion.article>
          ))}
        </div>
      )}

      <div className="mt-12 text-center">
        <a
          href="https://github.com/shabanmalik"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-teal-400 font-mono text-sm hover:underline"
        >
          view more on github <ExternalLink size={14} />
        </a>
      </div>
    </section>
  );
}
