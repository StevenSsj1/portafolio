"use client"

import { useEffect, useState } from "react"
import { X, Github, Play, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import PS5Header from "./ps5-header"
import { projects } from "@/data/projects"
import type { Project } from "@/types/project"

interface ProjectDetailProps {
  project: Project
  onBack: () => void
}

export function ProjectDetail({ project, onBack }: ProjectDetailProps) {
  const [currentProject, setCurrentProject] = useState<Project>(project)

  // Get other projects (excluding current one)
  const otherProjects = projects.filter((p) => p.id !== currentProject.id)

  // Generate random stats for the PS5-like interface
  const [stats, setStats] = useState({
    timeSpent: 0,
    storage: 0,
    addons: currentProject.features.length,
    collaborators: "1",
  })

  // Generate random stats on client-side only
  useEffect(() => {
    setStats({
      timeSpent: Math.floor(Math.random() * 50 + 10),
      storage: Math.floor(Math.random() * 500 + 100),
      addons: currentProject.features.length,
      collaborators: "1",
    })
  }, [currentProject.features.length])

  // Update current project when prop changes
  useEffect(() => {
    setCurrentProject(project)
  }, [project])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onBack()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onBack])

  const handleProjectChange = (newProject: Project) => {
    setCurrentProject(newProject)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black overflow-hidden">
      {/* PS5 Header */}
      <div className="absolute top-0 right-0 z-30">
        <PS5Header />
      </div>

      {/* Background Image - Responsive positioning */}
        <motion.div
          key={currentProject.id}
          className="absolute inset-0"
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: ["0%", "40%"], opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Image
            src={currentProject.backgroundImage || "/placeholder.svg?height=1080&width=1920"}
            alt={currentProject.altBackgroundImage || "Imagen de fondo del proyecto"}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
        </motion.div>

      {/* Left Side Panel - Responsive width */}
      <motion.div
        className="absolute left-0 top-0 h-full w-full sm:w-[60%] lg:w-1/2 bg-black/95 backdrop-blur-xl border-r border-white/10 overflow-hidden"
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
      >
        {/* Project Header - Responsive padding */}
        <div className="px-4 sm:px-6 pt-16 sm:pt-20 pb-4 border-b border-white/10 bg-black/95 backdrop-blur-xl">
          {/* Project Title */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.id}
              className="mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">PROYECTO</p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 leading-tight">
                {currentProject.title}
              </h1>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Scrollable Content - Responsive height */}
        <div className="h-[calc(100vh-200px)] sm:h-[calc(100vh-240px)] lg:h-[calc(100vh-280px)] overflow-y-auto px-4 sm:px-6 py-4 scrollbar-thin scrollbar-track-white/10 scrollbar-thumb-white/30">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.id}
              className="space-y-4 sm:space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {/* Project Description */}
              <div>
                <p className="text-gray-400 text-sm uppercase tracking-wider mb-3">DESCRIPCIÓN DEL PROYECTO</p>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{currentProject.description}</p>
              </div>

              {/* Technology Icons Grid */}
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 mb-6">
                {currentProject.technologies.map((tech, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black/30 rounded-full flex items-center justify-center">
                      <Image 
                        src={`/Portafolio/${tech}.svg`}
                        alt={`${tech} icon`}
                        width={24}
                        height={24}
                        className="w-5 h-5 sm:w-6 sm:h-6"
                      />
                    </div>
                    <span className="text-xs text-white/80 text-center">{tech}</span>
                  </motion.div>
                ))}
              </div>

              {/* Project Features */}
              <div>
                <p className="text-gray-400 text-sm uppercase tracking-wider mb-3">CARACTERÍSTICAS DEL PROYECTO</p>
                <div className="space-y-2">
                  {currentProject.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-3 transition-all duration-300 hover:bg-white/15"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <span className="font-medium text-sm text-white">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Other Projects Section */}
              <div>
                <p className="text-gray-400 text-sm uppercase tracking-wider mb-4">OTROS PROYECTOS</p>
                <div className="space-y-3 sm:space-y-4">
                  {otherProjects.slice(0, 4).map((otherProject, index) => (
                    <motion.button
                      key={otherProject.id}
                      onClick={() => handleProjectChange(otherProject)}
                      className="w-full flex gap-3 sm:gap-4 border-b border-gray-800 pb-3 sm:pb-4 cursor-pointer hover:bg-white/5 transition-all duration-300 rounded-lg p-2 sm:p-3 group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Project Thumbnail */}
                      <div className="w-16 h-10 sm:w-20 sm:h-12 bg-gray-800 rounded overflow-hidden flex-shrink-0 relative">
                        <Image
                          src={otherProject.thumbnail || "/placeholder.svg?height=400&width=300"}
                          alt={otherProject.altThumbnail || "Miniatura del proyecto"}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
                      </div>

                      {/* Project Info */}
                      <div className="flex-1 min-w-0 text-left">
                        <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">
                          {otherProject.category}
                        </div>
                        <h4 className="text-white font-semibold text-sm sm:text-base truncate group-hover:text-blue-400 transition-colors">
                          {otherProject.title}
                        </h4>
                        <div className="flex justify-between items-center mt-1">
                          <p className="text-gray-400 text-xs">
                            {otherProject.duration} • {otherProject.technologies.length} tecnologías
                          </p>
                          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                        </div>
                      </div>
                    </motion.button>
                  ))}

                  {/* Show more projects indicator */}
                  {otherProjects.length > 4 && (
                    <div className="text-center py-2">
                      <span className="text-gray-500 text-xs">+{otherProjects.length - 4} proyectos más disponibles</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Extra spacing at bottom for better scrolling */}
              <div className="h-4 sm:h-8"></div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Right Side - Desktop only, hidden on mobile */}
      <div className="hidden sm:block absolute top-16 left-[60%] lg:left-1/2 w-[40%] lg:w-1/2 h-[calc(100vh-4rem)] pointer-events-none">
        {/* Trophy Progress - Top Right */}
        <div className="absolute top-4 sm:top-8 right-4 sm:right-8 flex flex-col sm:flex-row sm:items-center sm:space-x-4 pointer-events-auto">
          <div className="text-white/80 text-xs sm:text-sm uppercase tracking-wider mb-1 sm:mb-0">PROGRESO DEL PROYECTO</div>
          <div className="text-white font-bold text-lg sm:text-xl">100%</div>
        </div>

        {/* Progress Bar */}
        <div className="absolute top-12 sm:top-16 right-4 sm:right-8 w-32 sm:w-48 pointer-events-auto">
          <div className="w-full h-1.5 sm:h-2 bg-white/20 rounded-full overflow-hidden">
            <div className="w-full h-full bg-blue-500 rounded-full"></div>
          </div>
        </div>

        {/* Action Buttons - Right Side */}
        <div className="absolute bottom-16 sm:bottom-24 right-4 sm:right-8 flex flex-col space-y-2 sm:space-y-3 pointer-events-auto">
          {/* View Project Button - Only show if liveUrl exists */}
          {currentProject.liveUrl && (
            <button
              className="bg-blue-500/80 hover:bg-blue-500 text-white px-4 sm:px-8 py-3 sm:py-6 text-sm sm:text-lg font-semibold transition-all duration-300 min-w-[180px] sm:min-w-[250px] flex items-center justify-between rounded-lg"
              onClick={() => window.open(currentProject.liveUrl, "_blank")}
            >
              <span className="uppercase tracking-wider">VER PROYECTO</span>
              <div className="inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white text-black">
                <Play className="w-3 h-3 sm:w-4 sm:h-4" />
              </div>
            </button>
          )}

          {/* GitHub Button */}
          <button
            className="bg-gray-800/80 hover:bg-gray-800 text-white px-4 sm:px-8 py-3 sm:py-6 text-sm sm:text-lg font-semibold transition-all duration-300 min-w-[180px] sm:min-w-[250px] flex items-center justify-between rounded-lg"
            onClick={() => window.open(currentProject.githubUrl, "_blank")}
          >
            <span className="uppercase tracking-wider">VER CÓDIGO</span>
            <div className="inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white text-black">
              <Github className="w-3 h-3 sm:w-4 sm:h-4" />
            </div>
          </button>
        </div>
      </div>

      {/* Close Button - Moved outside pointer-events-none div */}
      <button
        onClick={onBack}
        className="absolute top-4 left-4 z-30 flex items-center space-x-2 text-white/70 hover:text-white transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-blue-400/50 rounded-lg px-3 py-2 bg-black/20 backdrop-blur-xl border border-white/10 hover:bg-black/30 hover:border-white/20"
      >
        <svg
          className="w-4 h-4 transform rotate-180 group-hover:translate-x-0.5 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
        <span className="text-sm font-medium">VOLVER</span>
      </button>

      {/* Mobile Action Buttons - Bottom overlay */}
      <div className="sm:hidden absolute bottom-0 left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-white/10 p-4 z-30">
        <div className="flex flex-col space-y-3">
          {/* Progress */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/80 text-xs uppercase tracking-wider">PROGRESO DEL PROYECTO</span>
            <span className="text-white font-bold text-lg">100%</span>
          </div>
          <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden mb-4">
            <div className="w-full h-full bg-blue-500 rounded-full"></div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            {currentProject.liveUrl && (
              <button
                onClick={() => window.open(currentProject.liveUrl, "_blank")}
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-medium text-sm transition-colors flex items-center justify-center space-x-2"
              >
                <Play className="w-4 h-4" />
                <span>VER PROYECTO</span>
              </button>
            )}
            <button
              onClick={() => window.open(currentProject.githubUrl, "_blank")}
              className={`${currentProject.liveUrl ? 'flex-1' : 'w-full'} bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg font-medium text-sm transition-colors flex items-center justify-center space-x-2`}
            >
              <Github className="w-4 h-4" />
              <span>VER CÓDIGO</span>
            </button>
          </div>

          {/* Back Button */}
          <button
            onClick={onBack}
            className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg font-medium text-sm transition-colors"
          >
            VOLVER AL INICIO
          </button>
        </div>
      </div>
    </div>
  )
}
