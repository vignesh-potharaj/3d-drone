'use client';

import { useRef } from 'react';
import { useScroll, useSpring, useTransform, motion } from 'framer-motion';
import SequenceCanvas from './SequenceCanvas';
import SequenceHUD from './SequenceHUD';
import { SequenceData } from '@/data/infrahawkData';

interface SequenceSectionProps {
  data: SequenceData;
}

export default function SequenceSection({ data }: SequenceSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position across the 450vh segment
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Remap progress to complete the sequence in the middle 70% of scroll travel.
  // The 15% buffer at the top and bottom allows the spring to fully settle at 0.0 and 1.0 respectively in both directions.
  const mappedProgress = useTransform(scrollYProgress, [0.15, 0.85], [0, 1]);

  // Smooth raw scroll outputs to eliminate mousewheel stutter
  const smoothProgress = useSpring(mappedProgress, {
    stiffness: 65,
    damping: 30,
    restDelta: 0.001
  });

  // Fade section in at start, and fade out at end based on PHYSICAL scroll position (scrollYProgress)
  // This ensures the drone is visible and static at both ends before/after transitioning.
  const sectionOpacity = useTransform(
    scrollYProgress,
    [0.0, 0.10, 0.90, 1.0],
    [0, 1, 1, 0]
  );

  return (
    <section 
      id={data.id}
      ref={containerRef} 
      className="h-[450vh] relative bg-hawk-black"
    >
      {/* Sticky viewport block */}
      <motion.div 
        style={{ opacity: sectionOpacity }}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        <SequenceCanvas scrollYProgress={smoothProgress} data={data} />
        <SequenceHUD scrollYProgress={smoothProgress} data={data} />
      </motion.div>
    </section>
  );
}
