import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Timeline from '../components/Timeline';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <Contact />
      </main>
      <Footer />

      {/* Side rails */}
      <div className="hidden lg:flex fixed left-6 bottom-0 flex-col items-center gap-6 after:content-[''] after:w-px after:h-24 after:bg-slate-600">
        <a href="https://github.com/malikshaban01" target="_blank" rel="noreferrer" aria-label="GitHub" className="text-slate-400 hover:text-teal-400 hover:-translate-y-1 transition">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.77-1.34-1.77-1.09-.75.08-.73.08-.73 1.21.09 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.53.11-3.18 0 0 1-.32 3.3 1.23.96-.27 1.98-.4 3-.4 1.02 0 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.31 24 12c0-6.63-5.37-12-12-12z"/></svg>
        </a>
        <a href="https://www.linkedin.com/in/shaban-malik-799373378/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-slate-400 hover:text-teal-400 hover:-translate-y-1 transition">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5C0 2.12 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zm7.66 0h4.37v1.9h.06c.61-1.15 2.09-2.36 4.3-2.36 4.6 0 5.45 3.03 5.45 6.97V22h-4.55v-6.66c0-1.59-.03-3.63-2.21-3.63-2.21 0-2.55 1.73-2.55 3.51V22H7.88V8z"/></svg>
        </a>
      </div>

      <div className="hidden lg:flex fixed right-6 bottom-0 flex-col items-center gap-6 after:content-[''] after:w-px after:h-24 after:bg-slate-600">
        <a href="mailto:shabanmalik1238@gmail.com" className="font-mono text-xs text-slate-400 hover:text-teal-400 hover:-translate-y-1 transition tracking-widest" style={{ writingMode: 'vertical-rl' }}>
          shabanmalik1238@gmail.com
        </a>
      </div>
    </div>
  );
}
