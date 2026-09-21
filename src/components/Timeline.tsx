import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { Briefcase, GraduationCap, Loader2 } from 'lucide-react';
import { FALLBACK_EXPERIENCE, FALLBACK_EDUCATION } from '../data/fallback';

interface Experience { id: number; role: string; company: string; period: string; bullets: string[] }
interface Education { id: number; degree: string; institution: string; period: string; details: string; coursework: string[] }

export default function Timeline() {
  const [experience, setExperience] = useState<Experience[]>(FALLBACK_EXPERIENCE);
  const [education, setEducation] = useState<Education[]>(FALLBACK_EDUCATION);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/experience').then(r => r.json()),
      fetch('/api/education').then(r => r.json()),
    ]).then(([e, ed]) => {
      if (Array.isArray(e) && e.length) setExperience(e);
      if (Array.isArray(ed) && ed.length) setEducation(ed);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <section id="experience" className="py-24 max-w-6xl mx-auto px-6">
      <SectionHeading num="04" title="Experience & Education" />

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="animate-spin text-teal-400" /></div>
      ) : (
        <div className="relative">
          <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-teal-400/0 via-teal-400/40 to-teal-400/0 md:-translate-x-px" />

          <div className="space-y-12">
            {experience.map((e, i) => (
              <TimelineItem key={`e-${e.id}`} index={i} side={i % 2 === 0 ? 'left' : 'right'} icon={<Briefcase size={14} />}>
                <div className="font-mono text-xs text-teal-400 mb-2">{e.period}</div>
                <h3 className="font-bold text-slate-100 dark:text-slate-100 text-lg">{e.role}</h3>
                <div className="text-teal-300 text-sm mb-3">{e.company}</div>
                <ul className="space-y-1.5 text-sm text-slate-400">
                  {e.bullets.map((b, k) => (
                    <li key={k} className="flex gap-2">
                      <span className="text-teal-400 flex-shrink-0">▹</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </TimelineItem>
            ))}
            {education.map((ed, i) => (
              <TimelineItem key={`ed-${ed.id}`} index={experience.length + i} side={(experience.length + i) % 2 === 0 ? 'left' : 'right'} icon={<GraduationCap size={14} />}>
                <div className="font-mono text-xs text-teal-400 mb-2">{ed.period}</div>
                <h3 className="font-bold text-slate-100 dark:text-slate-100 text-lg">{ed.degree}</h3>
                <div className="text-teal-300 text-sm">{ed.institution}</div>
                <p className="mt-2 text-sm text-slate-400">{ed.details}</p>
                {ed.coursework?.length > 0 && (
                  <div className="mt-4">
                    <div className="text-xs uppercase tracking-wider text-slate-500 mb-2 font-mono">Coursework</div>
                    <div className="flex flex-wrap gap-1.5">
                      {ed.coursework.map(c => (
                        <span key={c} className="px-2 py-0.5 text-xs font-mono rounded bg-navy-800 text-slate-300 border border-white/5">{c}</span>
                      ))}
                    </div>
                  </div>
                )}
              </TimelineItem>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function TimelineItem({ children, side, icon, index }: { children: React.ReactNode; side: 'left' | 'right'; icon: React.ReactNode; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`relative md:grid md:grid-cols-2 md:gap-12 ${side === 'right' ? 'md:text-left' : 'md:text-right'}`}
    >
      <div className={`absolute left-3 md:left-1/2 -translate-x-1/2 top-2 w-2.5 h-2.5 rounded-full bg-teal-400 timeline-dot z-10 flex items-center justify-center`}>
        <span className="absolute text-navy-950">{icon}</span>
      </div>

      {side === 'left' ? (
        <>
          <div className="pl-10 md:pl-0 md:pr-8">
            <div className="bg-navy-900/50 border border-white/5 rounded-xl p-6 hover:border-teal-400/40 transition">
              {children}
            </div>
          </div>
          <div className="hidden md:block" />
        </>
      ) : (
        <>
          <div className="hidden md:block" />
          <div className="pl-10 md:pl-8">
            <div className="bg-navy-900/50 border border-white/5 rounded-xl p-6 hover:border-teal-400/40 transition text-left">
              {children}
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}
