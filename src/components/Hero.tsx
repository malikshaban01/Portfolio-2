import { motion } from 'framer-motion';
import { Github, Linkedin, Download, ArrowRight, Mail } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute inset-0 radial-fade" />
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-float" />

      <div className="max-w-6xl mx-auto px-6 relative z-10 w-full">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-teal-400 text-sm mb-6 flex items-center gap-2"
        >
          <span className="h-px w-8 bg-teal-400" /> Hi, my name is
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-slate-100 dark:text-slate-100"
        >
          Muhammad <span className="block">Shaban <span className="text-gradient">Malik.</span></span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-500 mt-2 leading-tight"
        >
          I build & deploy things<br className="hidden sm:block" /> for the web.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 max-w-xl text-slate-400 text-base sm:text-lg leading-relaxed"
        >
          <span className="font-mono text-teal-400 text-sm">BS CS Student</span> · <span className="font-mono text-teal-400 text-sm">DevOps Intern @ PITB</span> · <span className="font-mono text-teal-400 text-sm">C++ Programmer</span>
          <br className="my-2" />
          <span className="block mt-3">Currently automating CI/CD pipelines on AWS and shipping containerized apps with Docker & GitHub Actions.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="/api/resume?download=1"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-teal-400 text-navy-950 rounded-lg font-semibold hover:bg-teal-300 transition shadow-lg shadow-teal-500/20"
          >
            <Download size={18} />
            Download Resume
          </a>
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 px-6 py-3 border border-teal-400 text-teal-400 rounded-lg font-semibold hover:bg-teal-400/10 transition"
          >
            View Projects
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 flex items-center gap-5"
        >
          <a href="https://github.com/malikshaban01" target="_blank" rel="noreferrer" aria-label="GitHub" className="text-slate-400 hover:text-teal-400 hover:-translate-y-0.5 transition">
            <Github size={22} />
          </a>
          <a href="https://www.linkedin.com/in/shaban-malik-799373378/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-slate-400 hover:text-teal-400 hover:-translate-y-0.5 transition">
            <Linkedin size={22} />
          </a>
          <a href="mailto:shabanmalik1238@gmail.com" aria-label="Email" className="text-slate-400 hover:text-teal-400 hover:-translate-y-0.5 transition">
            <Mail size={22} />
          </a>
          <span className="h-px flex-1 max-w-[120px] bg-slate-700" />
          <span className="font-mono text-xs text-slate-500">Lahore, PK</span>
        </motion.div>
      </div>
    </section>
  );
}
