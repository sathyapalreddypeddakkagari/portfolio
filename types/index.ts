export interface PersonalInfo {
  name: string
  shortName: string
  initials: string
  title: string
  university: string
  gpa: string
  location: string
  email: string
  phone: string
  github: string
  linkedin: string
  resume: string
  bio: string[]
}

export type SkillColor = 'violet' | 'sky' | 'amber' | 'emerald' | 'rose'

export interface SkillGroup {
  icon: string
  label: string
  color: SkillColor
  items: string[]
}

export interface ExperienceItem {
  role: string
  company: string
  type: string
  period: string
  active: boolean
  project?: string
  icon: string
  bullets: string[]
  tags: string[]
}

export interface ProjectStat {
  val: string
  label: string
  accent?: boolean
}

export interface Project {
  title: string
  org?: string
  period: string
  featured: boolean
  badges: string[]
  desc: string
  stats: ProjectStat[]
  tags: string[]
  github: string
  demo?: string
  image?: string
  tagline?: string
}

export interface EducationItem {
  degree: string
  school: string
  period: string
  gpa: string
  location: string
  current: boolean
  icon: string
}

export interface Certification {
  name: string
  issuer: string
  date: string
  link?: string
}

export interface NavLink {
  label: string
  href: string
}

export interface SocialLink {
  icon: string
  href: string
  label: string
}

export interface GalleryItem {
  src?: string
  title: string
  caption: string
  description: string
  tag: string
  icon: string
  href?: string
}

export interface ResearchLink {
  label: string
  href: string
  icon: string
}

export interface ResearchCollab {
  title: string
  org?: string
  period: string
  image?: string
  icon: string
  tagline: string
  tags: string[]
  links: ResearchLink[]
}
