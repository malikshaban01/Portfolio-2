import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { Briefcase, CheckCircle2, GraduationCap } from 'lucide-react';
import { FALLBACK_EXPERIENCE, FALLBACK_EDUCATION } from '../data/fallback';
import { viewport } from '../lib/motion';

interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  status?: string;
  bullets: string[];
}

interface Education {
  id: number;
  degree: string;
  institution: string;
  period: string;
  details: string;
  coursework: string[];
}

export default function Timeline() {
  const experience: Experience[] = FALLBACK_EXPERIENCE;
  const education: Education[] = FALLBACK_EDUCATION;
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ['start 80%', 'end 20%'],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-24 md:py-28">
      <SectionHeading num="04" title="Experience & Education" />

      <div ref={lineRef} className="relative">
        <div
          aria-hidden
          className="absolute bottom-0 left-3 top-0 w-px bg-white/10 md:left-1/2 md:-translate-x-px"
        />
        <motion.div
          aria-hidden
          style={{ scaleY: lineScale }}
          className="absolute bottom-0 left-3 top-0 w-px origin-top bg-gradient-to-b from-teal-400 via-teal-400/60 to-teal-400/10 md:left-1/2 md:-translate-x-px"
        />

        <div className="space-y-12">
          {experience.map((e, i) => (
            <TimelineItem
              key={`e-${e.id}`}
              index={i}
              side={i % 2 === 0 ? 'left' : 'right'}
              icon={<Briefcase size={12} />}
            >
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex rounded-full border border-teal-400/20 bg-teal-400/[0.08] px-2.5 py-0.5 font-mono text-[11px] text-teal-300">
                  {e.period}
                </span>
                {e.status && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 font-mono text-[11px] text-slate-400">
                    <CheckCircle2 size={11} className="text-teal-400" />
                    {e.status}
                  </span>
                )}
              </div>
              <h3 className="font-display text-lg font-bold text-slate-100">{e.role}</h3>
              <div className="mb-3 mt-1 flex items-center gap-2 text-sm text-teal-300">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-teal-400/10 font-mono text-[10px] text-teal-300">
                  {e.company.charAt(0)}
                </span>
                {e.company}
              </div>
              <ul className="space-y-1.5 text-sm text-slate-400">
                {e.bullets.map((b, k) => (
                  <li key={k} className="flex gap-2">
                    <span className="flex-shrink-0 text-teal-400">▹</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </TimelineItem>
          ))}

          {education.map((ed, i) => (
            <TimelineItem
              key={`ed-${ed.id}`}
              index={experience.length + i}
              side={(experience.length + i) % 2 === 0 ? 'left' : 'right'}
              icon={<GraduationCap size={12} />}
            >
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex rounded-full border border-teal-400/20 bg-teal-400/[0.08] px-2.5 py-0.5 font-mono text-[11px] text-teal-300">
                  {ed.period}
                </span>
              </div>
              <h3 className="font-display text-lg font-bold text-slate-100">{ed.degree}</h3>
              <div className="mt-1 text-sm text-teal-300">{ed.institution}</div>
              <p className="mt-2 text-sm text-slate-400">{ed.details}</p>
              {ed.coursework?.length > 0 && (
                <div className="mt-4">
                  <div className="mb-2 font-mono text-[10px] uppercase tracking-wider text-slate-500">
                    Coursework
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {ed.coursework.map(c => (
                      <span
                        key={c}
                        className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 font-mono text-[11px] text-slate-300"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </TimelineItem>
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  children,
  side,
  icon,
  index,
}: {
  children: React.ReactNode;
  side: 'left' | 'right';
  icon: React.ReactNode;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="relative md:grid md:grid-cols-2 md:gap-12"
    >
      <div className="timeline-dot absolute left-3 top-2 z-10 flex h-2.5 w-2.5 -translate-x-1/2 items-center justify-center rounded-full bg-teal-400 md:left-1/2">
        <span className="absolute text-navy-950">{icon}</span>
      </div>

      {side === 'left' ? (
        <>
          <div className="pl-10 md:pl-0 md:pr-8">
            <div className="card p-6 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-400/30">
              {children}
            </div>
          </div>
          <div className="hidden md:block" />
        </>
      ) : (
        <>
          <div className="hidden md:block" />
          <div className="pl-10 md:pl-8">
            <div className="card p-6 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-400/30">
              {children}
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}
