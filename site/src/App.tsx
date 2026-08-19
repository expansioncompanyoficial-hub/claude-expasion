import { Chrome } from './components/Chrome'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { LogoMarquee } from './components/LogoMarquee'
import { Showreel } from './components/Showreel'
import { Portfolio } from './components/Portfolio'
import { Testimonials } from './components/Testimonials'
import { Stats } from './components/Stats'
import { Process } from './components/Process'
import { Contact } from './components/Contact'
import { FAQ } from './components/FAQ'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#inicio">
        Pular para o conteúdo
      </a>
      <Chrome />
      <Navbar />
      <main id="conteudo">
        <Hero />
        <LogoMarquee />
        <Showreel />
        <Portfolio />
        <Testimonials />
        <Stats />
        <Process />
        <Contact />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
