'use client';

import { useTransform, motion, MotionValue } from 'framer-motion';
import { SequenceData } from '@/data/infrahawkData';

interface SequenceHUDProps {
  scrollYProgress: MotionValue<number>;
  data: SequenceData;
}

export default function SequenceHUD({ scrollYProgress, data }: SequenceHUDProps) {
  // Translate scrollYProgress into fluid HUD entrance and exit animations
  // Fades in at 0.15-0.30, holds steady, then fades out at 0.75-0.90
  const contentOpacity = useTransform(
    scrollYProgress,
    [0.0, 0.15, 0.3, 0.75, 0.9, 1.0],
    [0, 0, 1, 1, 0, 0]
  );
  
  // Subtle slide up and slide out on scroll transition
  const contentY = useTransform(
    scrollYProgress,
    [0.0, 0.15, 0.3, 0.75, 0.9, 1.0],
    [40, 20, 0, 0, -20, -40]
  );

  // Stats block staggered fade and slide
  const statsOpacity = useTransform(
    scrollYProgress,
    [0.0, 0.2, 0.35, 0.75, 0.85, 1.0],
    [0, 0, 1, 1, 0, 0]
  );
  
  const statsX = useTransform(
    scrollYProgress,
    [0.0, 0.2, 0.35, 0.75, 0.85, 1.0],
    [30, 20, 0, 0, 20, 30]
  );

  // Progress Bar scale
  const progressScaleY = useTransform(scrollYProgress, [0.0, 1.0], [0, 1]);

  return (
    <div className="absolute inset-0 pointer-events-none w-full h-full z-20 flex items-center justify-center">
      
      {/* Outer Tactical Border Frame */}
      <div className="absolute inset-4 sm:inset-6 md:inset-8 border border-white/5 flex flex-col justify-between p-4 sm:p-6 md:p-8">
        
        {/* Sub-corner crosshairs representing targeting bounds */}
        <div className="absolute top-12 left-12 w-2 h-2 border-t border-l border-hawk-blue/20"></div>
        <div className="absolute top-12 right-12 w-2 h-2 border-t border-r border-hawk-blue/20"></div>
        <div className="absolute bottom-12 left-12 w-2 h-2 border-b border-l border-hawk-blue/20"></div>
        <div className="absolute bottom-12 right-12 w-2 h-2 border-b border-r border-hawk-blue/20"></div>

        {/* 1. Scrolling Vertical Scrollbar Tracker (Left side indicator) */}
        <div className="absolute left-4 sm:left-6 md:left-8 top-1/4 bottom-1/4 w-[1px] bg-white/10 hidden sm:block">
          {/* Animated active range track */}
          <motion.div 
            style={{ scaleY: progressScaleY, originY: 0 }} 
            className="w-full h-full bg-hawk-blue shadow-[0_0_8px_rgba(0,122,255,0.8)]"
          />
          {/* Top and bottom markers */}
          <span className="absolute top-[-15px] left-1/2 -translate-x-1/2 font-mono text-[8px] text-hawk-platinum/40">0%</span>
          <span className="absolute bottom-[-15px] left-1/2 -translate-x-1/2 font-mono text-[8px] text-hawk-platinum/40">100%</span>
        </div>

        {/* Main Content Assembly grid */}
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center mt-12 md:mt-0">
          
          {/* 2. LEFT COLUMN: Text Descriptions */}
          <motion.div 
            style={{ opacity: contentOpacity, y: contentY }}
            className="col-span-1 md:col-span-6 flex flex-col text-left pl-0 sm:pl-8 md:pl-12"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-hawk-blue/10 border border-hawk-blue/35 text-hawk-blue rounded-full px-3 py-0.5 text-[10px] font-bold font-orbitron tracking-[0.2em] uppercase">
                SYSTEM MODULE
              </span>
              <span className="font-mono text-[10px] text-hawk-platinum/40">
                [ {data.id.toUpperCase()}_STAGE_02 ]
              </span>
            </div>
            
            <h2 className="font-orbitron font-black text-3xl sm:text-5xl lg:text-6xl tracking-[0.15em] text-white leading-none select-none uppercase">
              {data.title}
            </h2>
            
            <div className="w-12 h-[2px] bg-hawk-blue my-6 shadow-[0_0_8px_rgba(0,122,255,0.8)]"></div>
            
            <p className="font-rajdhani text-base sm:text-lg text-hawk-silver/90 max-w-md font-light leading-relaxed tracking-wide">
              {data.subtitle}
            </p>
          </motion.div>

          {/* 3. RIGHT COLUMN: Double-Bezel Spec Panel */}
          <motion.div 
            style={{ opacity: statsOpacity, x: statsX }}
            className="col-span-1 md:col-span-6 flex justify-start md:justify-end pr-0 md:pr-12"
          >
            {/* Outer Shell */}
            <div className="rounded-[1.5rem] bg-white/5 border border-white/10 p-1.5 backdrop-blur-sm w-full max-w-sm">
              {/* Inner Core */}
              <div className="rounded-[calc(1.5rem-0.375rem)] bg-hawk-black/80 border border-white/5 p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                
                {/* Header info */}
                <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-hawk-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="font-orbitron font-bold text-xs tracking-wider text-white">HARDWARE SPECS</span>
                  </div>
                  <span className="font-mono text-[9px] text-hawk-blue">CALIBRATED</span>
                </div>

                {/* Specs List */}
                <div className="flex flex-col gap-3 font-mono text-[10px] tracking-wide">
                  {data.specifications.map((spec, i) => {
                    const [key, value] = spec.split(': ');
                    return (
                      <div key={i} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0 last:pb-0">
                        <span className="text-hawk-platinum/55">{key}</span>
                        <span className="font-bold text-white text-right">{value}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Simulated diagnostic chart at bottom */}
                <div className="mt-5 pt-4 border-t border-white/10 flex flex-col gap-2">
                  <div className="flex justify-between text-[8px] font-mono text-hawk-platinum/40">
                    <span>SECTOR INTEGRITY</span>
                    <span className="text-hawk-blue">100% MATCH</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="h-full bg-hawk-blue shadow-[0_0_8px_rgba(0,122,255,0.8)]"
                    />
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

        </div>

        {/* 4. Scroll telemetry coordinate bar at the bottom */}
        <div className="flex justify-between items-center text-mono text-[9px] text-hawk-platinum/40 border-t border-white/5 pt-3">
          <span>LAT_SCAN: 34.0522°</span>
          <span>RANGE_STATUS: IN_BOUNDS</span>
          <span>LNG_SCAN: -118.2437°</span>
        </div>

      </div>
    </div>
  );
}
