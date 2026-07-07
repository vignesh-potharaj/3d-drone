'use client';

import { useRef, useEffect, useState } from 'react';
import { MotionValue, useMotionValueEvent } from 'framer-motion';
import { SequenceData } from '@/data/infrahawkData';

interface SequenceCanvasProps {
  scrollYProgress: MotionValue<number>;
  data: SequenceData;
}

export default function SequenceCanvas({ scrollYProgress, data }: SequenceCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  
  const [currentFrame, setCurrentFrame] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const [allLoaded, setAllLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  
  // Animation state for vector fallback
  const animationFrameRef = useRef<number | null>(null);
  const rotationAngleRef = useRef(0);

  // Helper to pad frame numbers (e.g., 1 -> '0001')
  const pad = (num: number, size: number) => {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  };

  // Determine mobile vs desktop and pre-load images
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      return mobile;
    };

    const mobile = checkMobile();
    const folder = mobile ? data.mobilePath : data.desktopPath;
    
    // Clear previous images if folder changes
    imagesRef.current = [];
    setLoadedCount(0);
    setAllLoaded(false);
    setLoadError(false);

    let loaded = 0;
    const preloadedImages: HTMLImageElement[] = [];

    // Pre-load frames
    for (let i = 1; i <= data.frameCount; i++) {
      const img = new Image();
      const frameStr = pad(i, 3);
      img.src = `${folder}ezgif-frame-${frameStr}.png`;
      
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === data.frameCount) {
          setAllLoaded(true);
        }
      };

      img.onerror = () => {
        // If a file is missing, we still increment so loading state doesn't freeze
        loaded++;
        setLoadedCount(loaded);
        setLoadError(true);
      };

      preloadedImages.push(img);
    }
    
    imagesRef.current = preloadedImages;

    // Resize listener
    const handleResize = () => {
      drawFrame();
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [data]);

  // Map scrollYProgress to frame index
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Map scroll progress (0 to 1) linearly to frame (1 to 120)
    const frameIndex = Math.min(
      data.frameCount,
      Math.max(1, Math.floor(latest * data.frameCount) + 1)
    );
    if (frameIndex !== currentFrame) {
      setCurrentFrame(frameIndex);
    }
  });

  // Re-draw when current frame changes
  useEffect(() => {
    drawFrame();
  }, [currentFrame, allLoaded]);

  // Animation loop for fallback vector graphics when assets are missing
  useEffect(() => {
    const loop = () => {
      rotationAngleRef.current += 0.015;
      
      // If we are showing fallback vector graphics, we need to re-render
      const hasValidImage = allLoaded && 
        imagesRef.current[currentFrame - 1] && 
        imagesRef.current[currentFrame - 1].complete && 
        imagesRef.current[currentFrame - 1].naturalWidth > 0;
        
      if (!hasValidImage) {
        drawFrame();
      }
      
      animationFrameRef.current = requestAnimationFrame(loop);
    };
    
    animationFrameRef.current = requestAnimationFrame(loop);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [currentFrame, allLoaded]);

  // Draw frame logic
  const drawFrame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    // Scale canvas buffer for 4K sharpness
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const img = imagesRef.current[currentFrame - 1];
    
    // Check if image is loaded and valid
    if (img && img.complete && img.naturalWidth > 0) {
      // Draw image with object-fit: cover
      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;
      const canvasWidth = rect.width;
      const canvasHeight = rect.height;
      
      const imgRatio = imgWidth / imgHeight;
      const canvasRatio = canvasWidth / canvasHeight;
      
      let drawWidth = canvasWidth;
      let drawHeight = canvasHeight;
      let offsetX = 0;
      let offsetY = 0;
      
      if (canvasRatio > imgRatio) {
        drawHeight = canvasWidth / imgRatio;
        offsetY = (canvasHeight - drawHeight) / 2;
      } else {
        drawWidth = canvasHeight * imgRatio;
        offsetX = (canvasWidth - drawWidth) / 2;
      }
      
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      
      // Draw delicate floating overlay HUD elements on top
      drawHUDOverlay(ctx, rect.width, rect.height);
    } else {
      // Fallback vector drawing when webp sequences are missing
      drawVectorFallback(ctx, rect.width, rect.height);
    }
  };

  // Draw delicate grid lines and status overlays over the image
  const drawHUDOverlay = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = 'rgba(0, 122, 255, 0.15)';
    ctx.lineWidth = 0.5;

    // Draw thin grid lines
    const gridSize = 80;
    ctx.beginPath();
    for (let x = 0; x < width; x += gridSize) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = 0; y < width; y += gridSize) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();

    // Draw boundary coordinates
    ctx.fillStyle = 'rgba(0, 122, 255, 0.6)';
    ctx.font = '9px monospace';
    ctx.fillText(`SYS_SCAN // FRAME_${pad(currentFrame, 3)}`, 24, 34);
    ctx.fillText(`ID: ${data.id.toUpperCase()}_UAV`, 24, 46);
  };

  // High-End Vector Fallback Renderer (Simulated Aerospace HUD UI)
  const drawVectorFallback = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Clear canvas with a very dark slate grid background
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, width, height);

    const dBlue = 'rgba(0, 122, 255, 0.3)';
    const lBlue = '#007AFF';
    const dimWhite = 'rgba(229, 229, 229, 0.15)';
    
    // Draw background grid
    ctx.strokeStyle = 'rgba(0, 122, 255, 0.05)';
    ctx.lineWidth = 0.5;
    const grid = 60;
    ctx.beginPath();
    for (let x = 0; x < width; x += grid) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = 0; y < height; y += grid) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();

    // Draw center crosshair coordinate axes
    ctx.strokeStyle = 'rgba(0, 122, 255, 0.12)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(width / 2, 40);
    ctx.lineTo(width / 2, height - 40);
    ctx.moveTo(40, height / 2);
    ctx.lineTo(width - 40, height / 2);
    ctx.stroke();

    // Outer framing brackets
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.strokeRect(30, 30, width - 60, height - 60);

    // Render section-specific animations
    const cX = width / 2;
    const cY = height / 2;
    const angle = rotationAngleRef.current;
    
    ctx.save();
    
    if (data.id === 'vulcan') {
      // Vulcan Gun Fallback - Double barrel Gatling wireframe rotating
      // Concentric structural circles
      ctx.strokeStyle = dBlue;
      ctx.beginPath();
      ctx.arc(cX, cY, 120, 0, Math.PI * 2);
      ctx.arc(cX, cY, 80, 0, Math.PI * 2);
      ctx.stroke();

      // Outer targeting brackets
      ctx.strokeStyle = lBlue;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cX, cY, 140, angle, angle + Math.PI / 4);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cX, cY, 140, angle + Math.PI, angle + 5 * Math.PI / 4);
      ctx.stroke();

      // Rotating gun barrels (6 circular nodes representing barrels)
      ctx.translate(cX, cY);
      ctx.rotate(angle * 1.5);
      
      ctx.strokeStyle = lBlue;
      ctx.lineWidth = 1;
      for (let i = 0; i < 6; i++) {
        const rad = (i * Math.PI) / 3;
        const bX = Math.cos(rad) * 80;
        const bY = Math.sin(rad) * 80;
        
        // Barrel node circle
        ctx.fillStyle = '#050505';
        ctx.beginPath();
        ctx.arc(bX, bY, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        // Inner muzzle bore
        ctx.fillStyle = lBlue;
        ctx.beginPath();
        ctx.arc(bX, bY, 4, 0, Math.PI * 2);
        ctx.fill();

        // Connecting lines to core
        ctx.strokeStyle = 'rgba(0, 122, 255, 0.2)';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(bX, bY);
        ctx.stroke();
      }

      // Central shaft
      ctx.fillStyle = '#050505';
      ctx.strokeStyle = lBlue;
      ctx.beginPath();
      ctx.arc(0, 0, 30, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

    } else if (data.id === 'rotor') {
      // Rotor Fallback - Dual Contra-rotating Propellers
      ctx.translate(cX, cY);
      
      // Draw radar sweep circle
      ctx.strokeStyle = dBlue;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.arc(0, 0, 150, 0, Math.PI * 2);
      ctx.stroke();

      // Render propeller 1 (Top rotor spinning clockwise)
      ctx.save();
      ctx.rotate(angle * 2.5);
      ctx.strokeStyle = lBlue;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-160, 0);
      ctx.lineTo(160, 0);
      ctx.stroke();
      
      // Draw blade tips
      ctx.fillStyle = lBlue;
      ctx.beginPath();
      ctx.arc(-160, 0, 6, 0, Math.PI * 2);
      ctx.arc(160, 0, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Render propeller 2 (Bottom rotor spinning counter-clockwise)
      ctx.save();
      ctx.rotate(-angle * 2.5 - 0.5);
      ctx.strokeStyle = 'rgba(0, 122, 255, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-140, 0);
      ctx.lineTo(140, 0);
      ctx.stroke();
      
      ctx.fillStyle = 'rgba(0, 122, 255, 0.4)';
      ctx.beginPath();
      ctx.arc(-140, 0, 4, 0, Math.PI * 2);
      ctx.arc(140, 0, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Acoustic noise frequency waves (simulating silent operation dB reduction)
      ctx.strokeStyle = lBlue;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = -150; x < 150; x += 5) {
        // Multiplied sine waves for noise profile
        const yVal = Math.sin(x * 0.15 + angle * 10) * Math.cos(x * 0.05) * 12;
        if (x === -150) {
          ctx.moveTo(x, yVal);
        } else {
          ctx.lineTo(x, yVal);
        }
      }
      ctx.stroke();
      
    } else {
      // Chassis Fallback - 3D Wireframe Box / Drone Core
      ctx.translate(cX, cY);
      ctx.rotate(angle * 0.5);
      
      // Draw 3D wireframe box
      const size = 90;
      ctx.strokeStyle = lBlue;
      ctx.lineWidth = 1;

      // Draw double bezel central core
      ctx.strokeStyle = dBlue;
      ctx.beginPath();
      ctx.arc(0, 0, 110, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = lBlue;
      // Draw front face
      ctx.strokeRect(-size/2, -size/2, size, size);
      
      // Draw back face shifted
      ctx.strokeStyle = 'rgba(0, 122, 255, 0.4)';
      const shift = 40;
      ctx.strokeRect(-size/2 + shift, -size/2 - shift, size, size);

      // Connect corners
      ctx.beginPath();
      ctx.moveTo(-size/2, -size/2); ctx.lineTo(-size/2 + shift, -size/2 - shift);
      ctx.moveTo(size/2, -size/2); ctx.lineTo(size/2 + shift, -size/2 - shift);
      ctx.moveTo(-size/2, size/2); ctx.lineTo(-size/2 + shift, size/2 - shift);
      ctx.moveTo(size/2, size/2); ctx.lineTo(size/2 + shift, size/2 - shift);
      ctx.stroke();

      // Floating coordinates labels
      ctx.fillStyle = lBlue;
      ctx.font = '8px monospace';
      ctx.fillText("SYS_COR_X", -size/2 - 10, -size/2 - 10);
      ctx.fillText("SYS_COR_Y", size/2 + shift + 5, -size/2 - shift + 10);
    }
    
    ctx.restore();

    // Technical Stats overlay
    ctx.fillStyle = 'rgba(0, 122, 255, 0.6)';
    ctx.font = '9px monospace';
    ctx.fillText("SIMULATED WIREFRAME FEED", 30, height - 60);
    ctx.fillText("PRELOADING ENGINE FRAMES...", 30, height - 48);
    ctx.fillText(`BUFFERING: ${Math.round((loadedCount / data.frameCount) * 100)}%`, 30, height - 36);

    // Red line alert if frames missing entirely
    if (loadError && loadedCount === 0) {
      ctx.fillStyle = '#FF453A';
      ctx.fillText("LOCAL ASSET STREAM: NO SIGNAL (USING SYNTHETIC FEED)", 30, 48);
    }

    // Scroll progress dial
    ctx.strokeStyle = 'rgba(0, 122, 255, 0.3)';
    ctx.beginPath();
    ctx.arc(width - 50, height - 50, 20, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = lBlue;
    ctx.lineWidth = 2;
    ctx.beginPath();
    const progressAngle = scrollYProgress.get() * Math.PI * 2;
    ctx.arc(width - 50, height - 50, 20, -Math.PI / 2, progressAngle - Math.PI / 2);
    ctx.stroke();

    ctx.fillStyle = lBlue;
    ctx.font = '8px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`${Math.round(scrollYProgress.get() * 100)}%`, width - 50, height - 47);
    ctx.textAlign = 'left'; // Reset
  };

  return (
    <div className="absolute inset-0 w-full h-full bg-hawk-black">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block" 
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
