"use client"

import { motion } from "framer-motion"

interface PS5BottomControlsProps {
  onOptions?: () => void
  onTopMenu?: () => void
  onDetails?: () => void
  onPlay?: () => void
}

export const PS5BottomControls = ({ onOptions, onTopMenu, onDetails, onPlay }: PS5BottomControlsProps) => {
  const controls = [
    {
      symbol: "⚙",
      label: "OPTIONS",
      action: onOptions,
    },
    {
      symbol: "△",
      label: "TOP MENU",
      action: onTopMenu,
    },
    {
      symbol: "⬜",
      label: "DETAILS",
      action: onDetails,
    },
    {
      symbol: "✕",
      label: "PLAY",
      action: onPlay,
    },
  ]

  return (
    <div className="absolute bottom-6 right-8 z-20">
      <div className="flex items-center space-x-8 bg-black/40 backdrop-blur-sm rounded-full px-6 py-3">
        {controls.map(({ symbol, label, action }, index) => (
          <motion.button
            key={label}
            onClick={action}
            className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
              {symbol}
            </div>
            <span className="text-sm font-medium uppercase tracking-wider">{label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
} 