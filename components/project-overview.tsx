"use client"

import type React from "react"
import { useEffect } from "react"
import Image from "next/image"
import { ExternalLink, Github, Eye } from "lucide-react"
import PS5Header from "./ps5-header"
import type { Project } from "@/types/project"

interface ProjectOverviewProps {
  project: Project
  onViewDetails: () => void
  onBack: () => void
  onNextProject?: () => void
  onPreviousProject?: () => void
}

const navigationTabs = [
  { id: "overview", label: "Vista General", active: true },
  { id: "repository", label: "Repositorio", active: false },
  { id: "details", label: "Detalles", active: false },
]

export function ProjectOverview({ project, onViewDetails, onBack, onNextProject, onPreviousProject }: ProjectOverviewProps) {
  const completionPercentage = Math.min(100, project.features.length * 15 + 25)

  // Add demo tab only if liveUrl exists
  const tabs = project.liveUrl 
    ? [...navigationTabs.slice(0, 3), { id: "demo", label: "Demo", active: false }, ...navigationTabs.slice(3)]
    : navigationTabs

  // Global keyboard event handler
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Prevent default only for our handled keys
      const handledKeys = ['Enter', ' ', 'Escape', 'Backspace', 'a', 'A', 'd', 'D', 'w', 'W', 's', 'S', 'g', 'G', 'l', 'L']
      if (handledKeys.includes(event.key)) {
        event.preventDefault()
      }

      switch (event.key) {
        case "Enter":
        case " ":
          onViewDetails()
          break
        case "Escape":
        case "Backspace":
          onBack()
          break
        case "a":
        case "A":
          if (onPreviousProject) {
            onPreviousProject()
          }
          break
        case "d":
        case "D":
          if (onNextProject) {
            onNextProject()
          }
          break
        case "w":
        case "W":
          onBack()
          break
        case "s":
        case "S":
          onViewDetails()
          break
        case "g":
        case "G":
          if (project.githubUrl) {
            window.open(project.githubUrl, "_blank", "noopener,noreferrer")
          }
          break
        case "l":
        case "L":
          if (project.liveUrl) {
            window.open(project.liveUrl, "_blank", "noopener,noreferrer")
          }
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onViewDetails, onBack, project.githubUrl, project.liveUrl, onNextProject, onPreviousProject])

  const handleTabClick = (tabId: string) => {
    switch (tabId) {
      case "overview":
        onBack()
        break
      case "details":
        onViewDetails()
        break
      case "repository":
        if (project.githubUrl) {
          window.open(project.githubUrl, "_blank", "noopener,noreferrer")
        }
        break
      case "demo":
        if (project.liveUrl) {
          window.open(project.liveUrl, "_blank", "noopener,noreferrer")
        }
        break
    }
  }

  return (
    <div className="relative h-screen bg-black overflow-hidden focus:outline-none" tabIndex={0}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={project.backgroundImage || "/placeholder.svg?height=1080&width=1920"}
          alt={project.altBackgroundImage || "Imagen de fondo del proyecto"}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/20" />
      </div>

      {/* Header */}
      <div className="absolute top-0 right-0 z-30">
        <PS5Header />
      </div>

      {/* Back Button - Top Left */}
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

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-between p-4 sm:p-6 pt-16 sm:pt-20">
        {/* Top Navigation */}
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between space-y-4 xl:space-y-0">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50 ${
                  tab.active
                    ? "text-white bg-blue-600 rounded-full shadow-lg"
                    : "text-white/70 hover:text-white hover:bg-white/10 rounded-full backdrop-blur-sm"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Progress indicator */}
          <div className="text-right">
            <div className="text-white/60 text-xs sm:text-sm font-medium mb-1 uppercase tracking-wider">
              PROGRESO DEL PROYECTO
            </div>
            <div className="text-white text-xl sm:text-2xl font-bold">{completionPercentage}%</div>
            <div className="w-24 sm:w-32 h-1.5 bg-white/20 rounded-full mt-2 overflow-hidden ml-auto">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between space-y-6 lg:space-y-0 lg:space-x-8">
          {/* Project Info */}
          <div className="flex-1 max-w-2xl">
            <div className="text-blue-400 text-xs sm:text-sm font-medium mb-2 uppercase tracking-wider">
              {project.category}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 sm:mb-8 leading-tight">
              {project.title}
            </h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <ProjectStat label="Desarrollado en" value={project.duration} />
              <ProjectStat label="Características" value={`${project.features.length}`} />
              <ProjectStat label="Tecnologías" value={`${project.technologies.length}`} />
              <ProjectStat label="Estado" value="Completado" />
            </div>
          </div>

          {/* Action Button */}
          <div className="flex-shrink-0">
            <button
              onClick={onViewDetails}
              className="group bg-white/10 backdrop-blur-md border-2 border-white/30 hover:border-white/50 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center space-x-3 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50"
            >
              <span className="text-sm sm:text-base font-medium">VER DETALLES</span>
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
            </button>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <ActionButton icon={Github} href={project.githubUrl} label="REPOSITORY" />
            {project.liveUrl && (
            <ActionButton icon={ExternalLink} href={project.liveUrl} label="LIVE DEMO" />
             )}
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-4 text-white/60 text-sm">
            <ControlHint symbol="G" action="GITHUB" />
            {
              project.liveUrl && (
                <ControlHint symbol="L" action="LIVE DEMO" />
              )
            }
            <ControlHint symbol="W" action="VISTA GENERAL" onClick={onBack} />
            <ControlHint symbol="S" action="DETALLES" onClick={onViewDetails} />
            <ControlHint symbol="A" action="ANTERIOR" onClick={onPreviousProject} />
            <ControlHint symbol="D" action="SIGUIENTE" onClick={onNextProject} />
            <ControlHint symbol="Esc" action="Volver" onClick={onBack} />
          </div>
        </div>
      </div>
    </div>
  )
}

interface ProjectStatProps {
  label: string
  value: string
}

function ProjectStat({ label, value }: ProjectStatProps) {
  return (
    <div>
      <div className="text-white/50 text-xs font-medium mb-1 uppercase tracking-wider">{label}</div>
      <div className="text-white text-lg sm:text-xl font-bold">{value}</div>
    </div>
  )
}

interface ActionButtonProps {
  icon: React.ComponentType<{ className?: string }>
  href: string
  label: string
}

function ActionButton({ icon: Icon, href, label }: ActionButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors group focus:outline-none focus:ring-2 focus:ring-blue-400/50 rounded-lg px-2 py-1"
    >
      <Icon className="w-3 h-3 sm:w-4 sm:h-4 group-hover:text-blue-400 transition-colors" />
      <span className="text-xs sm:text-sm font-medium">{label}</span>
    </a>
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
