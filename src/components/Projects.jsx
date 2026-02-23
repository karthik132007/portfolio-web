import { useState, useRef, useEffect } from 'react'
import useReveal from '../hooks/useReveal'

const slides = [
    { src: '/assets/Project1/Screenshot from 2025-10-17 10-43-33.png', alt: 'Student Stress Prediction - 1' },
    { src: '/assets/Project1/Screenshot from 2025-10-17 10-44-40.png', alt: 'Student Stress Prediction - 2' },
    { src: '/assets/Project1/Screenshot from 2025-10-22 21-16-45.png', alt: 'Student Stress Prediction - 3' },
    { src: '/assets/Project1/Screenshot from 2025-10-22 21-17-00.png', alt: 'Student Stress Prediction - 4' },
    { src: '/assets/Project1/Screenshot from 2025-10-22 21-17-21.png', alt: 'Student Stress Prediction - 5' },
    { src: '/assets/Project1/Screenshot from 2025-10-22 21-17-58.png', alt: 'Student Stress Prediction - 6' },
    { src: '/assets/Project1/Screenshot from 2025-10-22 21-18-19.png', alt: 'Student Stress Prediction - 7' },
]

export default function Projects() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const ref = useRef(null)
    useReveal(ref)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 3500)
        return () => clearInterval(interval)
    }, [])

    return (
        <section id="projects" className="section">
            <div className="bg-glow left"></div>
            <div className="container">
                <div className="section-header-wrapper">
                    <div className="section-label">SELECTED WORK</div>
                    <h2 className="section-title">Featured Projects</h2>
                    <p className="section-subtitle">Things I've built</p>
                </div>

                <div className="projects-list" ref={ref}>
                    <div className="card project-card">
                        <div className="project-carousel">
                            <div
                                className="carousel-slides"
                                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                            >
                                {slides.map((slide, i) => (
                                    <div key={i} className="carousel-slide">
                                        <div className="slide-gradient"></div>
                                        <img src={slide.src} alt={slide.alt} />
                                    </div>
                                ))}
                            </div>
                            <div className="featured-badge">Featured</div>
                        </div>
                        <div className="carousel-dots">
                            {slides.map((_, i) => (
                                <button
                                    key={i}
                                    className={`carousel-dot${i === currentSlide ? ' active' : ''}`}
                                    onClick={() => setCurrentSlide(i)}
                                    aria-label={`Slide ${i + 1}`}
                                />
                            ))}
                        </div>
                        <div className="project-card-content">
                            <div className="project-category">01 / MACHINE LEARNING</div>
                            <h3>Student Stress Prediction</h3>
                            <p>
                                A machine learning model that predicts student stress levels
                                using psychological and environmental data. Built with Python,
                                Scikit-learn, and Streamlit.
                            </p>
                            <div className="project-tags">
                                <span className="tag">Python</span>
                                <span className="tag">Scikit-learn</span>
                                <span className="tag">Streamlit</span>
                                <span className="tag">APIs</span>
                            </div>
                            <div className="project-links">
                                <a
                                    href="https://github.com/karthik132007/student_stress_prediction"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-outline"
                                >
                                    <i className="fab fa-github"></i> Code
                                </a>
                                <a
                                    href="https://yujinai.streamlit.app/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary"
                                >
                                    <i className="fas fa-external-link-alt"></i> Live Demo
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
