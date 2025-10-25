"use client";

import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Code2,
  Eye,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import projectsData from "@/data/projects.json";
import {ProjectModal} from "./ProjectModal"

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const [swiperReady, setSwiperReady] = useState(false);

  const handleViewDetails = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  useEffect(() => {
    setSwiperReady(true);
  }, []);

  return (
    <section id="projects" className="py-20 bg-background overflow-hidden relative">
      <div className="container lg:px-36 md:px-16 px-4 mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="font-serif text-[20px] md:text-[26px] font-bold text-foreground mb-4">
            {projectsData.title}
          </h2>
          <p className="text-[12px] md:text-[14px] text-muted-foreground md:max-w-2xl px-8 mx-auto">
            {projectsData.subtitle}
          </p>
        </div>

        {/* ✅ Swiper Section */}
        {swiperReady && (
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
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
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 20 },
              1000: { slidesPerView: 2, spaceBetween: 24 },
              1224: { slidesPerView: 3, spaceBetween: 28 },
            }}
            className="pb-20"
          >
            {projectsData.projects.map((project, index) => (
              <SwiperSlide key={index}>
                <Card className="min-w-[310px] my-1 group transition-all duration-500 relative overflow-hidden border-2 border-border/80 hover:border-primary/60 bg-muted/40 shadow-lg hover:shadow-xl">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className="p-2 bg-primary/10 rounded-lg mr-3 border border-primary/20">
                          <Code2 className="h-5 w-5 text-primary" />
                        </div>
                        <Badge variant="secondary" className="text-[12px] md:text-[14px]">
                          {project.techname}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="md:text-[14px] text-[12px] font-semibold group-hover:text-primary">
                      {project.proname}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <img
                      src={project.imag}
                      alt={project.proname}
                      className="w-full h-[160px] object-cover rounded-md mb-3"
                    />
                    <p className="text-[12px] text-muted-foreground line-clamp-3 mb-4">
                      {project.discription}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-1/2 text-[12px] border-2 hover:bg-primary hover:text-white"
                        onClick={() => handleViewDetails(project)}
                      >
                        <Eye className="h-4 w-4 mr-1" /> Details
                      </Button>
                      <Button
                        size="sm"
                        className="w-1/2 text-[12px] gap-2"
                        onClick={() => window.open(project.link, "_blank")}
                      >
                        <ExternalLink className="h-4 w-4" /> Visit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* ✅ Navigation Buttons */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            ref={prevRef}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-border hover:bg-primary hover:text-white transition-all shadow-md"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            ref={nextRef}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-border hover:bg-primary hover:text-white transition-all shadow-md"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ✅ Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
