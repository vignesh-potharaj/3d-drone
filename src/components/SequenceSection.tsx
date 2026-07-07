'use client';

import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import SequenceCanvas from './SequenceCanvas';
import SequenceHUD from './SequenceHUD';
import { SequenceData } from '@/data/infrahawkData';

interface SequenceSectionProps {
  data: SequenceData;
}

export default function SequenceSection({ data }: SequenceSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position across the 300vh segment
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section 
      id={data.id}
      ref={containerRef} 
      className="h-[300vh] relative bg-hawk-black"
    >
      {/* Sticky viewport block */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <SequenceCanvas scrollYProgress={scrollYProgress} data={data} />
        <SequenceHUD scrollYProgress={scrollYProgress} data={data} />
      </div>
    </section>
  );
}
