import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from '../data/links';
import { EASE, fadeUp, staggerContainer } from '../lib/motion';

const ROLES = ['Former DevOps Intern @ PITB', 'C++ Programmer', 'BS Computer Science Student'];
const STACK = ['C++', 'Linux', 'Docker', 'Git', 'CI/CD', 'AWS', 'Nginx'];

function useTypewriter(words: string[], enabled: boolean) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(words[0] ?? '');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const word = words[index % words.length];
    const done = text === word;
    const empty = text === '';
    const delay = done && !deleting ? 1600 : deleting ? 35 : 65;

    const timer = window.setTimeout(() => {
      if (!deleting) {
        if (done) setDeleting(true);
        else setText(word.slice(0, text.length + 1));
      } else if (empty) {
        setDeleting(false);
        setIndex(i => (i + 1) % words.length);
      } else {
        setText(word.slice(0, text.length - 1));
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [text, deleting, index, words, enabled]);

  return enabled ? text : (words[0] ?? '');
}

export default function Hero() {
  const reduce = useReducedMotion();
  const typed = useTypewriter(ROLES, !reduce);
  const sectionRef = useRef<HTMLElement>(null);
  const [heroImageFailed, setHeroImageFailed] = useState(false);

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = sectionRef.current;
    if (!el || reduce) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <section
      ref={sectionRef}
      onPointerMove={onPointerMove}
      className="relative flex min-h-screen items-center overflow-hidden pb-20 pt-28"
    >
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]"
      />
      {!heroImageFailed && (
        <img
          src="/assets/images/portfolio-hero.webp"
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          onError={() => setHeroImageFailed(true)}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.12] [mask-image:radial-gradient(ellipse_75%_65%_at_65%_45%,black,transparent)]"
        />
      )}
      <div aria-hidden className="radial-fade pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            'radial-gradient(600px circle at var(--mx, 75%) var(--my, 18%), rgba(45,212,191,0.09), transparent 60%)',
        }}
      />
      <div
        aria-hidden
        className="animate-aurora pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl"
      />
      <div
        aria-hidden
        className="animate-aurora pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-cyan-500/[0.07] blur-3xl [animation-delay:-6s]"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-14 px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div variants={staggerContainer} initial="hidden" animate="show">
          <motion.div
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-400/[0.06] px-3 py-1.5 font-mono text-xs text-teal-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-400" />
            </span>
            Available for internships
          </motion.div>

          <motion.p variants={fadeUp} className="mb-5 font-mono text-sm text-slate-400">
            Hi, my name is
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-display text-5xl font-bold leading-[0.95] tracking-tight text-slate-100 sm:text-6xl lg:text-7xl"
          >
            Muhammad Shaban <span className="text-gradient">Malik.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 font-display text-2xl font-semibold leading-tight text-slate-400 sm:text-3xl"
          >
            I build &amp; deploy things for the web.
          </motion.p>

          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
            <span className="text-slate-200">BS Computer Science student</span> and{' '}
            <span className="text-slate-200">former DevOps Intern @ PITB</span>, where I automated CI/CD
            pipelines on AWS and shipped containerized apps with Docker &amp; GitHub Actions.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-xl bg-teal-400 px-6 py-3 font-semibold text-navy-950 shadow-lg shadow-teal-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-300 hover:shadow-teal-400/30"
            >
              View Projects
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-xl border border-white/10 px-6 py-3 font-semibold text-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-400/40 hover:bg-white/[0.03] hover:text-teal-300"
            >
              Get in touch
              <Mail size={17} className="text-slate-400 transition-colors group-hover:text-teal-300" />
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-5 text-sm text-slate-500">
            <div className="flex items-center gap-4">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="text-slate-400 transition-colors hover:text-teal-400"
              >
                <Github size={20} />
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="text-slate-400 transition-colors hover:text-teal-400"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={`mailto:${EMAIL}`}
                aria-label="Email"
                className="text-slate-400 transition-colors hover:text-teal-400"
              >
                <Mail size={20} />
              </a>
            </div>
            <span className="hidden h-4 w-px bg-white/10 sm:block" />
            <span className="inline-flex items-center gap-1.5 font-mono text-xs">
              <MapPin size={13} className="text-teal-400" /> Lahore, PK
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div
            aria-hidden
            className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-teal-400/15 via-cyan-400/5 to-transparent blur-2xl"
          />
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-navy-900/60 shadow-2xl shadow-black/40 backdrop-blur-xl">
            <div className="flex items-center gap-1.5 border-b border-white/[0.07] bg-white/[0.02] px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              <span className="ml-3 font-mono text-[11px] text-slate-500">shaban@portfolio — zsh</span>
            </div>
            <div className="space-y-3 p-5 font-mono text-[13px] leading-relaxed sm:p-6">
              <p>
                <span className="text-teal-400">➜</span> <span className="text-slate-300">whoami</span>
              </p>
              <p className="text-slate-400">Muhammad Shaban Malik</p>
              <p className="pt-1">
                <span className="text-teal-400">➜</span> <span className="text-slate-300">cat role.txt</span>
              </p>
              <p className="min-h-6 text-slate-100">
                {typed}
                <span className="blink ml-0.5 text-teal-400">▍</span>
              </p>
              <p className="pt-1">
                <span className="text-teal-400">➜</span> <span className="text-slate-300">ls ~/stack</span>
              </p>
              <div className="flex flex-wrap gap-1.5 pl-5">
                {STACK.map(s => (
                  <span
                    key={s}
                    className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2 py-0.5 text-[11px] text-slate-400"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <p className="pt-1">
                <span className="text-teal-400">➜</span> <span className="text-slate-300">echo $STATUS</span>
              </p>
              <p className="inline-flex items-center gap-2 text-teal-300">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                open to internships
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 transition-colors hover:text-teal-400 md:flex"
      >
        scroll
        <span className="flex h-8 w-5 items-start justify-center rounded-full border border-slate-700 p-1">
          <motion.span
            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="h-1.5 w-1 rounded-full bg-teal-400"
          />
        </span>
      </motion.a>
    </section>
  );
}
