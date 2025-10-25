"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ProjectModalProps {
  project: any;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Project Modal */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 px-4">
        <div
          className="
            relative bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl
            max-w-3xl w-full animate-fadeIn
          "
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Project Details */}
          <div className="p-6 space-y-4">
            {/* Title & Meta */}
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-1">{project?.title}</h2>
              <p className="text-sm text-muted-foreground">
                {project?.techStack?.join(" • ")}
              </p>
            </div>

            {/* Image */}
            {project?.image && (
              <div
                className="
                  rounded-lg overflow-hidden border shadow-inner
                  max-h-[60vh] overflow-y-auto
                  scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent
                "
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full object-contain"
                />
              </div>
            )}

            {/* Description */}
            <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {project?.description}
            </div>

            {/* Links */}
            <div className="flex justify-center gap-4 mt-4">
              {project?.github && (
                <Button
                  variant="outline"
                  className="text-sm"
                  onClick={() => window.open(project.github, "_blank")}
                >
                  View Code
                </Button>
              )}
              {project?.live && (
                <Button
                  className="bg-primary text-white text-sm"
                  onClick={() => window.open(project.live, "_blank")}
                >
                  Live Demo
                </Button>
              )}
            </div>

            {/* Close Button */}
            <div className="mt-6 flex justify-center">
              <Button
                variant="outline"
                onClick={onClose}
                className="border-2 border-border hover:bg-primary hover:text-white text-sm"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
