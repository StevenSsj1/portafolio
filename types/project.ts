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
