import { useState, useEffect, useRef } from 'react'

export default function BackToTop() {
    const [show, setShow] = useState(false)
    const [progress, setProgress] = useState(0)
    const circleRef = useRef(null)

    const radius = 14
    const circumference = 2 * Math.PI * radius

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY
            const docHeight = document.documentElement.scrollHeight - window.innerHeight
            const prog = docHeight > 0 ? scrollTop / docHeight : 0
            setShow(scrollTop > 300)
            setProgress(prog)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const offset = circumference - progress * circumference

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <button
            className={`back-to-top${show ? ' show' : ''}`}
            onClick={scrollToTop}
            aria-label="Back to top"
        >
            <svg viewBox="0 0 36 36">
                <circle
                    className="progress-ring__bg"
                    cx="18" cy="18" r={radius}
                    fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2.5"
                />
                <circle
                    ref={circleRef}
                    className="progress-ring__circle"
                    cx="18" cy="18" r={radius}
                    fill="none" strokeWidth="2.5" strokeLinecap="round"
                    transform="rotate(-90 18 18)"
                    style={{
                        strokeDasharray: circumference,
                        strokeDashoffset: offset,
                    }}
                />
                <path
                    className="arrow-up"
                    d="M18 24V13M13 17l5-5 5 5"
                    fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"
                />
            </svg>
        </button>
    )
}
