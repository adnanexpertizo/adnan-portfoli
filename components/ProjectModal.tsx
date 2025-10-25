"use client";

import { ExternalLink, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProjectModal({ project, isOpen, onClose }: any) {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-neutral-900 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative animate-fadeIn border border-border flex flex-col justify-between">
        {/* Title */}
        <h3 className="text-xl font-semibold text-center mb-4">
          {project.proname}
        </h3>

        {/* Image */}
        {project.imag && (
          <img
            src={project.imag}
            alt={project.proname}
            className="w-full h-[230px] object-cover rounded-lg mb-4"
          />
        )}

        {/* Description */}
        <p className="text-sm text-muted-foreground text-center whitespace-pre-line leading-relaxed mb-6 overflow-y-auto max-h-[300px]">
          {project.discription}
        </p>

        {/* Buttons - bottom right */}
        <div className="flex justify-end gap-3 mt-auto">
          {project.link !== "restricted" && (
            <Button
              size="sm"
              className="text-[13px] bg-primary text-white flex items-center gap-2 h-[40px]"
              onClick={() => window.open(project.link, "_blank")}
            >
              <ExternalLink className="h-4 w-4" /> Visit
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            className="text-[13px] h-[40px] flex items-center gap-2"
            onClick={onClose}
          >
            <X className="h-4 w-4" /> Close
          </Button>
        </div>
      </div>
    </div>
  );
}
