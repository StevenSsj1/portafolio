export interface Project {
  id: string
  title: string
  description: string
  category: string
  duration: string
  technologies: string[]
  features: string[]
  thumbnail: string
  backgroundImage: string
  images: string[]
  githubUrl: string
  liveUrl?: string
  altThumbnail: string
  altBackgroundImage: string
}

export interface Technology {
  name: string
  icon: string
}

export interface UserProfile {
  name: string
  avatar: string
  level: number
  trophies: number
  title?: string
}

export type ProjectCategory = "Web Development" | "Mobile Apps" | "UI/UX Design" | "Backend" | "DevOps"

export interface NavigationState {
  selectedProject: number
  selectedCategory: ProjectCategory | "ALL"
  showDetails: boolean
  currentDetailProject: Project | null
} 