"use client"

import { Card } from "@/components/ui/card"
import Image from "next/image"
import { motion } from "framer-motion"
import { UI_CONSTANTS } from "@/data/constants"
import type { Project } from "@/types"

interface ProjectCarouselProps {
  projects: Project[]
  selectedIndex: number
  onProjectSelect: (index: number) => void
  onNavigate: (direction: "prev" | "next") => void
  onProjectClick: (project: Project, index: number) => void
}

export const ProjectCarousel = ({
  projects,
  selectedIndex,
  onProjectSelect,
  onProjectClick,
}: ProjectCarouselProps) => {
  return (
    <div className="pb-8 px-8">
      {/* Carousel without navigation buttons */}
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {projects.map((project, index) => (
          <motion.div key={project.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Card
              className={`relative flex-shrink-0 cursor-pointer transition-all duration-300 overflow-hidden ${
                index === selectedIndex
                  ? "ring-4 ring-blue-500 scale-105"
                  : "hover:scale-105 opacity-70 hover:opacity-100"
              }`}
              style={{
                width: UI_CONSTANTS.carouselItemWidth,
                height: UI_CONSTANTS.carouselItemHeight,
              }}
              onClick={() => {
                onProjectSelect(index)
                onProjectClick(project, index)
              }}
            >
              <Image src={project.thumbnail || "/placeholder.svg"} alt={project.title} fill className="object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-2 left-2 right-2">
                <h3 className="text-white text-sm font-semibold truncate">{project.title}</h3>
              </div>

              {/* PS5-style selection indicator */}
              {index === selectedIndex && (
                <div className="absolute top-2 right-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 