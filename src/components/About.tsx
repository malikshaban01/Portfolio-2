import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { GraduationCap, MapPin, Terminal } from 'lucide-react';
import { fadeUp, staggerContainer, viewport } from '../lib/motion';

const stats = [
  { value: '5th', label: 'Semester' },
  { value: '3.22', label: 'CGPA / 4.00' },
  { value: '1', label: 'Completed internship' },
  { value: '6', label: 'Skill groups' },
];

const stack = [
  'C++ / OOP',
  'Linux & Bash',
  'Docker',
  'Git / GitHub',
  'CI/CD Pipelines',
  'AWS EC2 & Nginx',
  'MySQL',
  'Data Structures',
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24 md:py-28">
      <SectionHeading num="01" title="About Me" />

      <div className="grid items-start gap-12 lg:grid-cols-5">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="space-y-5 lg:col-span-3"
        >
          <motion.p variants={fadeUp} className="text-base leading-relaxed text-slate-400 sm:text-lg">
            Hey! I&apos;m Shaban, a <span className="text-teal-400">BS Computer Science</span> student at
            the University of Central Punjab, Lahore. I&apos;m currently in my 5th semester, holding a
            CGPA of <span className="font-mono text-teal-400">3.22 / 4.00</span>.
          </motion.p>
          <motion.p variants={fadeUp} className="text-base leading-relaxed text-slate-400 sm:text-lg">
            I recently completed a <span className="text-teal-400">DevOps internship at PITB</span>{' '}
            (Punjab Information Technology Board), where I scripted on Linux, built Docker containers,
            and wired up CI/CD pipelines that build, test, and deploy to AWS — all triggered from a
            simple <code className="font-mono text-sm text-teal-300">git push</code>.
          </motion.p>
          <motion.p variants={fadeUp} className="text-base leading-relaxed text-slate-400 sm:text-lg">
            My foundation is strong in <span className="text-teal-400">C++, OOP, and Data Structures
            &amp; Algorithms</span>, and I enjoy turning slow, manual workflows into fast automated ones.
            I care about clean code, reproducible environments, and shipping things that actually work in
            production — most recently by deploying this portfolio on AWS with Nginx and an automated
            release workflow.
          </motion.p>

          <motion.div variants={fadeUp} className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-4">
            {stats.map(stat => (
              <div key={stat.label} className="card px-4 py-4">
                <div className="font-display text-2xl font-semibold text-teal-300">{stat.value}</div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-slate-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="pt-3">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-slate-500">
              Current stack
            </p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-sm text-slate-400 sm:grid-cols-2">
              {stack.map(s => (
                <li key={s} className="flex items-center gap-2">
                  <span className="text-teal-400">▹</span>
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-2"
        >
          <div className="group relative mx-auto max-w-xs">
            <div
              aria-hidden
              className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-teal-400/20 via-cyan-400/5 to-transparent blur-2xl"
            />
            <div className="relative rounded-2xl bg-gradient-to-br from-teal-400/40 via-white/10 to-transparent p-px">
              <div className="relative overflow-hidden rounded-[15px] bg-navy-900">
                <img
                  src="/profile.jpg"
                  alt="Muhammad Shaban Malik"
                  width={800}
                  height={1000}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent"
                />
              </div>
            </div>
            <div className="absolute -right-3 top-4 inline-flex items-center gap-1.5 rounded-full border border-teal-400/30 bg-navy-950/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-teal-300 backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal-400" /> open to work
            </div>
          </div>

          <div className="mx-auto mt-6 max-w-xs space-y-3 font-mono text-sm">
            <div className="flex items-center gap-3 text-slate-400">
              <MapPin size={16} className="text-teal-400" /> Lahore, Pakistan
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <GraduationCap size={16} className="text-teal-400" /> UCP · 5th Semester
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <Terminal size={16} className="text-teal-400" /> Open to opportunities
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
