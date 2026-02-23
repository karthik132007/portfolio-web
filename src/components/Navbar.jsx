import { useState, useEffect } from 'react'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [activeSection, setActiveSection] = useState('home')

    useEffect(() => {
        const sections = Array.from(document.querySelectorAll('main section[id]'))

        const handleScroll = () => {
            setScrolled(window.scrollY > 50)

            const scrollY = window.scrollY + 120
            let currentId = 'home'
            sections.forEach((sec) => {
                if (sec.offsetTop <= scrollY) currentId = sec.id
            })
            setActiveSection(currentId)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollTo = (e, id) => {
        e.preventDefault()
        setMobileOpen(false)
        const el = document.getElementById(id)
        if (el) {
            const top = el.offsetTop - 80
            window.scrollTo({ top, behavior: 'smooth' })
        }
    }

    const links = [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'skills', label: 'Skills' },
        { id: 'experience', label: 'Experience' },
        { id: 'projects', label: 'Projects' },
        { id: 'contact', label: 'Contact' },
    ]

    return (
        <>
            <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
                <div className="container">
                    <a href="#home" className="nav-logo" onClick={(e) => scrollTo(e, 'home')}>
                        KARTHIKEYA<span className="last">KUMAR</span>
                    </a>
                    <div className="nav-links">
                        {links.map((l) => (
                            <a
                                key={l.id}
                                href={`#${l.id}`}
                                className={activeSection === l.id ? 'active' : ''}
                                onClick={(e) => scrollTo(e, l.id)}
                            >
                                {l.label}
                            </a>
                        ))}
                        <a
                            href="#resume"
                            className="nav-resume"
                            onClick={(e) => scrollTo(e, 'resume')}
                        >
                            Resume
                        </a>
                    </div>
                    <button
                        className="mobile-menu-btn"
                        aria-label="Open menu"
                        onClick={() => setMobileOpen(true)}
                    >
                        &#9776;
                    </button>
                </div>
            </nav>

            <div className={`mobile-overlay${mobileOpen ? ' active' : ''}`}>
                <button
                    className="mobile-close"
                    aria-label="Close menu"
                    onClick={() => setMobileOpen(false)}
                >
                    &times;
                </button>
                {links.map((l) => (
                    <a key={l.id} href={`#${l.id}`} onClick={(e) => scrollTo(e, l.id)}>
                        {l.label}
                    </a>
                ))}
                <a href="#resume" onClick={(e) => scrollTo(e, 'resume')}>
                    Resume
                </a>
            </div>
        </>
    )
}
