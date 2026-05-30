"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Calendar, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import educationData from "@/data/education.json";
import Image from "next/image";

export function EducationSection() {
  const [swiperReady, setSwiperReady] = useState(false);
  const [isVisible,   setIsVisible]   = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const prevRef    = useRef<HTMLButtonElement | null>(null);
  const nextRef    = useRef<HTMLButtonElement | null>(null);

  useEffect(() => { setSwiperReady(true); }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="education"
      className="relative z-0 bg-background overflow-hidden"
    >
      {/* Background texture */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <Image
          src="/Background Noise.svg"
          alt=""
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_40%,var(--color-primary)_0%,transparent_70%)] opacity-[0.07] dark:opacity-[0.12]" />
      </div>

      {/* Glow blob */}
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/4" />

      <div className="relative z-10 max-w-7xl mx-auto py-16 md:py-20 px-4 sm:px-8 lg:px-16">

        {/* ── Section Header ── */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="inline-block text-xs font-semibold text-primary uppercase tracking-widest mb-3">
            Academic Background
          </span>
          <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-4">
            {educationData.title}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
            {educationData.subtitle}
          </p>
          <div className="w-12 h-1 bg-primary rounded-full mx-auto mt-5" />
        </div>

        {/* ── Slider ── */}
        {swiperReady && (
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="px-1 py-2">
              <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={20}
                loop={educationData.education.length > 3}
                autoplay={{
                  delay: 3500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                onBeforeInit={(swiper) => {
                  // @ts-ignore
                  swiper.params.navigation.prevEl = prevRef.current;
                  // @ts-ignore
                  swiper.params.navigation.nextEl = nextRef.current;
                }}
                slidesPerView={1}
                breakpoints={{
                  768:  { slidesPerView: 2, spaceBetween: 20 },
                  1280: { slidesPerView: 3, spaceBetween: 24 },
                }}
                // style={{ paddingBottom: "8px" }}
              >
                {educationData.education.map((item, index) => (
                  <SwiperSlide key={index}>
                    <Card className="group min-h-82 max-h-82 flex flex-col border border-border/60 hover:border-primary/40 bg-card shadow-sm hover:shadow-xl transition-all my-1 duration-300 overflow-hidden">
                      {/* Top accent bar */}
                      <div className="h-1 w-full bg-gradient-to-r from-primary/40 via-primary to-primary/40 flex-shrink-0" />

                      <CardContent className=" flex flex-col flex-1">

                        {/* Icon row */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-all duration-300 flex-shrink-0">
                            <GraduationCap className="w-5 h-5 text-primary" />
                          </div>
                          {item.status && (
                            <Badge
                              variant="secondary"
                              className="text-[10px] px-2.5 py-1 border border-border/60 flex-shrink-0"
                            >
                              {item.status}
                            </Badge>
                          )}
                        </div>

                        {/* Degree */}
                        <h3 className="font-serif font-semibold text-sm text-foreground leading-snug group-hover:text-primary transition-colors duration-300 mb-1">
                          {item.degree}
                        </h3>

                        {/* Institution */}
                        <p className="text-xs font-medium text-primary mb-3">
                          {item.institution}
                        </p>

                        {/* Location + Period */}
                        <div className="flex flex-wrap items-center gap-3 text-muted-foreground mb-4">
                          {item.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 flex-shrink-0" />
                              <span className="text-[11px]">{item.location}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 flex-shrink-0" />
                            <span className="text-[11px] font-medium">{item.period}</span>
                          </div>
                        </div>

                        {/* Description */}
                        {item?.description && (
                          <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                            {item?.description}
                          </p>
                        )}

                        {/* Highlights */}
                        {item.details && item.details.length > 0 && (
                          <div className=" border-t border-border/40">
                            <p className="text-[10px] font-bold text-foreground uppercase tracking-wider mb-2">
                              Highlights
                            </p>
                            <ul className="space-y-1.5">
                              {item.details.map((detail: string, idx: number) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                                  <span className="text-[11px] text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                                    {detail}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Navigation */}
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                ref={prevRef}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-border/60 bg-background hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 shadow-sm"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs text-muted-foreground font-medium">
                {educationData.education.length} qualifications
              </span>
              <button
                ref={nextRef}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-border/60 bg-background hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 shadow-sm"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}