"use client";

import type React from "react";
import { cn } from "@/lib/utils";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-sm font-semibold tracking-wide text-[color:var(--color-chart-2)] uppercase">
      {children}
    </h2>
  );
}

function HR() {
  return <hr className="border-t border-border my-1" />;
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="relative pl-3">
      <span
        aria-hidden
        className="absolute left-0 top-1.5 h-1.5 w-1.5 rounded-full bg-[color:var(--color-chart-2)]"
      />
      <span>{children}</span>
    </li>
  );
}

export default function CVTemplate() {
  const handlePrint = () => window.print();

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Action Bar */}
      <div className="print:hidden sticky top-0 z-10 w-full max-w-[820px]">
        <div className="flex items-center justify-end">
          <button
            onClick={handlePrint}
            className="px-3 py-2 rounded-md bg-[color:var(--color-chart-2)] text-white text-sm"
          >
            Download PDF
          </button>
        </div>
      </div>

      {/* CV Content */}
      <article
        id="cv-sheet"
        className={cn(
          "bg-card text-card-foreground shadow-sm",
          "md:px-5 md:py-4 p-2 border border-border print:w-[1000px] w-full max-w-[820px]",
          "rounded-lg flex flex-col gap-3"
        )}
      >
        {/* Header */}
        <header className="flex flex-col items-center text-center">
          <h1 className="text-xl font-semibold text-primary">Adnan Rafiq</h1>
          <p className="text-sm text-muted-foreground">Full-Stack Developer (MERN)</p>

          <div className="mt-1 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
            <span>Karachi, Pakistan</span>
            <span className="text-border">|</span>
            <span>+92 307 7522229</span>
            <span className="text-border">|</span>
            <span>adnanrafiq7522@gmail.com</span>
          </div>

          <div className="mt-1">
            <a
              href="https://adnanportfolio-lime.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1 text-xs text-primary hover:bg-muted"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--color-chart-2)]" />
              Portfolio: adnanportfolio-lime.vercel.app
            </a>
          </div>
        </header>

        <HR />

        {/* Summary */}
        <section>
          <SectionTitle>Summary</SectionTitle>
          <p className="mt-1 text-sm leading-snug text-foreground/90">
            Passionate MERN stack developer with 2 years of experience, skilled in
            React, Next.js, Node.js, MongoDB, and Firebase. Adept at building
            responsive UIs, scalable APIs, and integrating AI tools in web apps.
            Always eager to learn and explore GenAI and DevOps technologies.
          </p>
        </section>

        <HR />

        {/* Experience */}
        <section>
          <SectionTitle>Experience</SectionTitle>

          <div className="mt-2 border border-dashed border-border rounded-md p-2">
            <p className="text-sm font-medium">Expertizo</p>
            <p className="text-xs text-muted-foreground">MERN Stack Developer (2024 - Present)</p>
            <ul className="mt-1 text-sm space-y-0.5">
              <Bullet>Developing React and Next.js dashboards with Tailwind CSS.</Bullet>
              <Bullet>Integrated Firebase and MongoDB for real-time data flow.</Bullet>
              <Bullet>Worked on time tracking and HR management web apps.</Bullet>
            </ul>
          </div>

          <div className="mt-2 border border-dashed border-border rounded-md p-2">
            <p className="text-sm font-medium">Decotechs</p>
            <p className="text-xs text-muted-foreground">MERN Stack Developer (2023 - 2024)</p>
            <ul className="mt-1 text-sm space-y-0.5">
              <Bullet>Built E-commerce and Crypto dashboards using Next.js.</Bullet>
              <Bullet>Collaborated with blockchain teams for API integration.</Bullet>
              <Bullet>Maintained reusable components for admin systems.</Bullet>
            </ul>
          </div>
        </section>

        <HR />

        {/* Education */}
        <section>
          <SectionTitle>Education</SectionTitle>
          <div className="mt-2 border border-dashed border-border rounded-md p-2">
            <p className="text-sm font-medium">FUUAST University, Karachi</p>
            <p className="text-xs text-muted-foreground">
              BS Computer Science — Graduated 2023
            </p>
          </div>

          <div className="mt-2 border border-dashed border-border rounded-md p-2">
            <p className="text-sm font-medium">SMIT (Saylani Mass IT Training)</p>
            <p className="text-xs text-muted-foreground">
              Full Stack Web Development (MERN Stack)
            </p>
          </div>
        </section>

        <HR />

        {/* Skills */}
        <section>
          <SectionTitle>Technical Skills</SectionTitle>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-y-1 text-sm">
            <li>React.js / Next.js</li>
            <li>Node.js / Express</li>
            <li>MongoDB / Firebase</li>
            <li>TypeScript / JavaScript</li>
            <li>Tailwind / Ant Design</li>
            <li>Git / GitHub</li>
          </ul>
        </section>

        <HR />

        {/* Projects */}
        <section>
          <SectionTitle>Projects</SectionTitle>
          <ul className="text-sm space-y-0.5">
            <Bullet>
              <strong>Pertime</strong> – HR & Organization Management Web App with Admin/User dashboards.
            </Bullet>
            <Bullet>
              <strong>Madrasa</strong> – Education Management System with portals for Teachers and Students.
            </Bullet>
            <Bullet>
              <strong>Time Tracker</strong> – Real-time tracking app with screenshots and activity logs.
            </Bullet>
            <Bullet>
              <strong>Crypto Platform</strong> – Frontend for crypto dashboards and wallet integration.
            </Bullet>
          </ul>
        </section>
      </article>
    </div>
  );
}
