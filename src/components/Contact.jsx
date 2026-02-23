import { useRef } from 'react'
import useReveal from '../hooks/useReveal'

export default function Contact() {
    const ref = useRef(null)
    useReveal(ref)

    return (
        <section id="contact" className="section">
            <div className="bg-glow left"></div>
            <div className="container">
                <div className="section-header-wrapper">
                    <div className="section-label">REACH OUT</div>
                    <h2 className="section-title">Let's Connect</h2>
                    <p className="section-subtitle">I'd love to hear from you</p>
                </div>

                <div className="contact-grid" ref={ref}>
                    <div className="card contact-card">
                        <h3>Get in Touch</h3>
                        <div className="contact-links-list">
                            <a href="mailto:karthikeya2k7@zohomail.in" className="contact-link-item">
                                <div className="contact-icon-wrapper">
                                    <i className="fas fa-envelope"></i>
                                </div>
                                <div className="contact-link-details">
                                    <div className="label">Email</div>
                                    <div className="value">karthikeya2k7@zohomail.in</div>
                                </div>
                            </a>
                            <a href="https://www.linkedin.com/in/karthikeya2k7" target="_blank" rel="noopener noreferrer" className="contact-link-item">
                                <div className="contact-icon-wrapper">
                                    <i className="fab fa-linkedin"></i>
                                </div>
                                <div className="contact-link-details">
                                    <div className="label">LinkedIn</div>
                                    <div className="value">karthikeya2k7</div>
                                </div>
                            </a>
                            <a href="https://github.com/karthik132007" target="_blank" rel="noopener noreferrer" className="contact-link-item">
                                <div className="contact-icon-wrapper">
                                    <i className="fab fa-github"></i>
                                </div>
                                <div className="contact-link-details">
                                    <div className="label">GitHub</div>
                                    <div className="value">karthik132007</div>
                                </div>
                            </a>
                            <a href="https://codolio.com/profile/karthik2k7/card" target="_blank" rel="noopener noreferrer" className="contact-link-item">
                                <div className="contact-icon-wrapper">
                                    <i className="fa-solid fa-code"></i>
                                </div>
                                <div className="contact-link-details">
                                    <div className="label">Codolio</div>
                                    <div className="value">karthik2k7</div>
                                </div>
                            </a>
                        </div>
                    </div>

                    <div className="card contact-card">
                        <h3>Location</h3>
                        <div className="location-item">
                            <div className="contact-icon-wrapper location-icon">
                                <i className="fas fa-map-marker-alt"></i>
                            </div>
                            <div className="location-details">
                                <div className="city">Rajahmundry</div>
                                <div className="country">Andhra Pradesh, India</div>
                            </div>
                        </div>
                        <div className="remote-info">
                            <p>Open to remote opportunities and collaborations worldwide</p>
                            <a href="mailto:karthikeya2k7@zohomail.in" className="btn btn-primary">
                                <i className="fas fa-paper-plane"></i> Send me an Email
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
