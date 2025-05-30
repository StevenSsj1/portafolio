import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
})

export const metadata: Metadata = {
  title: "Lenin Llano | Portafolio PS5",
  description: "Portafolio profesional inspirado en la interfaz de PlayStation 5, mostrando proyectos de desarrollo web y aplicaciones.",
  keywords: [
    "Lenin Llano",
    "Desarrollo Web",
    "Portafolio",
    "PlayStation 5",
    "React",
    "Next.js",
    "TypeScript",
    "Desarrollador Frontend",
    "UI/UX",
    "Ingeniero en Ciencias de la Computación"
  ].join(", "),
  authors: [{ name: "Lenin Llano", url: "https://github.com/StevenSsj1" }],
  creator: "Lenin Llano",
  publisher: "Lenin Llano",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://StevenSsj1.github.io/Portafolio"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Lenin Llano | Portafolio PS5",
    description: "Portafolio profesional inspirado en la interfaz de PlayStation 5, mostrando proyectos de desarrollo web y aplicaciones.",
    url: "https://StevenSsj1.github.io/portafolio",
    siteName: "Portafolio PS5",
    images: [
      {
        url: "portafolio/og-grap.jpg",
        width: 1200,
        height: 630,
        alt: "Portafolio PS5 - Lenin Llano",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lenin Llano | Portafolio PS5",
    description: "Portafolio profesional inspirado en la interfaz de PlayStation 5, mostrando proyectos de desarrollo web y aplicaciones.",
    images: ["portafolio/og-grap.jpg"],
    creator: "@stevenssj1",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
