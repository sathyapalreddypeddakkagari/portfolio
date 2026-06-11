import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import ProjectsResearchView from '@/components/ProjectsResearchView'

export const metadata: Metadata = {
  title: 'Projects & Research — Sathyapal Reddy',
  description:
    'Production AI data systems, research, and milestones by Sathyapal Reddy Peddakkagari.',
}

export default function WorkPage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <ProjectsResearchView />
      </main>
      <Footer />
    </>
  )
}
