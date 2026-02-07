import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, Briefcase, Code2, GraduationCap, ClipboardList, FolderKanban, Mail } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const navItems = [
  { id: 'home', label: 'Home', icon: User },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'skills', label: 'Skills', icon: Code2 },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'responsibilities', label: 'Roles', icon: ClipboardList },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export function Navbar({ activeSection, setActiveSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  const handleNavClick = useCallback((id: string) => {
    setActiveSection(id);
    setIsOpen(false);
    
    // Delay scroll to allow menu close animation
    setTimeout(() => {
      scrollToSection(id);
    }, 150);
  }, [setActiveSection, scrollToSection]);

  const handleMobileItemClick = useCallback((e: React.MouseEvent | React.TouchEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    handleNavClick(id);
  }, [handleNavClick]);

  const handleMobileMenuToggle = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(prev => !prev);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-slate-950/98 backdrop-blur-2xl shadow-2xl shadow-black/50 border-b border-white/10 py-2' : 'bg-slate-950/95 backdrop-blur-xl py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500 flex items-center justify-center font-bold text-slate-900 text-lg shadow-lg shadow-emerald-500/25">
                AW
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl blur opacity-30" />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-lg text-white">Arun Wakekar</span>
              <p className="text-xs text-emerald-400">Quality Analyst</p>
            </div>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center">
            <div className="flex items-center bg-white/5 backdrop-blur-xl rounded-full p-1.5 border border-white/10">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                    activeSection === item.id
                      ? 'text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center space-x-2">
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={handleMobileMenuToggle}
            onTouchEnd={handleMobileMenuToggle}
            className="lg:hidden p-3 rounded-xl glass-light text-white touch-manipulation select-none active:scale-95 transition-transform"
            aria-label="Toggle menu"
            type="button"
          >
            {isOpen ? <X className="w-6 h-6 pointer-events-none" /> : <Menu className="w-6 h-6 pointer-events-none" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[-1]"
              onClick={() => setIsOpen(false)}
              onTouchEnd={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="lg:hidden bg-slate-950/98 backdrop-blur-2xl border border-white/10 mt-2 mx-4 rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="p-4 space-y-2">
                {navItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={(e) => handleMobileItemClick(e, item.id)}
                      onTouchEnd={(e) => handleMobileItemClick(e, item.id)}
                      className={`w-full px-4 py-4 rounded-xl text-base font-medium transition-all duration-200 flex items-center space-x-3 touch-manipulation select-none active:scale-[0.98] ${
                        activeSection === item.id
                          ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white'
                          : 'text-slate-300 hover:bg-white/10 active:bg-white/15'
                      }`}
                      type="button"
                    >
                      <IconComponent className="w-5 h-5 pointer-events-none" />
                      <span className="pointer-events-none">{item.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
