import { motion } from 'framer-motion';
import { EASE, viewport } from '../lib/motion';

export default function SectionHeading({ num, title }: { num: string; title: string }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.5, ease: EASE }}
      className="mb-14 flex items-center gap-4 font-display text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl"
    >
      <span className="font-mono text-lg text-teal-400 sm:text-xl">{num}.</span>
      {title}
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
        className="ml-2 h-px max-w-xs flex-1 origin-left bg-gradient-to-r from-teal-400/60 to-transparent"
      />
    </motion.h2>
  );
}
