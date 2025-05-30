import { Variants } from "framer-motion"

export const backgroundShift: Variants = {
  initial: { x: 0 },
  animate: { x: "25%" },
}

export const slideInLeft: Variants = {
  initial: { x: "-100%" },
  animate: { x: 0 },
} 