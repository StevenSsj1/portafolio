"use client"

import { motion } from "framer-motion"
import type { ProjectCategory } from "@/types"

interface PS5NavigationBarProps {
  categories: (ProjectCategory | "ALL")[]
  selectedCategory: ProjectCategory | "ALL"
  onCategoryChange: (category: ProjectCategory | "ALL") => void
}

export const PS5NavigationBar = ({ categories, selectedCategory, onCategoryChange }: PS5NavigationBarProps) => {
  return (
    <div className="absolute top-20 left-8 z-20">
      <div className="flex items-center space-x-1">
        {/* Left navigation indicator */}
        <div className="flex items-center space-x-2 mr-4">
          <div className="w-6 h-6 rounded-full border-2 border-white/40 flex items-center justify-center">
            <div className="w-2 h-2 bg-white/60 rounded-full"></div>
          </div>
          <div className="w-6 h-6 rounded-full border-2 border-white/20 flex items-center justify-center">
            <div className="w-2 h-2 bg-white/30 rounded-full"></div>
          </div>
        </div>

        {/* Navigation categories */}
        <div className="flex items-center space-x-6">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`relative px-4 py-2 text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
                selectedCategory === category ? "text-white" : "text-white/60 hover:text-white/80"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}

              {/* Active indicator - Blue underline like PS5 */}
              {selectedCategory === category && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                  layoutId="activeCategory"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              {/* Hover indicator */}
              {selectedCategory !== category && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
              )}
            </motion.button>
          ))}
        </div>

        {/* Right navigation indicator */}
        <div className="flex items-center space-x-2 ml-4">
          <div className="w-6 h-6 rounded-full border-2 border-white/20 flex items-center justify-center">
            <div className="w-2 h-2 bg-white/30 rounded-full"></div>
          </div>
          <div className="w-6 h-6 rounded-full border-2 border-white/40 flex items-center justify-center">
            <div className="w-2 h-2 bg-white/60 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
} 