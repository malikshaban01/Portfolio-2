import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { Terminal, GraduationCap, MapPin } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 max-w-6xl mx-auto px-6">
      <SectionHeading num="01" title="About Me" />

      <div className="grid lg:grid-cols-5 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-3 space-y-4 text-slate-400 leading-relaxed"
        >
          <p>
            Hey! I'm Shaban, a <span className="text-teal-400">BS Computer Science</span> student at the
            {' '}University of Central Punjab, Lahore. I'm currently in my 4th semester, holding a CGPA of
            {' '}<span className="text-teal-400 font-mono">3.22 / 4.00</span>.
          </p>
          <p>
            Right now I'm a <span className="text-teal-400">DevOps Intern at PITB</span> (Punjab Information Technology Board),
            where I spend my days scripting on Linux, building Docker containers, and wiring up CI/CD pipelines
            that build, test, and deploy to AWS — all triggered from a simple <code className="font-mono text-sm text-teal-300">git push</code>.
          </p>
          <p>
            My foundation is strong in <span className="text-teal-400">C++, OOP, and Data Structures & Algorithms</span>, and I
            enjoy the puzzle of turning slow, manual workflows into fast automated ones. I care about clean code, reproducible
            environments, and shipping things that actually work in production.
          </p>
          <p>Here's the current stack I'm working with:</p>

          <ul className="grid grid-cols-2 gap-2 font-mono text-sm text-slate-400 mt-4">
            {['C++ / OOP', 'Linux & Bash', 'Docker', 'Git / GitHub', 'CI/CD Pipelines', 'AWS Basics', 'MySQL', 'Data Structures'].map(s => (
              <li key={s} className="flex items-center gap-2">
                <span className="text-teal-400">▹</span>{s}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="relative group max-w-xs mx-auto">
            <div className="absolute -inset-2 border-2 border-teal-400 rounded-lg" />
            <div className="relative rounded-lg overflow-hidden aspect-[4/5] bg-navy-900">
              <img
                src="/profile.jpg"
                alt="Muhammad Shaban Malik"
                width={800}
                height={800}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-[center_20%]"
              />
          
            </div>
          </div>

          <div className="mt-6 space-y-3 font-mono text-sm">
            <div className="flex items-center gap-3 text-slate-400">
              <MapPin size={16} className="text-teal-400" /> Lahore, Pakistan
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <GraduationCap size={16} className="text-teal-400" /> UCP · 4th Semester
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
