import { useRef } from 'react'
import useReveal from '../hooks/useReveal'

export default function Journey() {
    const ref = useRef(null)
    useReveal(ref)

    return (
        <section id="journey" className="section">
            <div className="bg-glow right"></div>
            <div className="container">
                <div className="section-header-wrapper">
                    <div className="section-label">ROADMAP</div>
                    <h2 className="section-title">My Journey</h2>
                    <p className="section-subtitle">Where I am and where I'm headed</p>
                </div>

                <div className="journey-grid" ref={ref}>
                    <div className="card journey-card">
                        <div className="journey-header">
                            <div className="journey-icon">
                                <i className="fas fa-rocket"></i>
                            </div>
                            <h3>What I'm Currently Doing</h3>
                        </div>
                        <div className="journey-item">
                            <div className="journey-item-icon">
                                <i className="fas fa-brain"></i>
                            </div>
                            <div>
                                <h4>Deep Learning</h4>
                                <p>Learning neural network architectures and advanced ML models</p>
                            </div>
                        </div>
                        <div className="journey-item">
                            <div className="journey-item-icon">
                                <i className="fas fa-cogs"></i>
                            </div>
                            <div>
                                <h4>System Design</h4>
                                <p>Building scalable systems and architecture with Python</p>
                            </div>
                        </div>
                    </div>

                    <div className="card journey-card">
                        <div className="journey-header">
                            <div className="journey-icon">
                                <i className="fas fa-bullseye"></i>
                            </div>
                            <h3>Future Goals</h3>
                        </div>
                        <div className="journey-item">
                            <div className="journey-item-icon">
                                <i className="fas fa-lightbulb"></i>
                            </div>
                            <div>
                                <h4>AI Systems Engineer</h4>
                                <p>Build scalable AI systems that improve human learning and decision-making</p>
                            </div>
                        </div>
                        <div className="journey-item">
                            <div className="journey-item-icon">
                                <i className="fas fa-microscope"></i>
                            </div>
                            <div>
                                <h4>AI Researcher</h4>
                                <p>Contribute to cutting-edge innovations in artificial intelligence</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
