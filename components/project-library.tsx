"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Play, Pause } from "lucide-react"
import PS5Header from "./ps5-header"
import { ProjectCarousel } from "./project-carousel"
import type { Project } from "@/types"

interface ProjectLibraryProps {
  projects: Project[]
  onProjectSelect: (project: Project, index: number) => void
}

export function ProjectLibrary({ projects, onProjectSelect }: ProjectLibraryProps) {
  const [focusedIndex, setFocusedIndex] = useState(0)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)

  // Ensure focused index is within bounds
  useEffect(() => {
    if (focusedIndex >= projects.length && projects.length > 0) {
      setFocusedIndex(projects.length - 1)
    }
  }, [focusedIndex, projects.length])

  // Auto-scroll carousel
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isAutoScrolling && projects.length > 1) {
      interval = setInterval(() => {
        setFocusedIndex((prevIndex) => (prevIndex + 1) % projects.length)
      }, 3000) // Change every 3 seconds
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isAutoScrolling, projects.length])

  // Global keyboard event handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const handledKeys = ['a', 'A', 'd', 'D', 'Enter', ' ', 'Escape', 'p', 'P']
      if (handledKeys.includes(e.key)) {
        e.preventDefault()
      }

      switch (e.key) {
        case "a":
        case "A":
          setFocusedIndex((prev) => Math.max(0, prev - 1))
          setIsAutoScrolling(false) // Pause auto-scroll on manual navigation
          break
        case "d":
        case "D":
          setFocusedIndex((prev) => Math.min(projects.length - 1, prev + 1))
          setIsAutoScrolling(false) // Pause auto-scroll on manual navigation
          break
        case "Enter":
        case " ":
          if (projects[focusedIndex]) {
            const selectedProject = projects[focusedIndex]
            handleProjectSelect(selectedProject)
          }
          break
        case "Escape":
          setFocusedIndex(0)
          setIsAutoScrolling(true)
          break
        case "p":
        case "P":
          setIsAutoScrolling(!isAutoScrolling)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [focusedIndex, projects, onProjectSelect, isAutoScrolling])

  const handleProjectClick = (index: number) => {
    setFocusedIndex(index)
    setIsAutoScrolling(false) // Pause auto-scroll on manual selection
  }

  const handleProjectSelect = (project: Project) => {
    onProjectSelect(project, focusedIndex)
  }

  const handleDoubleClick = (project: Project) => {
    onProjectSelect(project, focusedIndex)
  }

  const handleViewProject = () => {
    if (projects[focusedIndex]) {
      const selectedProject = projects[focusedIndex]
      handleProjectSelect(selectedProject)
    }
  }

  const toggleAutoScroll = () => {
    setIsAutoScrolling(!isAutoScrolling)
  }

  return (
    <div
      className="relative h-screen bg-black overflow-hidden focus:outline-none"
      tabIndex={0}
    >
      {/* Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${focusedIndex}-${projects[focusedIndex]?.id}`}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={projects[focusedIndex]?.backgroundImage || "/placeholder.svg?height=1080&width=1920"}
            alt={projects[focusedIndex]?.altBackgroundImage || "Imagen de fondo del proyecto"}
            fill
            className="object-containt object-center w-full h-full"
            sizes="100vw 100vh"
            quality={100}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80" />
        </motion.div>
      </AnimatePresence>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-start justify-between">
        {/* Left side - Project info */}
        <div className="flex-1 p-3 sm:p-4 lg:p-6">
          <div className="pt-2">
            <div className="text-white/60 text-xs mb-4">
              Mostrando {projects.length} proyecto{projects.length !== 1 ? "s" : ""}
            </div>

            {/* Auto-scroll toggle */}
            <button
              onClick={toggleAutoScroll}
              className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300"
            >
              {isAutoScrolling ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span className="text-xs font-medium">{isAutoScrolling ? "PAUSAR" : "REPRODUCIR"}</span>
            </button>
          </div>
        </div>

        {/* PS5 Header */}
        <div className="flex-shrink-0">
          <PS5Header />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="absolute inset-0 flex flex-col justify-center z-20 px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-28 sm:pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${focusedIndex}-${projects[focusedIndex]?.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-8"
          >
            {/* Project Info */}
            <div className="flex-1 max-w-2xl">
              <div className="text-blue-400 text-xs sm:text-sm font-medium mb-2 uppercase tracking-wider">
                {projects[focusedIndex]?.category}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 sm:mb-6">
                {projects[focusedIndex]?.title}
              </h1>
            </div>

            {/* Action Button */}
            <div className="flex-shrink-0">
              <button
                onClick={handleViewProject}
                className="group bg-white/10 backdrop-blur-md border-2 border-white/20 hover:border-white/40 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium transition-all duration-300 flex items-center space-x-3 shadow-lg hover:shadow-xl hover:bg-white/20"
              >
                <span className="text-sm sm:text-base">Ver Proyecto</span>
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Project Carousel */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 to-transparent">
        <ProjectCarousel
          projects={projects}
          selectedIndex={focusedIndex}
          onProjectSelect={handleProjectClick}
          onNavigate={(direction) => {
            if (direction === "prev") {
              setFocusedIndex((prev) => Math.max(0, prev - 1))
            } else {
              setFocusedIndex((prev) => Math.min(projects.length - 1, prev + 1))
            }
            setIsAutoScrolling(false)
          }}
          onProjectClick={(project, index) => {
            handleProjectClick(index)
            handleProjectSelect(project)
          }}
        />

        {/* Navigation Controls */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-white/60 text-xs pb-4">
          <ControlHint symbol="A" action="ANTERIOR" />
          <ControlHint symbol="D" action="SIGUIENTE" />
          <ControlHint symbol="⏎" action="SELECCIONAR" />
          <ControlHint symbol="P" action={isAutoScrolling ? "PAUSAR" : "REPRODUCIR"} onClick={toggleAutoScroll} />
        </div>
      </div>
    </div>
  )
}

interface ControlHintProps {
  symbol: string
  action: string
  onClick?: () => void
}

function ControlHint({ symbol, action, onClick }: ControlHintProps) {
  const Component = onClick ? "button" : "span"

  return (
    <Component
      onClick={onClick}
      className={`flex items-center space-x-1.5 sm:space-x-2 ${
        onClick
          ? "hover:text-white transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400/50 rounded-lg px-2 py-1 hover:bg-white/10"
          : ""
      }`}
    >
      <span className="text-white/90 text-xs sm:text-sm bg-black/40 backdrop-blur-sm px-2 py-1 rounded-md border border-white/20 min-w-[2rem] text-center">{symbol}</span>
      <span className="text-xs sm:text-sm uppercase tracking-wider font-medium text-white/80 hidden sm:inline">{action}</span>
    </Component>
  )
}
