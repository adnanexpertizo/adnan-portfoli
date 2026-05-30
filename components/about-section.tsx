"use client";

import { Shield, Award, Users, CheckCircle } from "lucide-react";
import aboutData from "@/data/about.json";
import { useEffect, useRef, useState } from "react";

/* Use same icons as safety — or swap for IT-specific ones if your about.json uses different keys */
const iconMap: Record<string, React.FC<any>> = { Shield, Award, Users, CheckCircle };

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMuted, setIsMuted]     = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.5 }
    );
    obs.observe(video);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-16 sm:py-20 bg-muted/30 overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-0 right-0 w-72 h-72 lg:w-96 lg:h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none -translate-y-1/3 translate-x-1/4" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">

        {/* Section header */}
        <div className={`w-full mb-12 sm:mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="inline-block text-xs font-semibold text-primary uppercase tracking-widest mb-3">
            About Me
          </span>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-4">
            {aboutData.title}
          </h2>
          <div className="w-12 h-1 bg-primary rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Video */}
          <div className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
            <div className="relative rounded-2xl overflow-hidden border border-border shadow-2xl shadow-primary/5">
              <video
                ref={videoRef}
                src={
                  (aboutData as any).workVideo ||
                  "https://res.cloudinary.com/dpvsay7rw/video/upload/v1771601574/Adnan_Rafiq_-_MERN_Stack_Portfolio_Intro_1_ylokny.mp4"
                }
                poster={
                  (aboutData as any).workPoster ||
                  "https://res.cloudinary.com/dpvsay7rw/video/upload/v1771601574/so_2/Adnan_Rafiq_-_MERN_Stack_Portfolio_Intro_1_ylokny.jpg"
                }
                muted={isMuted}
                loop
                playsInline
                preload="metadata"
                controls
                className="w-full h-56 sm:h-72 lg:h-80 object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />
            </div>
          </div>

          {/* Text */}
          <div className={`transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
            <h3 className="font-serif text-xl sm:text-2xl font-semibold text-foreground mb-4">
              {aboutData.mainTitle}
            </h3>

            <div className="space-y-4 mb-8">
              {aboutData.description.map((para: string, i: number) => (
                <p key={i} className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            {/* Skills badges */}
            {(aboutData as any).skills && (aboutData as any).skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {(aboutData as any).skills.map((skill: string, i: number) => (
                  <span
                    key={skill}
                    className={`px-3 py-1 rounded-full text-xs font-medium border border-primary/25 bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-200 cursor-default ${
                      isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`}
                    style={{ transitionDelay: `${400 + i * 50}ms` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Highlight cards */}
        {aboutData.highlights && aboutData.highlights.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mt-8">
            {aboutData.highlights.map((item: any, i: number) => {
              const Icon = iconMap[item.icon] || Shield;
              return (
                <div
                  key={i}
                  className={`flex items-center gap-2 md:gap-3 p-2.5 md:p-3 rounded-xl bg-background border border-border shadow-sm hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-300 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${300 + i * 100}ms` }}
                >
                  <div className="p-1.5 rounded-lg bg-primary/10 flex-shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground leading-tight">{item.title}</p>
                    {item.value && <p className="text-[10px] text-muted-foreground">{item.value}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}