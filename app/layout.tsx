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
console.log("...........")
export const metadata: Metadata = {
  title: "Adnan Rafiq's Portfolio",
  description:
    "Adnan Rafiq's Portfolio - showcasing projects, skills, and experiences.",
  keywords: ["Adnan", "portfolio", "web developer", "projects", "skills", "adnan's portfolio"],
  robots: "index, follow",
  openGraph: {
    title: "Adnan Rafiq's Portfolio",
    description: "Explore my work and projects in web development.",
    url: "https://adnan-portfoli.vercel.app/",
    type: "website",
    images: [
      {
        url: "/images/fav-icon.png",
        width: 1200,
        height: 630,
        alt: "Adnan Rafiq Portfolio Preview",
      },
    ],
  },
  icons: {
    icon: "/profile-image.png",
  },
  generator: "v0.app",
  metadataBase: new URL("https://adnan-portfoli.vercel.app"),
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
