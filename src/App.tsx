import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import { Responsibilities } from './components/Responsibilities';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
// Section IDs in order
const sectionIds = ['home', 'experience', 'skills', 'education', 'responsibilities', 'projects', 'contact'];
export function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [loading, setLoading] = useState(true);
  
  // Use ref to avoid stale closure issues
  const isManualScrollRef = useRef(false);
  const manualScrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);
  // Handle manual navigation click - temporarily disable scroll detection
  const handleNavClick = (section: string) => {
    isManualScrollRef.current = true;
    setActiveSection(section);
    
    // Clear existing timeout
    if (manualScrollTimeout.current) {
      clearTimeout(manualScrollTimeout.current);
    }
    
    // Re-enable scroll detection after animation completes
    manualScrollTimeout.current = setTimeout(() => {
      isManualScrollRef.current = false;
    }, 1200);
  };
  // Scroll-based section detection (more reliable than Intersection Observer)
  useEffect(() => {
    if (loading) return;
    const handleScroll = () => {
      // Skip if manual scroll is in progress
      if (isManualScrollRef.current) return;
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      // At very top of page - set to home
      if (window.scrollY < 100) {
        setActiveSection('home');
        return;
      }
      // At very bottom of page - set to contact
      if (window.scrollY + clientHeight >= scrollHeight - 50) {
        setActiveSection('contact');
        return;
      }
      // Find which section is currently in view
      let currentSection = 'home';
      
      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          
          if (scrollPosition >= elementTop) {
            currentSection = sectionId;
          }
        }
      }
      setActiveSection(currentSection);
    };
    // Run once on mount
    handleScroll();
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (manualScrollTimeout.current) {
        clearTimeout(manualScrollTimeout.current);
      }
    };
  }, [loading]);
  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500 flex items-center justify-center text-4xl font-bold text-slate-900 animate-glow">
                AW
              </div>
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-emerald-400"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-slate-400 text-lg"
            >
              Loading Portfolio...
            </motion.p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen bg-slate-950 text-white overflow-hidden"
        >
          {/* Animated Background */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-blob" />
            <div className="absolute top-3/4 -right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }} />
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }} />
            {/* Grid Pattern */}
            <div 
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: '50px 50px'
              }}
            />
          </div>
          <Navbar activeSection={activeSection} setActiveSection={handleNavClick} />
          <main className="relative z-10">
            <Hero />
            <Experience />
            <Skills />
            <Education />
            <Responsibilities />
            <Projects />
            <Contact />
          </main>
          
          {/* Premium Footer */}
          <footer className="relative z-10 border-t border-white/5 py-8">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center font-bold text-slate-900">
                    AW
                  </div>
                  <span className="text-slate-400">Arun Wakekar</span>
                </div>
                <p className="text-slate-500 text-sm">
                  © 2024 All rights reserved. Built with 💚 
                </p>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-slate-500">Quality Analyst</span>
                </div>
              </div>
            </div>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
