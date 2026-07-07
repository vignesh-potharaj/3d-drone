'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [systemTime, setSystemTime] = useState('00:00:00 UTC');

  // Handle scroll detection for glassmorphism updates
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Live UTC military clock for tactical HUD realism
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toISOString().split('T')[1].slice(0, 8);
      setSystemTime(`${timeStr} UTC`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const navLinks = [
    { name: 'OVERVIEW', href: '#overview' },
    { name: 'VULCAN M134', href: '#vulcan' },
    { name: 'SILENT PROPULSION', href: '#rotor' },
    { name: 'TITANIUM CHASSIS', href: '#chassis' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-500 ease-out mt-4 md:mt-6">
        {/* Double-Bezel Floating Navigation Enclosure */}
        <div className={`
          w-full max-w-7xl rounded-full p-[1px] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
          ${scrolled 
            ? 'bg-gradient-to-r from-hawk-blue/20 via-white/10 to-hawk-blue/20 shadow-[0_8px_32px_0_rgba(0,122,255,0.08)]' 
            : 'bg-white/5'
          }
        `}>
          <div className={`
            flex items-center justify-between rounded-full py-2.5 px-4 md:px-6 transition-all duration-500
            ${scrolled 
              ? 'bg-hawk-black/85 backdrop-blur-xl border border-white/5' 
              : 'bg-hawk-black/40 backdrop-blur-md border border-white/5'
            }
          `}>
            
            {/* Logo Section */}
            <div className="flex items-center gap-3">
              <a href="#" className="flex items-center gap-2 group">
                <span className="w-2.5 h-2.5 rounded-full bg-hawk-blue relative flex items-center justify-center">
                  <span className="absolute w-full h-full rounded-full bg-hawk-blue animate-ping opacity-75"></span>
                </span>
                <span className="font-orbitron font-black text-sm tracking-[0.25em] text-white transition-colors group-hover:text-hawk-blue">
                  INFRAHAWK
                </span>
                <span className="hidden sm:inline font-rajdhani text-[10px] font-bold tracking-widest text-hawk-platinum border border-white/15 px-1.5 py-0.5 rounded bg-white/5">
                  SYS: ACTIVE
                </span>
              </a>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="font-rajdhani text-xs font-semibold tracking-[0.2em] text-hawk-platinum hover:text-hawk-blue transition-colors duration-300 relative py-1 group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-hawk-blue transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </nav>

            {/* Right Side Info & CTA */}
            <div className="flex items-center gap-3 md:gap-5">
              {/* Telemetry info */}
              <div className="hidden lg:flex flex-col text-right font-mono text-[9px] tracking-wider text-hawk-platinum/60">
                <span>NET: SECURE</span>
                <span>{systemTime}</span>
              </div>

              {/* Inquire CTA Button with Nested Island Button Architecture */}
              <button 
                onClick={() => {
                  const el = document.getElementById('inquire-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative flex items-center gap-3 bg-white text-hawk-black hover:bg-hawk-blue hover:text-white rounded-full pl-4 pr-1.5 py-1.5 text-[11px] font-bold font-orbitron tracking-[0.15em] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-95 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]"
              >
                INQUIRE
                <div className="w-5 h-5 rounded-full bg-hawk-black/10 group-hover:bg-white/20 flex items-center justify-center transition-colors duration-500">
                  <svg 
                    className="w-2.5 h-2.5 stroke-current transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
                    viewBox="0 0 10 10" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1 9L9 1M9 1H3M9 1V7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden flex flex-col justify-center items-center w-8 h-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                aria-label="Toggle menu"
              >
                <div className="w-3.5 h-2 relative flex flex-col justify-between">
                  <span className={`w-full h-[1.5px] bg-white rounded transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-[3px]' : ''}`}></span>
                  <span className={`w-full h-[1.5px] bg-white rounded transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-[3px]' : ''}`}></span>
                </div>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-40 bg-hawk-black/95 backdrop-blur-2xl flex flex-col justify-between p-8 md:hidden"
          >
            {/* Background elements */}
            <div className="absolute inset-0 hud-noise pointer-events-none opacity-20"></div>
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-hawk-blue/5 blur-[100px] pointer-events-none"></div>

            {/* Header placeholder spacer */}
            <div className="h-16"></div>

            {/* Links container */}
            <nav className="flex flex-col gap-6 text-left my-auto">
              <span className="text-[10px] tracking-[0.3em] text-hawk-blue font-orbitron font-bold">SYSTEM MAP</span>
              <div className="w-full h-[1px] bg-white/15"></div>
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                  onClick={() => setMenuOpen(false)}
                  className="font-orbitron font-bold text-2xl tracking-wider text-white hover:text-hawk-blue transition-colors flex items-center justify-between group"
                >
                  {link.name}
                  <span className="text-xs font-mono text-hawk-platinum/40 group-hover:text-hawk-blue transition-colors">
                    [ 0{index + 1} ]
                  </span>
                </motion.a>
              ))}
            </nav>

            {/* Bottom details */}
            <div className="flex flex-col gap-4 text-xs font-mono text-hawk-platinum/60">
              <div className="flex justify-between items-center border-t border-white/10 pt-4">
                <span>TIME IND: {systemTime}</span>
                <span>SECURE COMMS</span>
              </div>
              <p className="text-[10px] text-center text-hawk-platinum/40 font-rajdhani tracking-wider">
                INFRAHAWK UAV SYSTEM SPECIFICATION PANEL // V1.0.4
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
