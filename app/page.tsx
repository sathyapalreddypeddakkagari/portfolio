import Navbar       from '@/components/Navbar'
import Hero         from '@/components/Hero'
import About        from '@/components/About'
import Skills       from '@/components/Skills'
import Experience   from '@/components/Experience'
import Projects     from '@/components/Projects'
import Publications from '@/components/Publications'
import ShowcaseGallery from '@/components/ShowcaseGallery'
import Education    from '@/components/Education'
import Contact      from '@/components/Contact'
import Footer       from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Publications />
        <ShowcaseGallery />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
