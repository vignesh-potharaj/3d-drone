'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function HeroVideo() {
  const [currentVideo, setCurrentVideo] = useState('/videos/Video Project 6.mp4');
  const [telemetry, setTelemetry] = useState({
    altitude: 1240,
    speed: 340,
    heading: 184.2,
    pitch: 2.1,
    roll: -0.4,
    battery: 98,
    lat: 34.0522,
    lng: -118.2437
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);

  // Telemetry simulation engine
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => ({
        altitude: prev.altitude + Math.round((Math.random() - 0.5) * 6),
        speed: prev.speed + Math.round((Math.random() - 0.5) * 4),
        heading: +(prev.heading + (Math.random() - 0.5) * 0.4).toFixed(1),
        pitch: +(prev.pitch + (Math.random() - 0.5) * 0.1).toFixed(2),
        roll: +(prev.roll + (Math.random() - 0.5) * 0.1).toFixed(2),
        battery: prev.battery > 10 ? prev.battery - 0.001 : 98, // Slow drain simulation
        lat: +(prev.lat + (Math.random() - 0.5) * 0.0001).toFixed(5),
        lng: +(prev.lng + (Math.random() - 0.5) * 0.0001).toFixed(5)
      }));
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-hawk-black flex items-center justify-center">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 hud-noise opacity-30 pointer-events-none z-10"></div>
      
      {/* Absolute Video Loop */}
      <video
        key={currentVideo}
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        onError={() => setVideoError(true)}
        className="absolute inset-0 w-full h-full object-cover z-0 filter brightness-[0.45] contrast-[1.1]"
      >
        <source src={currentVideo} type="video/mp4" />
      </video>

      {/* High-Tech Video Fallback UI when file is not available */}
      {videoError && (
        <div className="absolute inset-0 bg-hawk-carbon z-0 flex items-center justify-center overflow-hidden">
          {/* Animated background grid */}
          <div className="absolute inset-0 opacity-[0.03] dashed-line w-full h-full bg-repeat"></div>
          {/* Rotating radar line */}
          <div className="absolute w-[800px] h-[800px] rounded-full border border-hawk-blue/10 flex items-center justify-center">
            <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-hawk-blue/20 to-transparent animate-spin [animation-duration:15s]"></div>
            <div className="absolute w-2/3 h-2/3 rounded-full border border-hawk-blue/5"></div>
            <div className="absolute w-1/3 h-1/3 rounded-full border border-hawk-blue/5"></div>
          </div>
          {/* Diagnostic state message */}
          <div className="z-10 font-mono text-xs text-hawk-blue/60 flex flex-col items-center gap-3">
            <span className="animate-pulse">SYNTHETIC RADAR FEED ACTIVE // NO CAMERA LINK</span>
            <div className="flex gap-2">
              <span className="px-2 py-0.5 border border-hawk-blue/30 rounded bg-hawk-blue/5 text-[10px]">RAW_STREAM: 0.0kb/s</span>
              <span className="px-2 py-0.5 border border-hawk-blue/30 rounded bg-hawk-blue/5 text-[10px]">SAT_CONN: SECURE</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Tactical HUD Frame (Skyframe Overlay) */}
      <div className="absolute inset-4 sm:inset-6 md:inset-8 border border-white/5 pointer-events-none z-20 flex flex-col justify-between p-4 sm:p-6 md:p-8">
        
        {/* Corner Brackets */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-hawk-blue/40"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-hawk-blue/40"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-hawk-blue/40"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-hawk-blue/40"></div>

        {/* TOP LAYER HUD */}
        <div className="flex justify-between items-start">
          {/* Top Left: Live Feed indicator */}
          <div className="flex items-center gap-3 font-mono text-xs">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-hawk-blue/10 border border-hawk-blue/20 rounded-full backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-slow"></span>
              <span className="font-bold text-white text-[10px] tracking-widest">LIVE FEED // SECURE_LINK</span>
            </div>
            <div className="hidden sm:flex flex-col text-[10px] text-hawk-platinum/40 leading-none">
              <span>FPS: 60.00</span>
              <span>CAM: FLIR-E</span>
            </div>
          </div>

          {/* Top Right: System Status & Diagnostic Codes */}
          <div className="flex flex-col items-end gap-1 font-mono text-[10px] text-hawk-platinum/75">
            <div className="flex gap-2">
              <span className="border border-white/10 px-1.5 py-0.5 rounded bg-black/35 backdrop-blur-sm">850 kW // HYBRID</span>
              <span className="border border-hawk-blue/20 text-hawk-blue px-1.5 py-0.5 rounded bg-hawk-blue/5 backdrop-blur-sm font-bold">LOCK: OFF</span>
            </div>
            <span className="text-right text-[9px] text-hawk-platinum/40">GPS STRENGTH: 99.4% (MIL-NET)</span>
            
            {/* Camera Stream Selector */}
            <div className="flex gap-2 mt-2 pointer-events-auto">
              <button
                onClick={() => {
                  setCurrentVideo('/videos/Video Project 6.mp4');
                  setVideoError(false);
                }}
                className={`border text-[9px] font-mono px-2 py-0.5 rounded transition-all duration-300 cursor-pointer ${
                  currentVideo === '/videos/Video Project 6.mp4'
                    ? 'border-hawk-blue text-white bg-hawk-blue/20 font-bold'
                    : 'border-white/10 text-hawk-platinum/60 bg-black/40 hover:border-hawk-blue/50'
                }`}
              >
                CAM: FEED V6 (16:9)
              </button>
              <button
                onClick={() => {
                  setCurrentVideo('/videos/Video Project 7.mp4');
                  setVideoError(false);
                }}
                className={`border text-[9px] font-mono px-2 py-0.5 rounded transition-all duration-300 cursor-pointer ${
                  currentVideo === '/videos/Video Project 7.mp4'
                    ? 'border-hawk-blue text-white bg-hawk-blue/20 font-bold'
                    : 'border-white/10 text-hawk-platinum/60 bg-black/40 hover:border-hawk-blue/50'
                }`}
              >
                CAM: FEED V7 (16:9)
              </button>
            </div>
          </div>
        </div>

        {/* CENTER TARGET RETICLE */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative flex items-center justify-center w-28 h-28 sm:w-36 sm:h-36">
            {/* Center crosshair */}
            <div className="w-2 h-2 rounded-full bg-hawk-blue/50"></div>
            {/* Inner rotating bracket */}
            <div className="absolute inset-0 border border-dashed border-hawk-blue/20 rounded-full animate-spin [animation-duration:30s]"></div>
            {/* Outer corner marks */}
            <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-hawk-blue/50"></div>
            <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-hawk-blue/50"></div>
            <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b border-l border-hawk-blue/50"></div>
            <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b border-r border-hawk-blue/50"></div>
            {/* Lock target overlay */}
            <div className="absolute top-[-30px] font-mono text-[9px] text-hawk-blue/60 tracking-wider">
              TARGETING MATRIX
            </div>
          </div>
        </div>

        {/* BOTTOM LAYER HUD */}
        <div className="flex flex-col sm:flex-row justify-between items-end gap-6 z-20">
          {/* Bottom Left: Title */}
          <div className="flex flex-col text-left">
            <span className="text-[10px] tracking-[0.3em] text-hawk-blue font-bold font-orbitron mb-1.5">TACTICAL UAV SYSTEM</span>
            <h1 className="font-orbitron font-black text-4xl sm:text-6xl tracking-[0.2em] text-white select-none leading-none">
              INFRAHAWK
            </h1>
            <p className="font-rajdhani text-sm sm:text-base text-hawk-platinum max-w-sm mt-3 tracking-wide font-light">
              Next-generation tactical autonomous system. 850 kW hybrid engine. High-performance surveillance and suppression framework.
            </p>
          </div>

          {/* Bottom Right: Real-time Telemetry Readout */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 bg-black/40 border border-white/5 backdrop-blur-md rounded-lg p-4 font-mono text-[10px] text-hawk-platinum/80 w-full sm:w-auto min-w-[220px]">
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span className="text-hawk-platinum/40">ALTITUDE</span>
              <span className="font-bold text-white text-right">{telemetry.altitude.toLocaleString()} FT</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span className="text-hawk-platinum/40">HEADING</span>
              <span className="font-bold text-white text-right">{telemetry.heading}° N</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span className="text-hawk-platinum/40">SPEED</span>
              <span className="font-bold text-white text-right">{telemetry.speed} KTS</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span className="text-hawk-platinum/40">BATTERY</span>
              <span className="font-bold text-hawk-blue text-right">{telemetry.battery.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between pt-0.5 col-span-2 text-[9px] text-hawk-platinum/40">
              <span>LAT: {telemetry.lat}</span>
              <span className="text-right">LNG: {telemetry.lng}</span>
            </div>
          </div>
        </div>

        {/* Scroll Prompt in Center Bottom */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-20 pointer-events-auto">
          <span className="font-orbitron text-[9px] font-bold tracking-[0.3em] text-hawk-blue select-none">
            SCROLL TO DEPLOY
          </span>
          <motion.div 
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-5 h-8 border border-hawk-blue/40 rounded-full flex justify-center p-1 cursor-pointer bg-black/20"
            onClick={() => {
              window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
              });
            }}
          >
            <div className="w-1.5 h-1.5 bg-hawk-blue rounded-full"></div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
