import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import GitHubHeatmap from './components/GitHubHeatmap'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import Journey from './components/Journey'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CertificateModal from './components/CertificateModal'
import BackToTop from './components/BackToTop'
import { useState } from 'react'

function App() {
    const [modalImage, setModalImage] = useState(null)

    const openModal = (src, alt, href) => {
        if (href) {
            window.open(href, '_blank')
            return
        }
        setModalImage({ src, alt: alt || 'Certificate' })
    }

    const closeModal = () => setModalImage(null)

    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <About openModal={openModal} />
                <GitHubHeatmap />
                <Skills />
                <Experience openModal={openModal} />
                <Projects />
                <Certifications openModal={openModal} />
                <Journey />
                <Contact />
            </main>
            <Footer />
            <CertificateModal image={modalImage} onClose={closeModal} />
            <BackToTop />
        </>
    )
}

export default App
