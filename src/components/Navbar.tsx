import { useState, useEffect, useCallback, useRef } from 'react';
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
  const [isAnimating, setIsAnimating] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
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

  const handleDesktopNavClick = useCallback((id: string) => {
    setActiveSection(id);
    scrollToSection(id);
  }, [setActiveSection, scrollToSection]);

  const handleMobileItemClick = useCallback((id: string) => {
    if (isAnimating) return;
    
    setActiveSection(id);
    setIsOpen(false);
    
    // Delay scroll to allow menu to close
    requestAnimationFrame(() => {
      setTimeout(() => {
        scrollToSection(id);
      }, 50);
    });
  }, [setActiveSection, scrollToSection, isAnimating]);

  const toggleMenu = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setIsOpen(prev => !prev);
    
    // Prevent rapid toggling - debounce
    setTimeout(() => {
      setIsAnimating(false);
    }, 350);
  }, [isAnimating]);

  const closeMenu = useCallback(() => {
    if (isAnimating || !isOpen) return;
    setIsOpen(false);
  }, [isAnimating, isOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 will-change-transform ${
        scrolled 
          ? 'bg-slate-950 shadow-2xl shadow-black/50 border-b border-white/10 py-2' 
          : 'bg-slate-950/95 py-4'
      }`}
      style={{ 
        transform: 'translate3d(0, 0, 0)',
        WebkitTransform: 'translate3d(0, 0, 0)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500 flex items-center justify-center font-bold text-slate-900 text-lg shadow-lg shadow-emerald-500/25">
                AW
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-lg text-white">Arun Wakekar</span>
              <p className="text-xs text-emerald-400">Quality Analyst</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center">
            <div className="flex items-center bg-white/5 rounded-full p-1.5 border border-white/10">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleDesktopNavClick(item.id)}
                    className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center space-x-2 hover:scale-105 active:scale-95 ${
                      activeSection === item.id
                        ? 'text-white bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-lg shadow-emerald-500/25'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={toggleMenu}
            disabled={isAnimating}
            className="lg:hidden p-3 rounded-xl bg-white/5 border border-white/10 text-white select-none disabled:opacity-50"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            style={{ 
              WebkitTapHighlightColor: 'transparent',
              touchAction: 'manipulation'
            }}
          >
            <div className="w-6 h-6 relative">
              <span 
                className={`absolute inset-0 transition-all duration-300 ${isOpen ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'}`}
              >
                <X className="w-6 h-6" />
              </span>
              <span 
                className={`absolute inset-0 transition-all duration-300 ${isOpen ? 'opacity-0 -rotate-90' : 'opacity-100 rotate-0'}`}
              >
                <Menu className="w-6 h-6" />
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <div
        className={`lg:hidden fixed inset-0 top-0 bg-black/70 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMenu}
        aria-hidden="true"
        style={{ 
          WebkitTapHighlightColor: 'transparent'
        }}
      />
      
      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`lg:hidden absolute left-4 right-4 top-full mt-2 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl shadow-black/50 z-50 overflow-hidden transition-all duration-300 ease-out ${
          isOpen 
            ? 'opacity-100 translate-y-0 visible' 
            : 'opacity-0 -translate-y-4 invisible'
        }`}
        style={{ 
          transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(0, -16px, 0)',
          WebkitTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(0, -16px, 0)'
        }}
      >
        <div className="p-3 space-y-1">
          {navItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleMobileItemClick(item.id)}
                disabled={isAnimating}
                className={`w-full px-4 py-4 rounded-xl text-base font-medium flex items-center space-x-3 select-none transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/20'
                    : 'text-slate-300 bg-slate-800/50 active:bg-slate-700'
                }`}
                style={{ 
                  WebkitTapHighlightColor: 'transparent',
                  touchAction: 'manipulation',
                  transitionDelay: isOpen ? `${index * 30}ms` : '0ms',
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateX(0)' : 'translateX(-10px)'
                }}
              >
                <IconComponent className="w-5 h-5 flex-shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
