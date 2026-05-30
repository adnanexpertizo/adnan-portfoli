import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Source_Sans_3, Playfair_Display, Rubik } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rubik",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "Adnan Rafiq – MERN Stack Developer",
  description:
    "BSCS Graduate and MERN Stack Developer with 3+ years of experience building modern web applications using React, Next.js, Node.js, and MongoDB. Also a certified Safety Officer who builds digital tools for HSE management.",
  keywords: [
    "Adnan Rafiq",
    "MERN Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js",
    "MongoDB",
    "Full Stack Developer",
    "BSCS Graduate",
    "Safety Management System",
    "Adnan Rafiq IT Portfolio",
  ],
  robots: "index, follow",
  openGraph: {
    title: "Adnan Rafiq – MERN Stack Developer Portfolio",
    description:
      "Explore Adnan Rafiq's full-stack projects, technical skills, and developer experience.",
    url: "https://adnan-it-portfolio.vercel.app/",
    type: "website",
    images: [
      {
        url: "/profile-image.png",
        width: 1200,
        height: 630,
        alt: "Adnan Rafiq IT Portfolio Preview",
      },
    ],
  },
  icons: {
    icon: "/adnan2.png",
  },
  generator: "Next.js 14",
  metadataBase: new URL("https://adnan-it-portfolio.vercel.app"),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${sourceSans.variable} ${playfairDisplay.variable} ${rubik.variable}`}
      >
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}