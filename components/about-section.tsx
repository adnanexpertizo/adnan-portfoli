"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Award, Users, CheckCircle } from "lucide-react";
import aboutData from "@/data/about.json";
import { useEffect, useRef, useState } from "react";
import { AskModal } from "./AskModal"; // keep if still using
import { useTypewriter } from "./useTypewriter";

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);
  const [isMuted, setIsMuted] = useState(true);

  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const iconMap = {
    Shield,
    Award,
    Users,
    CheckCircle,
  };
console.log("About data loaded:", aboutData);
  const typedText = useTypewriter(
    [
      "a MERN Stack Developer",
      "a BSCS Graduate",
      "having 3+ years of experience",
      "skilled in React.js, Next.js & Node.js",
      "passionate about AI & modern web technologies",
    ],
    100
  );

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          aboutData.highlights.forEach((_, index) => {
            setTimeout(() => {
              setVisibleCards((prev) => {
                const newVisible = [...prev];
                newVisible[index] = true;
                return newVisible;
              });
            }, index * 150);
          });
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const videoObserver = new IntersectionObserver(
      ([entry]) => {
        if (!video) return;

        if (entry.isIntersecting) {
          video.play().catch((err) => {
            console.log("Autoplay prevented:", err);
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.55 }
    );

    videoObserver.observe(video);

    return () => videoObserver.disconnect();
  }, []);

  const handleVideoInteraction = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      if (video.paused) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
      if (isMuted) {
        video.muted = false;
        setIsMuted(false);
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-[40px] bg-muted/50 overflow-hidden md:py-20 py-10"
    >
      <div className="container lg:px-[144px] md:px-[64px] px-[8px] mx-auto">
        <div className="text-center mb-[32px]">
          <h2
            className={`font-serif text-[24px] lg:text-[28px] font-bold text-foreground mb-[16px] transform transition-all duration-1000 ease-out ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            {aboutData.title}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-[32px] items-center mb-[40px]">
          <div className="order-2 lg:order-1">
            <Card
              className={`overflow-hidden hover:shadow-2xl transition-all duration-700 ease-out transform ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
              } border-2 border-border/80 hover:border-primary/60 bg-card shadow-lg dark:border-border/80 dark:hover:border-primary/70 dark:shadow-xl dark:hover:shadow-2xl dark:bg-card/98 backdrop-blur-sm`}
              style={{ transitionDelay: "400ms" }}
            >
              <CardContent className="p-0">
                <video
                  ref={videoRef}
                  src={aboutData.workVideo ||"https://res.cloudinary.com/dpvsay7rw/video/upload/v1771601574/Adnan_Rafiq_-_MERN_Stack_Portfolio_Intro_1_ylokny.mp4"
                                  }
                  poster={aboutData.workPoster || "https://res.cloudinary.com/dpvsay7rw/video/upload/v1771601574/so_2/Adnan_Rafiq_-_MERN_Stack_Portfolio_Intro_1_ylokny.jpg"
                                  }
                  muted={isMuted}
                  loop
                  playsInline
                  preload="metadata"
                  controls       
                  width={600}
                  height={600}
                  className="w-full h-[250px] md:h-[330px] object-cover transition-transform duration-700 ease-out"
                />
            
              </CardContent>
            </Card>
          </div>

          <div
            className={`order-1 lg:order-2 px-[8px] transform transition-all duration-1000 ease-out ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            <h3 className="font-serif text-[16px] md:text-[20px] font-semibold text-foreground mb-[6px]">
              {aboutData.mainTitle}
            </h3>
            <h2 className="text-[12px] sm:text-[16px] md:text-[16px] text-start font-semibold text-primary mb-2 min-w-[250px] max-w-[400px] lg:max-w-[470px]">
              <span className="text-[#CD312D]">I am</span> {typedText}
              <span className="animate-pulse">|</span>
            </h2>

            {aboutData.description.map((paragraph, index) => (
              <p
                key={index}
                className="text-[12px] md:text-[16px] text-muted-foreground mb-[9px] text-pretty"
              >
                {paragraph}
              </p>
            ))}

            <div className="flex flex-wrap gap-[8px]">
              {aboutData.skills.map((skill, index) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className={`text-[11px] md:text-[13px] transition-all duration-300 ease-out transform ${
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  } border border-border/60 hover:border-primary/50 dark:border-border/70 dark:hover:border-primary/60`}
                  style={{ transitionDelay: `${800 + index * 100}ms` }}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Your commented-out highlights grid – uncomment if needed */}
      </div>
    </section>
  );
}