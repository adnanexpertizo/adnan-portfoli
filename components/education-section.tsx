"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Calendar, MapPin } from "lucide-react";
import educationData from "@/data/education.json";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export function EducationSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          educationData.education.forEach((_, index) => {
            setTimeout(() => {
              setVisibleCards((prev) => {
                const newVisible = [...prev];
                newVisible[index] = true;
                return newVisible;
              });
            }, index * 200);
          });
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="education"
      className="py-20 overflow-hidden bg-background relative"
    >
      <div className="container lg:px-36 md:px-16 px-4 mx-auto relative">
        {/* Header */}
        <div className="text-center mb-10">
          <h2
            className={`font-serif text-[20px] md:text-[26px] font-bold text-foreground mb-4 transform transition-all duration-1000 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            {educationData.title}
          </h2>
          <p
            className={`text-[12px] md:text-[14px] text-muted-foreground md:max-w-2xl mx-auto text-pretty transform transition-all duration-1000 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            {educationData.subtitle}
          </p>
        </div>

        {/* Swiper Section */}
        <Swiper
          modules={[Navigation, Autoplay]}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          spaceBetween={24}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 16 },
            1100: { slidesPerView: 2, spaceBetween: 24 },
          }}
          className="my-10"
        >
          {educationData.education.map((edu, index) => (
            <SwiperSlide key={index} className="flex">
              <Card
                className={`flex flex-col justify-between my-10 h-full h-[320px] transition-all duration-500 ease-out group border-2 border-border/80 hover:border-primary/60 dark:border-border/80 dark:hover:border-primary/70 shadow-lg hover:shadow-xl bg-muted/40 backdrop-blur-sm transform hover:-translate-y-1 ${
                  visibleCards[index]
                    ? "translate-x-0 opacity-100"
                    : "translate-x-6 opacity-0"
                }`}
                style={{ transitionDelay: `${600 + index * 200}ms` }}
              >
                <CardContent className="p-4 md:p-6 flex flex-col h-full">
                  {/* Header Info */}
                  <div className="flex items-start justify-between mb-4 md:mb-6">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <GraduationCap className="h-4 w-4 md:h-5 md:w-5 text-primary mr-2" />
                        <h3 className="font-serif text-[12px] md:text-[14px] font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                          {edu.degree}
                        </h3>
                      </div>
                      <p className="text-[11px] md:text-[14px] font-medium text-primary mb-2">
                        {edu.institution}
                      </p>
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                          <span className="text-[11px] md:text-[13px]">
                            {edu.location}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                          <span className="text-[11px] md:text-[13px]">
                            {edu.period}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className="text-[10px] md:text-[12px] py-1 px-2 border border-border/60 hover:border-primary/50 transition-colors duration-300"
                    >
                      {edu.status}
                    </Badge>
                  </div>

                  {/* Details */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 md:mb-4 group-hover:text-primary transition-colors text-[11px] md:text-[14px] duration-300">
                      Highlights:
                    </h4>
                    <ul className="space-y-1 md:space-y-2 pr-2 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/40 scrollbar-track-transparent max-h-[180px]">
                      {edu.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start">
                          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                          <span className="text-muted-foreground text-[11px] md:text-[13px] group-hover:text-foreground transition-colors duration-300">
                            {detail}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
