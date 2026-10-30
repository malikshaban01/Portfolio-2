import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { ChevronRight } from 'lucide-react';
import { FALLBACK_SKILLS } from '../data/fallback';
import { EASE } from '../lib/motion';

interface SkillGroup {
  id: number;
  name: string;
  icon: string;
  skills: string[];
}

export default function Skills() {
  const groups: SkillGroup[] = FALLBACK_SKILLS;
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = groups[active];

  const onKeyDown = (e: React.KeyboardEvent) => {
    let next = active;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (active + 1) % groups.length;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (active - 1 + groups.length) % groups.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = groups.length - 1;
    else return;

    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-24 md:py-28">
      <SectionHeading num="02" title="Skills & Toolkit" />

      <div className="grid gap-0 md:grid-cols-[220px_1fr] md:gap-8">
        <div className="relative">
          <div
            role="tablist"
            aria-label="Skill categories"
            onKeyDown={onKeyDown}
            className="scrollbar-hide flex overflow-x-auto border-b border-white/10 md:flex-col md:overflow-visible md:border-b-0 md:border-l"
          >
            {groups.map((g, i) => {
              const isActive = i === active;
              return (
                <button
                  key={g.id}
                  ref={el => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`skill-tab-${g.id}`}
                  aria-selected={isActive}
                  aria-controls="skill-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={`relative flex-shrink-0 px-5 py-3 text-left font-mono text-sm whitespace-nowrap transition-colors md:flex-shrink ${
                    isActive
                      ? 'bg-teal-400/5 text-teal-400'
                      : 'text-slate-400 hover:bg-white/[0.02] hover:text-slate-200'
                  }`}
                >
                  <span className="mr-2 text-base">{g.icon}</span>
                  {g.name}

                  {isActive && (
                    <motion.span
                      layoutId="skill-tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-400 md:-left-px md:bottom-0 md:right-auto md:top-0 md:h-auto md:w-0.5"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#060b17] to-transparent md:hidden"
          />
        </div>

        <div
          id="skill-panel"
          role="tabpanel"
          aria-labelledby={current ? `skill-tab-${current.id}` : undefined}
          className="mt-6 min-h-[280px] md:mt-0"
        >
          <AnimatePresence mode="wait">
            {current && (
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25, ease: EASE }}
              >
                <div className="mb-1 flex items-baseline gap-3">
                  <h3 className="font-display text-2xl font-semibold text-slate-100">{current.name}</h3>
                  <span className="font-mono text-xs text-slate-500">@ shaban</span>
                </div>
                <p className="mb-6 font-mono text-xs text-teal-400">
                  $ ls ~/skills/{current.name.toLowerCase().replace(/\s+&\s+|\s+/g, '-')}
                </p>

                <ul className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3">
                  {current.skills.map((s, i) => (
                    <motion.li
                      key={s}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: i * 0.03 }}
                      className="group flex items-center gap-2 font-mono text-sm text-slate-300"
                    >
                      <ChevronRight
                        size={14}
                        className="flex-shrink-0 text-teal-400 transition-transform group-hover:translate-x-0.5"
                      />
                      <span className="transition-colors group-hover:text-teal-300">{s}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-8 flex items-center gap-4 border-t border-white/5 pt-4 font-mono text-xs text-slate-500">
                  <span>
                    <span className="text-teal-400">{current.skills.length}</span> items
                  </span>
                  <span className="h-3 w-px bg-slate-700" />
                  <span>
                    category{' '}
                    <span className="text-teal-400">
                      {active + 1}/{groups.length}
                    </span>
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
