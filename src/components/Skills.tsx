import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { Loader2, ChevronRight } from 'lucide-react';
import { FALLBACK_SKILLS } from '../data/fallback';

interface SkillGroup { id: number; name: string; icon: string; skills: string[] }

export default function Skills() {
  const [groups, setGroups] = useState<SkillGroup[]>(FALLBACK_SKILLS);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(0);

  useEffect(() => {
    fetch('/api/skills')
      .then(r => r.json())
      .then((data) => { if (Array.isArray(data) && data.length) setGroups(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const current = groups[active];

  return (
    <section id="skills" className="py-24 max-w-6xl mx-auto px-6">
      <SectionHeading num="02" title="Skills & Toolkit" />

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="animate-spin text-teal-400" /></div>
      ) : (
        <div className="grid md:grid-cols-[220px_1fr] gap-0 md:gap-8">
          {/* Category tabs */}
          <div className="relative">
            {/* Horizontal on mobile, vertical on desktop */}
            <div
              role="tablist"
              className="flex md:flex-col overflow-x-auto md:overflow-visible border-b md:border-b-0 md:border-l border-white/10 scrollbar-hide"
            >
              {groups.map((g, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={g.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(i)}
                    className={`relative flex-shrink-0 md:flex-shrink text-left px-5 py-3 font-mono text-sm whitespace-nowrap transition-colors ${
                      isActive
                        ? 'text-teal-400 bg-teal-400/5'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]'
                    }`}
                  >
                    <span className="mr-2 text-base">{g.icon}</span>
                    {g.name}

                    {/* Active indicator: bottom bar on mobile, left bar on desktop */}
                    {isActive && (
                      <motion.span
                        layoutId="skill-tab-indicator"
                        className="absolute md:top-0 md:bottom-0 md:-left-px md:w-0.5 md:h-auto left-0 right-0 bottom-0 h-0.5 md:right-auto bg-teal-400"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Skill detail panel */}
          <div className="min-h-[280px] mt-6 md:mt-0">
            <AnimatePresence mode="wait">
              {current && (
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="flex items-baseline gap-3 mb-1">
                    <h3 className="text-xl font-semibold text-slate-100 dark:text-slate-100">
                      {current.name}
                    </h3>
                    <span className="font-mono text-xs text-slate-500">
                      @ shaban
                    </span>
                  </div>
                  <p className="font-mono text-xs text-teal-400 mb-6">
                    $ ls ~/skills/{current.name.toLowerCase().replace(/\s+&\s+|\s+/g, '-')}
                  </p>

                  <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2.5">
                    {current.skills.map((s, i) => (
                      <motion.li
                        key={s}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: i * 0.03 }}
                        className="flex items-center gap-2 text-slate-300 text-sm font-mono group"
                      >
                        <ChevronRight
                          size={14}
                          className="text-teal-400 flex-shrink-0 group-hover:translate-x-0.5 transition-transform"
                        />
                        <span className="group-hover:text-teal-300 transition-colors">{s}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-4 font-mono text-xs text-slate-500">
                    <span>
                      <span className="text-teal-400">{current.skills.length}</span> items
                    </span>
                    <span className="h-3 w-px bg-slate-700" />
                    <span>
                      category <span className="text-teal-400">{active + 1}/{groups.length}</span>
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </section>
  );
}
