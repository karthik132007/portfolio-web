import { useRef } from 'react'
import useReveal from '../hooks/useReveal'

export default function Experience({ openModal }) {
    const ref = useRef(null)
    useReveal(ref)

    return (
        <section id="experience" className="section">
            <div className="bg-glow right"></div>
            <div className="container">
                <div className="section-header-wrapper">
                    <div className="section-label">CAREER</div>
                    <h2 className="section-title">Experience</h2>
                    <p className="section-subtitle">Professional journey so far</p>
                </div>

                <div ref={ref}>
                    <div className="card experience-card">
                        <div className="experience-gradient-bar"></div>
                        <div className="experience-header">
                            <div>
                                <h3>Data Analyst Intern</h3>
                                <div className="experience-company">
                                    <i className="fas fa-briefcase"></i>
                                    <span>Skillfiend Mentor</span>
                                </div>
                            </div>
                            <div className="experience-details">
                                <div className="experience-detail">
                                    <i className="fas fa-calendar"></i>
                                    <span>1 Month</span>
                                </div>
                                <div className="experience-detail">
                                    <i className="fas fa-map-marker-alt"></i>
                                    <span>Remote</span>
                                </div>
                            </div>
                        </div>
                        <p className="experience-description">
                            Worked on data analysis projects, performed data cleaning and
                            visualization, and gained hands-on experience with analytics tools
                            and techniques.
                        </p>
                        <div
                            className="certificate-preview"
                            onClick={() => openModal('/assets/intern_cert1.png', 'Internship Certificate')}
                        >
                            <img src="/assets/intern_cert1.png" alt="Internship Certificate" />
                            <div className="certificate-preview-text">
                                <div className="cert-link">
                                    <i className="fas fa-certificate"></i>
                                    <span>View Certificate</span>
                                </div>
                                <p>Click to enlarge</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
