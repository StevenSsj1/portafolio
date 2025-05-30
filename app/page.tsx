"use client"

import { HeroSection } from "@/components/hero-section"
import { ProjectsSection } from "@/components/projects-section"

export default function HomePage() {
  const scrollToProjects = () => {
    const projectsElement = document.getElementById("projects-section")
    if (projectsElement) {
      projectsElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  return (
    <main className="min-h-screen bg-black overflow-hidden">
      <HeroSection onScrollToProjects={scrollToProjects} />
      <div id="projects-section">
        <ProjectsSection />
      </div>
    </main>
  )
}
