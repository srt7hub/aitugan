"use client";
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
  type?: 'image' | 'video';
}

interface CircularTestimonialsProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
}

export const CircularTestimonials = ({
  testimonials,
  autoplay = false,
}: CircularTestimonialsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const testimonialsLength = useMemo(() => testimonials.length, [testimonials]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === activeIndex) {
          video.play().catch(e => console.error("Video play failed:", e));
        } else {
          video.pause();
        }
      }
    });
  }, [activeIndex]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonialsLength);
  }, [testimonialsLength]);
  
  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonialsLength) % testimonialsLength);
  }, [testimonialsLength]);

  const getCardStyle = (index: number) => {
    const diff = (index - activeIndex + testimonialsLength) % testimonialsLength;
    let offset = diff;
    if (offset > testimonialsLength / 2) {
      offset -= testimonialsLength;
    } else if (offset < -testimonialsLength / 2) {
      offset += testimonialsLength;
    }

    const isActive = offset === 0;
    const isVisible = Math.abs(offset) <= 1;

    let transform = 'translateX(0) scale(1) translateZ(0) rotateY(0)';
    let zIndex = 10;
    let opacity = 0;

    if (isActive) {
      transform = 'translateX(0) scale(1) translateZ(0) rotateY(0)';
      zIndex = 30;
      opacity = 1;
    } else if (isVisible) {
      const direction = offset; // 1 or -1
      // On mobile we might want less translation
      transform = `translateX(calc(${direction * 60}%)) scale(0.85) translateZ(-100px) rotateY(${-direction * 15}deg)`;
      zIndex = 20;
      opacity = 0.5;
    } else {
      transform = `translateX(${Math.sign(offset) * 100}%) scale(0.7) translateZ(-300px) rotateY(0)`;
      zIndex = 0;
      opacity = 0;
    }

    return {
      transform,
      zIndex,
      opacity,
      transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    };
  };

  return (
    <div className="w-full relative h-[500px] md:h-[600px] flex items-center justify-center perspective-[2000px] overflow-hidden">
      
      {testimonials.map((testimonial, index) => {
        const diff = (index - activeIndex + testimonialsLength) % testimonialsLength;
        let offset = diff;
        if (offset > testimonialsLength / 2) offset -= testimonialsLength;
        const isActive = offset === 0;
        const isVideo = testimonial.type === 'video' || testimonial.src.match(/\.(mp4|webm|ogg)(\?.*)?$/i);
        
        return (
          <div
            key={index}
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
            style={{
              zIndex: getCardStyle(index).zIndex,
              pointerEvents: isActive || Math.abs(offset) === 1 ? 'auto' : 'none'
            }}
          >
            <div
              className={`w-[850px] max-w-[85vw] h-[450px] md:h-[550px] rounded-3xl overflow-hidden relative cursor-pointer border border-white/5 shadow-2xl ${isActive ? 'ring-1 ring-blue-500/20 shadow-blue-900/20' : ''}`}
              style={{
                ...getCardStyle(index),
                zIndex: 'auto' // handled by wrapper
              }}
              onClick={() => {
                if (!isActive) setActiveIndex(index);
              }}
            >
              {/* Background Video/Image */}
              {isVideo ? (
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  src={testimonial.src}
                  className="absolute inset-0 w-full h-full object-cover"
                  muted
                  loop
                  playsInline
                />
              ) : (
                <img
                  src={testimonial.src}
                  alt={testimonial.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}

              {/* Overlays */}
              <div 
                className={`absolute inset-0 transition-opacity duration-700 ${
                  isActive 
                    ? 'bg-gradient-to-t from-[#0a0f1c] via-[#0a0f1c]/70 to-[#0a0f1c]/10' 
                    : 'bg-[#0a0f1c]/80'
                }`} 
              />

              {/* Content Container */}
              <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between">
                {/* Top Section */}
                <div className="flex flex-col">
                  <div className={`text-2xl md:text-3xl font-light font-display transition-colors duration-500 ${isActive ? 'text-white' : 'text-white/50'}`}>
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className={`w-10 h-[2px] mt-2 transition-colors duration-500 ${isActive ? 'bg-blue-600' : 'bg-blue-600/30'}`} />
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col max-w-3xl">
                  <h3 className={`text-xl md:text-3xl font-bold font-display mb-1 transition-colors duration-500 ${isActive ? 'text-white' : 'text-white/60'}`}>
                    {testimonial.name}
                  </h3>
                  <p className={`text-xs md:text-sm tracking-widest uppercase mb-4 font-medium font-sans transition-colors duration-500 ${isActive ? 'text-blue-500' : 'text-blue-500/60'}`}>
                    {testimonial.designation}
                  </p>
                  
                  <div className={`overflow-hidden transition-all duration-500 ${isActive ? 'opacity-100 max-h-32 mb-6' : 'opacity-0 max-h-0 mb-0'}`}>
                    <p className="text-sm md:text-base leading-relaxed text-gray-300">
                      {testimonial.quote}
                    </p>
                  </div>

                  {/* Controls - Only visible when active */}
                  <div className={`flex gap-4 transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                    <button
                      onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                      className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center backdrop-blur-md transition-colors text-white ring-1 ring-white/10"
                      aria-label="Previous testimonial"
                    >
                      <ArrowLeft size={20} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleNext(); }}
                      className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center backdrop-blur-md transition-colors text-white ring-1 ring-white/10"
                      aria-label="Next testimonial"
                    >
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CircularTestimonials;

