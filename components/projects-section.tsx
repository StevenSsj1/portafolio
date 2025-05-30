"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ProjectLibrary } from "./project-library"
import { ProjectDetail } from "./project-detail"
import { ProjectOverview } from "./project-overview"
import { projects } from "@/data/projects"
import type { Project } from "@/types/project"

type ViewState = "library" | "overview" | "detail"

export function ProjectsSection() {
  const [currentView, setCurrentView] = useState<ViewState>("library")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number>(0)

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project)
    setCurrentView("overview")
  }

  const handleNextProject = () => {
    if (selectedProjectIndex < projects.length - 1) {
      const nextIndex = selectedProjectIndex + 1
      const nextProject = projects[nextIndex]
      setSelectedProject(nextProject)
      setSelectedProjectIndex(nextIndex)
    }
  }

  const handlePreviousProject = () => {
    if (selectedProjectIndex > 0) {
      const prevIndex = selectedProjectIndex - 1
      const prevProject = projects[prevIndex]
      setSelectedProject(prevProject)
      setSelectedProjectIndex(prevIndex)
    }
  }

  const handleViewDetails = () => {
    if (selectedProject) {
      setCurrentView("detail")
    }
  }

  const handleBackToLibrary = () => {
    setCurrentView("library")
    setSelectedProject(null)
    setSelectedProjectIndex(0)
  }

  const handleBackToOverview = () => {
    setCurrentView("overview")
  }

  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -100 },
  }

  const pageTransition = {
    type: "tween",
    ease: [0.25, 0.46, 0.45, 0.94],
    duration: 0.6,
  }

  return (
    <section className="relative min-h-screen">
      <AnimatePresence mode="wait">
        {currentView === "library" && (
          <motion.div
            key="library"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <ProjectLibrary 
              projects={projects} 
              onProjectSelect={(project, index) => handleProjectSelect(project)} 
            />
          </motion.div>
        )}

        {currentView === "overview" && selectedProject && (
          <motion.div
            key={`overview-${selectedProject.id}`}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <ProjectOverview 
              project={selectedProject} 
              onViewDetails={handleViewDetails} 
              onBack={handleBackToLibrary}
              onNextProject={handleNextProject}
              onPreviousProject={handlePreviousProject}
            />
          </motion.div>
        )}

        {currentView === "detail" && selectedProject && (
          <motion.div
            key={`detail-${selectedProject.id}`}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <ProjectDetail project={selectedProject} onBack={handleBackToOverview} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
