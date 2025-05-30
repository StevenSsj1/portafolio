export const UI_CONSTANTS = {
  carouselItemWidth: 191, // w-36 = 144px
  carouselItemHeight: 112, // h-48 = 192px
} as const

export const ANIMATION_DURATIONS = {
  autoRotate: 5000, // 5 seconds
  transition: 300, // 300ms
}

export const PROJECT_CATEGORIES = [
  "All",
  "Web Development",
  "Mobile Apps",
  "UI/UX Design",
  "Backend",
  "DevOps",
]

export const DEFAULT_USER_PROFILE = {
  name: "Developer",
  avatar: "/avatar.png",
  level: 42,
  trophies: 156,
} 