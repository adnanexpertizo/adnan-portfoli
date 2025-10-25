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
import { ProjectModal } from "./ProjectModal";

export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState<"personal" | "professional">(
    "personal"
  );
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

  const projects =
    activeTab === "personal" ? projectsData.personal : projectsData.professional;

  const truncateText = (text: string, limit: number) =>
    text.length > limit ? text.slice(0, limit) + "..." : text;

  return (
    <section id="projects" className="py-20 bg-background relative">
      <div className="container lg:px-36 md:px-16 px-4 mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="font-serif text-[22px] md:text-[26px] font-bold mb-3">
            {projectsData.title}
          </h2>
          <p className="text-[13px] md:text-[14px] text-muted-foreground max-w-2xl mx-auto">
            {projectsData.subtitle}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-muted rounded-full border border-border p-1">
            <button
              onClick={() => setActiveTab("personal")}
              className={`px-4 py-2 rounded-full text-sm md:text-[14px] font-medium transition-all ${
                activeTab === "personal"
                  ? "bg-primary text-white"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Personal Projects
            </button>
            <button
              onClick={() => setActiveTab("professional")}
              className={`px-4 py-2 rounded-full text-sm md:text-[14px] font-medium transition-all ${
                activeTab === "professional"
                  ? "bg-primary text-white"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Professional Projects
            </button>
          </div>
        </div>

        {/* Swiper */}
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
              640: { slidesPerView: 1 },
              1000: { slidesPerView: 2 },
              1224: { slidesPerView: 3 },
            }}
            className="pb-20"
          >
            {projects.map((project, index) => (
              <SwiperSlide key={index}>
                <Card lassName={`absolute top-3 right-3 bg-primary text-white text-[11px] font-semibold rounded-full w-[36px] flex items-center justify-center shadow-md ${
               project.imag ? "h-[120px]" : "h-[50px]"}`}>
                  <div className={`absolute top-3 right-3 bg-primary text-white text-[11px] font-semibold rounded-full w-[36px] h-${project.imag?'[120px]':'50px'} flex items-center justify-center shadow-md`}>
                    {index + 1}/{projects.length}
                  </div>

                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className="p-2 bg-primary/10 rounded-lg mr-3 border border-primary/20">
                          <Code2 className="h-5 w-5 text-primary" />
                        </div>
                        <Badge
                          variant="secondary"
                          className="text-[12px] md:text-[13px]"
                        >
                          {project.techname}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="md:text-[14px] text-[12px] font-semibold group-hover:text-primary mt-2">
                      {project.proname}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="flex flex-col justify-between flex-1">
                    {/* Conditional Image */}
                    {project.imag && (
                      <img
                        src={project.imag}
                        alt={project.proname}
                        className="w-full h-[110px] object-cover rounded-md mb-3"
                      />
                    )}

                    <p className="text-[12px] text-muted-foreground mb-4">
                      {truncateText(project.discription, 100)}
                    </p>

                    <div className="flex gap-2 justify-between mt-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-[150px] text-[12px] border-2 rounded-lg hover:bg-primary hover:text-white h-[40px]"
                        onClick={() => handleViewDetails(project)}
                      >
                        <Eye className="h-4 w-4 mr-1" /> Details
                      </Button>

                      {project.link === "restricted" ? (
                        <Button
                          size="sm"
                          disabled
                          className="w-[150px] rounded-lg text-[12px] bg-gray-200 text-gray-600 h-[40px]"
                        >
                          Restricted
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          className="w-[120px] text-[12px] gap-2 h-[40px]"
                          onClick={() => window.open(project.link, "_blank")}
                        >
                          <ExternalLink className="h-4 w-4" /> Visit
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Navigation */}
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

      {/* Modal */}
      {isModalOpen && selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
}
