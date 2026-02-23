import { useRef } from 'react'
import useReveal from '../hooks/useReveal'

export default function About({ openModal }) {
    const ref1 = useRef(null)
    const ref2 = useRef(null)
    const ref3 = useRef(null)
    useReveal(ref1)
    useReveal(ref2)
    useReveal(ref3)

    return (
        <section id="about" className="section">
            <div className="bg-glow left"></div>
            <div className="container">
                <div className="section-header-wrapper">
                    <div className="section-label">ABOUT</div>
                    <h2 className="section-title">About Me</h2>
                    <p className="section-subtitle">Get to know me better</p>
                </div>

                <div className="about-grid" ref={ref1}>
                    <div className="card about-text">
                        <p>
                            Hey there! I'm <span className="highlight">Karthikeya</span>, a
                            B.Tech student passionate about{' '}
                            <span className="highlight">Artificial Intelligence</span> and{' '}
                            <span className="highlight">Machine Learning</span>.
                        </p>
                        <p>
                            I love experimenting with neural networks, deploying models, and
                            leveraging cloud technologies to solve real-world problems.
                            Currently exploring Python, TensorFlow, and Docker while leveling
                            up my skills in Data Science and Cloud computing.
                        </p>
                    </div>
                    <div className="about-stats-grid">
                        <div className="card stat-card">
                            <div className="stat-number">10+</div>
                            <div className="stat-label">Projects Completed</div>
                        </div>
                        <div className="card stat-card">
                            <div className="stat-number">3+</div>
                            <div className="stat-label">Certifications</div>
                        </div>
                    </div>
                </div>

                <div className="card coding-stats" ref={ref2}>
                    <h4>
                        <i className="fas fa-code"></i> Coding Stats
                    </h4>
                    <div className="coding-stats-grid">
                        <div className="coding-stat-item">
                            <div className="coding-stat-icon">
                                <i className="fas fa-question-circle"></i>
                            </div>
                            <div>
                                <div className="coding-stat-number">450+</div>
                                <div className="coding-stat-label">Total Questions</div>
                            </div>
                        </div>
                        <div className="coding-stat-item">
                            <div className="coding-stat-icon">
                                <i className="fas fa-calendar-check"></i>
                            </div>
                            <div>
                                <div className="coding-stat-number">70+</div>
                                <div className="coding-stat-label">Active Days</div>
                            </div>
                        </div>
                        <div className="coding-stat-item">
                            <div className="coding-stat-icon">
                                <i className="fas fa-trophy"></i>
                            </div>
                            <div>
                                <div className="coding-stat-number">20+</div>
                                <div className="coding-stat-label">Total Contests</div>
                            </div>
                        </div>
                        <div className="coding-stat-item">
                            <div className="coding-stat-icon">
                                <i className="fab fa-hackerrank"></i>
                            </div>
                            <div>
                                <div className="coding-stat-number">6</div>
                                <div className="coding-stat-label">HackerRank Badges</div>
                            </div>
                        </div>
                    </div>
                    <a
                        href="https://codolio.com/profile/karthik27k/card"
                        className="btn btn-outline view-more-btn"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="fa-solid fa-arrow-up-right-from-square"></i> View More
                    </a>
                </div>

                <div className="resume-edu-grid" ref={ref3}>
                    <div id="resume" className="card resume-card">
                        <h3>Get My Resume</h3>
                        <p>
                            Download my complete resume to learn more about my experience,
                            skills, and achievements.
                        </p>
                        <a
                            href="/assets/resume1.pdf"
                            download="Karthikeya_Kumar_Resume.pdf"
                            className="btn btn-primary"
                        >
                            <i className="fas fa-file-pdf"></i> Download Resume
                        </a>
                    </div>
                    <div className="card education-card">
                        <h4>
                            <i className="fas fa-graduation-cap"></i> Education
                        </h4>
                        <div className="timeline">
                            <div className="timeline-item">
                                <div className="timeline-dot"></div>
                                <h5>B.Tech in Artificial Intelligence</h5>
                                <p className="school">Aditya University</p>
                                <div className="details">
                                    <span>2nd Year • Pursuing</span>
                                </div>
                            </div>
                            <div className="timeline-item">
                                <div className="timeline-dot"></div>
                                <h5>Intermediate (11th & 12th)</h5>
                                <p className="school">Narayana Jr College, Rajahmundry</p>
                                <div className="details">
                                    <p>2021 - 2023</p>
                                    <span>81%</span>
                                </div>
                            </div>
                            <div className="timeline-item">
                                <div className="timeline-dot"></div>
                                <h5>Secondary Education (10th)</h5>
                                <p className="school">Bhashyam Public School, Rajahmundry</p>
                                <div className="details">
                                    <p>2021</p>
                                    <span>92%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
