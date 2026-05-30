"use client";

import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Code2, Eye, ChevronLeft, ChevronRight, ExternalLink,
  X, Calendar, Tag, Globe, Lock, Sparkles,
} from "lucide-react";
import projectsData from "@/data/projects.json";

// ─── Premium Modal ────────────────────────────────────────────────────────────
function ProjectModal({
  project,
  isOpen,
  onClose,
}: {
  project: any;
  isOpen: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const isRestricted = project.link === "restricted";

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

      {/* Modal panel */}
      <div
        className="relative z-10 w-full max-w-xl max-h-[88vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Hero image area or gradient header ── */}
        <div className="relative flex-shrink-0">
          {project.imag ? (
            <div className="relative w-full h-52">
              <img
                src={project.imag}
                alt={project.proname}
                className="w-full h-full object-cover"
              />
              {/* dark gradient overlay so text is readable */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
            </div>
          ) : (
            <div className="w-full h-36 bg-gradient-to-br from-primary/80 via-primary to-primary/60" />
          )}

          {/* Title + badges on top of image */}
          <div className="absolute bottom-0 left-0 right-0 px-5 pb-4 pt-8">
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/20">
                <Tag className="w-3 h-3" /> {project.techname}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/20">
                <Calendar className="w-3 h-3" /> {project.year}
              </span>
              {isRestricted ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-full bg-red-500/80 backdrop-blur-sm text-white border border-red-400/30">
                  <Lock className="w-3 h-3" /> Confidential
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-full bg-emerald-500/80 backdrop-blur-sm text-white border border-emerald-400/30">
                  <Globe className="w-3 h-3" /> Live
                </span>
              )}
            </div>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-white leading-snug drop-shadow-sm">
              {project.proname}
            </h2>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-colors border border-white/10"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto bg-background">

          {/* Description */}
          <div className="px-5 pt-5 pb-4">
            <div className="flex items-center gap-2 mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              <p className="text-[10px] font-bold text-foreground uppercase tracking-widest">
                About this Project
              </p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {project.discription}
            </p>
          </div>

          {/* Tech stack tags — if your JSON has techStack[] */}
          {project.techStack && project.techStack.length > 0 && (
            <div className="px-5 pb-4">
              <p className="text-[10px] font-bold text-foreground uppercase tracking-widest mb-2.5">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech: string, i: number) => (
                  <span
                    key={i}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Key features — if your JSON has features[] */}
          {project.features && project.features.length > 0 && (
            <div className="px-5 pb-4">
              <p className="text-[10px] font-bold text-foreground uppercase tracking-widest mb-2.5">
                Key Features
              </p>
              <ul className="space-y-2">
                {project.features.map((feat: string, i: number) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-[7px] flex-shrink-0" />
                    <span className="text-sm text-muted-foreground leading-relaxed">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Restricted warning */}
          {isRestricted && (
            <div className="px-5 pb-4">
              <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
                <Lock className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800 dark:text-amber-400 leading-relaxed">
                  This project is confidential and cannot be shared publicly. It can be
                  demonstrated privately during interviews upon request.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ── Footer CTA ── */}
        <div className="flex-shrink-0 flex gap-3 px-5 py-4 bg-background border-t border-border/60">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium border border-border/60 bg-muted/40 hover:bg-muted transition-colors"
          >
            Close
          </button>
          {!isRestricted && (
            <button
              onClick={() => window.open(project.link, "_blank")}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20"
            >
              <ExternalLink className="w-4 h-4" />
              Visit Project
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export function ProjectsSection() {
  const [activeTab,       setActiveTab]       = useState<"personal" | "professional">("personal");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen,     setIsModalOpen]     = useState(false);
  const [swiperReady,     setSwiperReady]     = useState(false);
  const [isVisible,       setIsVisible]       = useState(false);

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

  const projects =
    activeTab === "personal" ? projectsData.personal : projectsData.professional;

  const truncate = (text: string, limit: number) =>
    text.length > limit ? text.slice(0, limit) + "…" : text;

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative bg-background overflow-hidden"
    >
      {/* Background texture */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <Image src="/Background Noise.svg" alt="" fill className="object-cover opacity-60" priority />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,var(--color-primary)_0%,transparent_70%)] opacity-[0.07] dark:opacity-[0.12]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto py-16 md:py-20 px-4 sm:px-8 lg:px-16">

        {/* ── Header ── */}
        <div className={`text-center mb-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="inline-block text-xs font-semibold text-primary uppercase tracking-widest mb-3">
            Portfolio
          </span>
          <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-4">
            {projectsData.title}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
            {projectsData.subtitle}
          </p>
          <div className="w-12 h-1 bg-primary rounded-full mx-auto mt-5" />
        </div>

        {/* ── Tabs ── */}
        <div className={`flex justify-center mb-8 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="inline-flex bg-muted rounded-full border border-border/60 p-1 gap-1">
            {(["personal", "professional"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full text-[10px] md:text-sm font-medium transition-all duration-200 capitalize ${
                  activeTab === tab
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab} Projects
              </button>
            ))}
          </div>
        </div>

        {/* ── Info note ── */}
        <div className={`max-w-2xl mx-auto mb-10 transition-all duration-700 delay-150 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="flex items-start gap-3 bg-muted/40 border border-border/60 rounded-xl px-4 py-3 text-xs text-muted-foreground leading-relaxed">
            <span className="text-base flex-shrink-0 mt-0.5">
              {activeTab === "personal" ? "🧠" : "🔒"}
            </span>
            <div className="space-y-1.5">
              {activeTab === "personal" ? (
                <>
                  <p>These personal projects were built during student life for learning and practice. I now have 3+ years of professional experience working on real-world projects.</p>
                  <p>⚠️ Some older projects may have inactive MongoDB connections due to free-tier inactivity.</p>
                </>
              ) : (
                <p>Some client projects cannot be shared publicly due to confidentiality. These can be discussed and demonstrated privately during interviews upon request.</p>
              )}
            </div>
          </div>
        </div>

        {/* ── Swiper ── */}
        {swiperReady && (
          <div className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

            {/* Wrapper with padding so shadow of cards isn't clipped */}
            <div className="px-1 py-2">
              <Swiper
                key={activeTab}
                modules={[Navigation, Autoplay]}
                spaceBetween={20}
                loop={projects.length > 2}
                autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
                navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
                onBeforeInit={(swiper) => {
                  // @ts-ignore
                  swiper.params.navigation.prevEl = prevRef.current;
                  // @ts-ignore
                  swiper.params.navigation.nextEl = nextRef.current;
                }}
                slidesPerView={1}
                breakpoints={{
                  768:  { slidesPerView: 2 },
                  1200: { slidesPerView: 3 },
                }}
                style={{ paddingBottom: "8px" }}
              >
                {projects.map((project, index) => (
                  <SwiperSlide key={`${activeTab}-${index}`}>
                    <Card className="group flex flex-col h-full border border-border/60 hover:border-primary/40 bg-card shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                      {/* Top accent */}
                      <div className="h-1 w-full bg-gradient-to-r from-primary/40 via-primary to-primary/40 flex-shrink-0" />

                      <CardContent className="p-5 flex flex-col flex-1">

                        {/* Header row */}
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            <div className="p-2 bg-primary/10 border border-primary/20 rounded-lg flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                              <Code2 className="w-4 h-4 text-primary" />
                            </div>
                            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border/60 truncate max-w-[130px]">
                              {project.techname}
                            </span>
                          </div>
                          <span className="flex-shrink-0 text-[10px] font-bold w-9 h-9 flex items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
                            {index + 1}/{projects.length}
                          </span>
                        </div>

                        {/* Title */}
                        <h3
                          className="font-serif font-semibold text-sm text-foreground group-hover:text-primary transition-colors duration-300 leading-snug line-clamp-2 mb-1"
                          title={project.proname}
                        >
                          {project.proname}
                        </h3>

                        {/* Year */}
                        <div className="flex items-center gap-1 text-muted-foreground mb-3">
                          <Calendar className="w-3 h-3" />
                          <span className="text-[10px]">{project.year}</span>
                        </div>

                        {/* Image */}
                        {project.imag && (
                          <div className="relative w-full h-32 rounded-lg overflow-hidden border border-border/40 mb-3 flex-shrink-0">
                            <img
                              src={project.imag}
                              alt={project.proname}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                          </div>
                        )}

                        {/* Description */}
                        <p className="text-xs text-muted-foreground leading-relaxed flex-1 mb-4">
                          {truncate(project.discription, 110)}
                        </p>

                        {/* Buttons — always at bottom */}
                        <div className="flex gap-2 mt-auto pt-3 border-t border-border/40">
                          <button
                            onClick={() => { setSelectedProject(project); setIsModalOpen(true); }}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold border border-border/60 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-200"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            Details
                          </button>

                          {project.link === "restricted" ? (
                            <button
                              disabled
                              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold bg-muted text-muted-foreground cursor-not-allowed border border-border/40"
                            >
                              <Lock className="w-3.5 h-3.5" />
                              Restricted
                            </button>
                          ) : (
                            <button
                              onClick={() => window.open(project.link, "_blank")}
                              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              Visit
                            </button>
                          )}
                        </div>
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
                {projects.length} projects
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

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setSelectedProject(null); }}
      />
    </section>
  );
}