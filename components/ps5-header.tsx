"use client"

import type React from "react"
import { useState } from "react"
import { Bell, Github, Linkedin, Gamepad2, ChevronDown, ExternalLink } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface PS5HeaderProps {
  userName?: string
  userTitle?: string
  githubUrl?: string
  linkedinUrl?: string
  playstationUrl?: string
}

export default function PS5Header({
  userName = "Lenin S Llano Orellana",
  userTitle = "Ingeniero en Ciencias de la Computación",
  githubUrl = "https://github.com/StevenSsj1",
  linkedinUrl = "https://www.linkedin.com/in/lenin-llano-92274bb6/",
  playstationUrl = "https://www.playstation.com",
}: PS5HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLinkClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
    setIsMenuOpen(false)
  }

  const handleIconClick = (url: string, e: React.MouseEvent) => {
    e.stopPropagation()
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="p-2 sm:p-3">
      <div className="flex items-center justify-end">
        {/* Right Side - PS5 Style Header */}
        <div className="flex items-center space-x-2 sm:space-x-3 bg-black/50 backdrop-blur-md rounded-full px-3 sm:px-4 py-2 border border-white/10">
          {/* Notification Bell */}
          <div className="relative">
            <Bell className="w-3 h-3 sm:w-4 sm:h-4 text-white/80 hover:text-white transition-colors cursor-pointer" />
            <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
          </div>

          {/* PlayStation Plus Icon */}
          <button
            onClick={(e) => handleIconClick(playstationUrl, e)}
            className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-sm flex items-center justify-center shadow-lg hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 group"
            title="PlayStation"
          >
            <span className="text-black text-xs font-bold group-hover:scale-110 transition-transform">+</span>
          </button>

          {/* Profile Section with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center space-x-2 hover:bg-white/10 rounded-full px-2 py-1 transition-all duration-300"
            >
              {/* Profile Avatar */}
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg">
                {userName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>

              {/* User Info - Hidden on small mobile */}
              <div className="text-left hidden md:block">
                <div className="text-white text-xs font-medium">{userName}</div>
              </div>

              {/* Dropdown Arrow */}
              <ChevronDown
                className={`w-3 h-3 text-white/60 transition-transform duration-300 ${isMenuOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <>
                  {/* Overlay to handle clicks outside */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsMenuOpen(false)}
                  />
                  <motion.div 
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full right-0 mt-2 w-56 sm:w-64 bg-black/95 backdrop-blur-xl rounded-lg border border-white/20 shadow-2xl overflow-hidden z-50"
                  >
                    {/* User Profile Header */}
                    <div className="p-3 sm:p-4 border-b border-white/10">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-sm sm:text-base font-bold text-white shadow-lg">
                          {userName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </div>
                        <div className="flex-1">
                          <div className="text-white font-semibold text-sm">{userName}</div>
                          <div className="text-white/60 text-xs">{userTitle}</div>
                          <div className="text-green-400 text-xs mt-1 flex items-center">
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                            Online
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Social Links Section */}
                    <div className="p-3 sm:p-4">
                      <div className="text-white/60 text-xs uppercase tracking-wider mb-3 font-medium">Social Links</div>
                      <div className="space-y-1">
                        <button
                          onClick={() => handleLinkClick(githubUrl)}
                          className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-white/10 transition-all duration-300 group"
                        >
                          <div className="flex items-center space-x-3">
                            <Github className="w-4 h-4 text-white/80 group-hover:text-white transition-colors" />
                            <span className="text-white text-sm font-medium">GitHub</span>
                          </div>
                          <ExternalLink className="w-3 h-3 text-white/40 group-hover:text-white/80 transition-colors" />
                        </button>
                        <button
                          onClick={() => handleLinkClick(linkedinUrl)}
                          className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-white/10 transition-all duration-300 group"
                        >
                          <div className="flex items-center space-x-3">
                            <Linkedin className="w-4 h-4 text-white/80 group-hover:text-white transition-colors" />
                            <span className="text-white text-sm font-medium">LinkedIn</span>
                          </div>
                          <ExternalLink className="w-3 h-3 text-white/40 group-hover:text-white/80 transition-colors" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
