"use client"

import type React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Github, Linkedin, ChevronDown } from "lucide-react"
import Link from "next/link"

interface HeroSectionProps {
  onScrollToProjects?: () => void
}

export function HeroSection({ onScrollToProjects }: HeroSectionProps) {
  const { scrollY } = useScroll()

  // Parallax effects
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150])
  const textY = useTransform(scrollY, [0, 500], [0, 100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  const handleScrollClick = () => {
    if (onScrollToProjects) {
      onScrollToProjects()
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated background layers */}
      <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
        {/* Primary gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        />

        {/* Animated orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute top-3/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
            x: [0, -40, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Grid pattern */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "50px 50px"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center text-white max-w-4xl mx-auto"
        style={{ y: textY, opacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main title with enhanced animations */}
        <motion.div className="mb-8" variants={itemVariants}>
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 tracking-tight"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.span
              className="inline-block bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              LENIN LLANO
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8"
            variants={itemVariants}
          >
            Ingeniero en Ciencias de la Computación{""}
            <motion.span
              className="text-blue-400 font-semibold"
              animate={{
                color: ["#60a5fa", "#a78bfa", "#60a5fa"],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
            , me gusta el desarrollo de software, la inteligencia artificial y la inteligencia de negocios.
            </motion.span>{" "}
            estoy en constante aprendizaje de algoritmos, modelos predictivos e ingenieria de software.
          </motion.p>
        </motion.div>

        {/* Enhanced social links */}
        <motion.div className="flex justify-center space-x-6 mb-12" variants={itemVariants}>
          <SocialLink href="https://github.com/StevenSsj1" icon={Github} label="GitHub" delay={0} />
          <SocialLink href="https://www.linkedin.com/in/lenin-llano-92274bb6" icon={Linkedin} label="LinkedIn" delay={0.1} />
        </motion.div>

        {/* Enhanced scroll indicator - Now clickeable */}
        <motion.button
          className="flex flex-col items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400/50 rounded-lg p-4 absolute bottom-0.35 left-0 right-0"
          variants={floatingVariants}
          animate="animate"
          onClick={handleScrollClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className="text-sm text-gray-400 mb-3 font-medium tracking-wider uppercase hover:text-white transition-colors"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            Descubre mi trabajo
          </motion.span>

          <motion.div
            className="relative group"
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronDown className="w-6 h-6 text-blue-400 group-hover:text-white transition-colors" />

            {/* Pulsing ring */}
            <motion.div
              className="absolute inset-0 border-2 border-blue-400 rounded-full group-hover:border-white transition-colors"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 origin-left z-50"
        style={{
          scaleX: useTransform(scrollY, [0, 500], [0, 1]),
        }}
      />
    </section>
  )
}

interface SocialLinkProps {
  href: string
  icon: React.ComponentType<{ className?: string }>
  label: string
  delay: number
}

function SocialLink({ href, icon: Icon, label, delay }: SocialLinkProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: "backOut" }}
      whileHover={{
        scale: 1.2,
        y: -8,
        rotate: [0, -10, 10, 0],
      }}
      whileTap={{ scale: 0.9 }}
    >
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 block overflow-hidden"
        aria-label={label}
      >
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        <Icon className="w-6 h-6 text-white group-hover:text-blue-400 transition-colors relative z-10" />

        {/* Hover effect */}
        <motion.div
          className="absolute inset-0 border-2 border-blue-400/50 rounded-full opacity-0 group-hover:opacity-100"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </Link>
    </motion.div>
  )
}
