import { motion } from 'framer-motion';

export default function SectionHeading({ num, title }: { num: string; title: string }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-4 mb-12 text-2xl sm:text-3xl font-bold text-slate-100 dark:text-slate-100"
    >
      <span className="font-mono text-teal-400 text-xl sm:text-2xl">{num}.</span>
      {title}
      <span className="h-px flex-1 max-w-xs bg-slate-700 ml-2" />
    </motion.h2>
  );
}
