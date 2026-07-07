'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import HeroVideo from '@/components/HeroVideo';
import SequenceSection from '@/components/SequenceSection';
import { infrahawkData } from '@/data/infrahawkData';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    agency: '',
    email: '',
    clearance: 'NATO LEVEL 1',
    payload: 'FULL CONFIGURATION',
    notes: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate tactical signal transmitting
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  return (
    <main className="bg-hawk-black text-hawk-white min-h-screen relative font-rajdhani">
      {/* Background Subtle Grid Texture */}
      <div className="absolute inset-0 hud-noise pointer-events-none opacity-20 z-0"></div>

      {/* Floating HUD Navbar */}
      <Navbar />
      
      {/* Fullscreen Video Hero Segment */}
      <HeroVideo />
      
      {/* Scrolling Interactive Core */}
      <div className="relative z-20">
        
        {/* Engineering Mastery Header */}
        <div id="overview" className="py-40 text-center bg-hawk-black relative flex flex-col items-center justify-center overflow-hidden border-y border-white/5">
          {/* Subtle background radar ring */}
          <div className="absolute w-[600px] h-[600px] border border-hawk-blue/5 rounded-full pointer-events-none opacity-40"></div>
          
          <span className="text-[10px] tracking-[0.4em] text-hawk-blue font-bold font-orbitron mb-3 block">
            CLASSIFIED BRIEFING
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-orbitron tracking-[0.2em] max-w-2xl text-white uppercase px-4 leading-tight">
            ENGINEERING MASTERY
          </h2>
          <div className="w-16 h-[1px] bg-white/20 my-6"></div>
          <p className="font-rajdhani text-sm sm:text-base text-hawk-platinum/60 max-w-md uppercase tracking-wider px-6">
            Hover-capable hybrid propulsion uav systems engineered for high-threat theater deployment.
          </p>
        </div>
        
        {/* Dynamic Canvas Scrolling sequences (Vulcan, Rotor, Chassis) */}
        {infrahawkData.sequences.map((seq, index) => (
          <div key={seq.id}>
            <SequenceSection data={seq} />
            
            {/* Tactical Transition Spacing Divider */}
            {index < infrahawkData.sequences.length - 1 && (
              <div className="h-[40vh] bg-hawk-black relative flex items-center justify-center border-y border-white/5 overflow-hidden">
                <div className="absolute inset-0 hud-noise pointer-events-none opacity-10"></div>
                <div className="w-full max-w-5xl px-8 flex justify-between items-center text-[10px] font-mono text-hawk-platinum/30">
                  <div className="flex items-center gap-4">
                    <span className="w-1.5 h-1.5 bg-hawk-blue rounded-full animate-pulse-slow"></span>
                    <span className="tracking-[0.2em] uppercase">SYSTEM TRANSITION // SYNC_OK</span>
                  </div>
                  <div className="flex-1 mx-8 border-t border-dashed border-white/10"></div>
                  <span className="tracking-[0.1em] text-hawk-blue uppercase">INITIATING NEXT SCHEMATIC NODE</span>
                </div>
              </div>
            )}
          </div>
        ))}
        
        {/* Inquire / Acquisition Form Section with Double-Bezel Architecture */}
        <section 
          id="inquire-section" 
          className="relative py-32 bg-hawk-black flex flex-col items-center justify-center px-4 overflow-hidden border-t border-white/5"
        >
          {/* Ambient glow backgrounds */}
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-hawk-blue/5 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="w-full max-w-4xl flex flex-col items-center text-center relative z-10">
            <span className="text-[10px] tracking-[0.3em] text-hawk-blue font-bold font-orbitron mb-3">
              ACQUISITION PORTAL
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-orbitron tracking-[0.15em] mb-4 text-white uppercase">
              TRANSMIT ACQUISITION SIGNAL
            </h2>
            <p className="font-rajdhani text-sm sm:text-base text-hawk-platinum max-w-lg mb-12 font-light">
              Submit credentials to access complete schematic details, thermal blueprints, and hybrid engine propulsion diagnostics.
            </p>

            {/* Double-Bezel Card Container */}
            <div className="rounded-[2rem] bg-white/5 border border-white/10 p-2 backdrop-blur-md w-full max-w-2xl text-left">
              <div className="rounded-[calc(2rem-0.5rem)] bg-hawk-carbon border border-white/5 p-6 sm:p-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
                
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form 
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-6"
                    >
                      {/* Name & Agency inputs */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label className="font-mono text-[9px] tracking-widest text-hawk-platinum/50 uppercase">OFFICER NAME</label>
                          <input 
                            type="text" 
                            required
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            className="bg-black/40 border border-white/10 focus:border-hawk-blue rounded-lg px-4 py-3 text-xs font-mono tracking-wide text-white outline-none transition-colors duration-300"
                            placeholder="e.g. MAJ. A. MILLER"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="font-mono text-[9px] tracking-widest text-hawk-platinum/50 uppercase">GOVERNMENT AGENCY</label>
                          <input 
                            type="text" 
                            required
                            value={formData.agency}
                            onChange={(e) => setFormData(prev => ({ ...prev, agency: e.target.value }))}
                            className="bg-black/40 border border-white/10 focus:border-hawk-blue rounded-lg px-4 py-3 text-xs font-mono tracking-wide text-white outline-none transition-colors duration-300"
                            placeholder="e.g. DEPT OF DEFENSE"
                          />
                        </div>
                      </div>

                      {/* Email input */}
                      <div className="flex flex-col gap-2">
                        <label className="font-mono text-[9px] tracking-widest text-hawk-platinum/50 uppercase">SECURE COMM EMAIL</label>
                        <input 
                          type="email" 
                          required
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          className="bg-black/40 border border-white/10 focus:border-hawk-blue rounded-lg px-4 py-3 text-xs font-mono tracking-wide text-white outline-none transition-colors duration-300"
                          placeholder="e.g. miller.a@dod.gov"
                        />
                      </div>

                      {/* Clearance Level & Payload Configuration dropdowns */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label className="font-mono text-[9px] tracking-widest text-hawk-platinum/50 uppercase">CLEARANCE STATUS</label>
                          <select 
                            value={formData.clearance}
                            onChange={(e) => setFormData(prev => ({ ...prev, clearance: e.target.value }))}
                            className="bg-black/40 border border-white/10 focus:border-hawk-blue rounded-lg px-4 py-3 text-xs font-mono tracking-wide text-white outline-none transition-colors duration-300 cursor-pointer"
                          >
                            <option value="NATO LEVEL 1">NATO LEVEL 1 (RESTRICTED)</option>
                            <option value="SECRET">NATO LEVEL 2 (SECRET)</option>
                            <option value="TOP SECRET">NATO LEVEL 3 (TOP SECRET)</option>
                            <option value="COSMIC">COSMIC TOP SECRET (EYES ONLY)</option>
                          </select>
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="font-mono text-[9px] tracking-widest text-hawk-platinum/50 uppercase">PAYLOAD REQUIREMENTS</label>
                          <select 
                            value={formData.payload}
                            onChange={(e) => setFormData(prev => ({ ...prev, payload: e.target.value }))}
                            className="bg-black/40 border border-white/10 focus:border-hawk-blue rounded-lg px-4 py-3 text-xs font-mono tracking-wide text-white outline-none transition-colors duration-300 cursor-pointer"
                          >
                            <option value="FULL CONFIGURATION">FULL TACTICAL CONFIGURATION</option>
                            <option value="VULCAN SUPPRESSION">VULCAN SYSTEM ONLY</option>
                            <option value="RECONNAISSANCE ONLY">SILENT FLIGHT RECON ONLY</option>
                            <option value="CUSTOM PAYLOAD">CUSTOM SPECS (BRIEF BELOW)</option>
                          </select>
                        </div>
                      </div>

                      {/* Message notes */}
                      <div className="flex flex-col gap-2">
                        <label className="font-mono text-[9px] tracking-widest text-hawk-platinum/50 uppercase">SECURITY CLEARANCE BRIEF / REQUEST NOTES</label>
                        <textarea 
                          rows={4}
                          value={formData.notes}
                          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                          className="bg-black/40 border border-white/10 focus:border-hawk-blue rounded-lg px-4 py-3 text-xs font-mono tracking-wide text-white outline-none transition-colors duration-300 resize-none"
                          placeholder="Detail specific mission parameters..."
                        />
                      </div>

                      {/* Submit CTA Button with trailing arrow */}
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="group relative w-full flex items-center justify-center gap-3 bg-white hover:bg-hawk-blue text-hawk-black hover:text-white rounded-full py-4 text-xs font-bold font-orbitron tracking-[0.2em] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]"
                      >
                        {isSubmitting ? 'TRANSMITTING ENCRYPTED PACKETS...' : 'TRANSMIT ACQUISITION SIGNAL'}
                        <div className="w-6 h-6 rounded-full bg-hawk-black/10 group-hover:bg-white/20 flex items-center justify-center transition-colors duration-500">
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
                    </motion.form>
                  ) : (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                      className="flex flex-col items-center text-center py-10"
                    >
                      {/* Locking success graphic */}
                      <div className="w-16 h-16 border border-emerald-500 rounded-full flex items-center justify-center mb-6 relative">
                        <div className="absolute w-20 h-20 border border-emerald-500/30 rounded-full animate-ping [animation-duration:3s]"></div>
                        <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>

                      <h3 className="font-orbitron font-black text-xl tracking-[0.2em] mb-2 text-white">
                        TRANSMISSION SECURED
                      </h3>
                      <p className="font-mono text-[10px] text-emerald-400 mb-6">
                        SIGNAL ACQUIRED // CHECKSUM OK // CODE_200
                      </p>
                      
                      <div className="w-full bg-black/40 border border-white/5 rounded-lg p-5 text-left font-mono text-[9px] text-hawk-platinum/60 flex flex-col gap-2 max-w-md mb-8">
                        <div><span className="text-hawk-blue">ENCRYPT_MD5:</span> ec5b64c0ae36dfd9b3a0e6988</div>
                        <div><span className="text-hawk-blue">DESTINATION:</span> INFRAHAWK_SECURE_VAULT_DE</div>
                        <div><span className="text-hawk-blue">SENDER_GATEWAY:</span> Government Satellite MIL-8</div>
                        <div><span className="text-hawk-blue">RESPONSE:</span> A liaison officer will verify your clearance ({formData.clearance}) and contact your agency shortly.</div>
                      </div>

                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="font-orbitron font-bold text-[10px] tracking-widest text-hawk-blue hover:text-white transition-colors uppercase border border-hawk-blue/20 hover:border-white px-5 py-2.5 rounded-full bg-hawk-blue/5"
                      >
                        TRANSMIT ANOTHER SIGNAL
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>
          </div>
        </section>

        {/* Tactical Footer */}
        <footer className="bg-[#020202] border-t border-white/5 py-12 text-center text-hawk-platinum/40 relative z-20 font-mono text-[10px]">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start gap-2">
              <span className="font-orbitron font-bold tracking-[0.2em] text-white">INFRAHAWK DIVISION</span>
              <p className="font-rajdhani text-[11px] font-light">ALL RIGHTS RESERVED. FOR AUTHORIZED DEFENSE PERSONNEL USE ONLY.</p>
            </div>
            
            <div className="flex gap-6">
              <a href="#" className="hover:text-hawk-blue transition-colors">SPEC_SHEET.PDF</a>
              <a href="#" className="hover:text-hawk-blue transition-colors">LEGAL_PROT.MIL</a>
              <a href="#" className="hover:text-hawk-blue transition-colors">SYSTEM_SYS</a>
            </div>
            
            <div className="text-right flex flex-col items-center md:items-end gap-1 font-mono text-[8px] text-hawk-platinum/30">
              <span>DESIGNATION: 850kW_UAV_SYS</span>
              <span>RESTRICTED DISTR // SEC_443</span>
            </div>
          </div>
        </footer>

      </div>
    </main>
  );
}
