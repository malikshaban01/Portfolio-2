import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import ProjectCard, { type Project } from './ProjectCard';
import { ExternalLink } from 'lucide-react';
import { FALLBACK_PROJECTS } from '../data/fallback';
import { staggerContainer, viewport } from '../lib/motion';
import { GITHUB_URL } from '../data/links';

export default function Projects() {
  const projects: Project[] = FALLBACK_PROJECTS;

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24 md:py-28">
      <SectionHeading num="03" title="Things I've Built" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="grid gap-5 md:grid-cols-2"
      >
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} featured={i === 0} />
        ))}
      </motion.div>

      <div className="mt-12 text-center">
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 font-mono text-sm text-teal-400 hover:text-teal-300"
        >
          view more on github
          <ExternalLink size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </section>
  );
}
