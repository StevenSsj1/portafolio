"use client"

import { motion } from "framer-motion"
import { LogOut, Settings, User } from "lucide-react"
import type { UserProfile } from "@/types"

interface ProfileDropdownProps {
  userProfile: UserProfile
  onClose: () => void
}

export const ProfileDropdown = ({ userProfile, onClose }: ProfileDropdownProps) => {
  const menuItems = [
    {
      icon: User,
      label: "Profile",
      onClick: () => {
        // Handle profile click
        onClose()
      },
    },
    {
      icon: Settings,
      label: "Settings",
      onClick: () => {
        // Handle settings click
        onClose()
      },
    },
    {
      icon: LogOut,
      label: "Sign Out",
      onClick: () => {
        // Handle sign out
        onClose()
      },
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-black/90 backdrop-blur-md rounded-lg shadow-xl border border-white/10 w-48 overflow-hidden"
    >
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-sm font-bold text-white">
            {userProfile.name.charAt(0)}
          </div>
          <div>
            <div className="text-white font-medium">{userProfile.name}</div>
            <div className="text-white/60 text-xs">Level {userProfile.level}</div>
          </div>
        </div>
      </div>

      <div className="py-2">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={item.onClick}
            className="w-full px-4 py-2 flex items-center space-x-3 text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-200"
          >
            <item.icon className="w-4 h-4" />
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </div>
    </motion.div>
  )
} 