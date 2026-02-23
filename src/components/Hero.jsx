import { useState, useEffect } from 'react'

export default function Hero() {
    const roles = ['AI/ML Developer', 'Data Enthusiast', 'Cloud Learner']
    const [text, setText] = useState('')
    const [roleIdx, setRoleIdx] = useState(0)
    const [charIdx, setCharIdx] = useState(0)
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        const current = roles[roleIdx]
        let timeout

        if (!isDeleting) {
            if (charIdx < current.length) {
                timeout = setTimeout(() => {
                    setText(current.slice(0, charIdx + 1))
                    setCharIdx(charIdx + 1)
                }, 100)
            } else {
                timeout = setTimeout(() => setIsDeleting(true), 2000)
            }
        } else {
            if (charIdx > 0) {
                timeout = setTimeout(() => {
                    setText(current.slice(0, charIdx - 1))
                    setCharIdx(charIdx - 1)
                }, 50)
            } else {
                setIsDeleting(false)
                setRoleIdx((roleIdx + 1) % roles.length)
            }
        }

        return () => clearTimeout(timeout)
    }, [charIdx, isDeleting, roleIdx])

    return (
        <section id="home" className="hero section">
            <div className="hero-background-glow"></div>
            <div className="container hero-container">
                <div className="hero-content">
                    <div className="hero-greeting">👋 Hi there, I'm</div>
                    <h1 className="hero-title">
                        Karthikeya <span className="text-gradient">Kumar</span>
                    </h1>
                    <h2 className="hero-subtitle">
                        I'm a <span className="typed-text">{text}</span>
                        <span className="cursor">|</span>
                    </h2>
                    <p className="hero-description">
                        I specialize in crafting intelligent systems, building machine learning models, and exploring the frontiers of AI. Driven by curiosity and a passion for data.
                    </p>
                    <div className="hero-buttons">
                        <a href="#projects" className="btn btn-primary pulse-btn">
                            Explore My Work
                        </a>
                        <a href="#contact" className="btn btn-outline">
                            Get in Touch
                        </a>
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="code-window">
                        <div className="window-header">
                            <span className="dot red"></span>
                            <span className="dot yellow"></span>
                            <span className="dot green"></span>
                        </div>
                        <div className="window-body">
                            <pre><code dangerouslySetInnerHTML={{
                                __html:
                                    `<span class="code-keyword">from</span> future <span class="code-keyword">import</span> Intelligence

<span class="code-keyword">class</span> <span class="code-class">Developer</span>:
    <span class="code-keyword">def</span> <span class="code-method">__init__</span>(<span class="code-this">self</span>):
        <span class="code-this">self</span>.name = <span class="code-string">"Karthikeya"</span>
        <span class="code-this">self</span>.focus = [<span class="code-string">"AI"</span>, <span class="code-string">"ML"</span>, <span class="code-string">"Cloud"</span>]

    <span class="code-keyword">def</span> <span class="code-method">innovate</span>(<span class="code-this">self</span>):
        <span class="code-keyword">while</span> <span class="code-keyword">True</span>:
            <span class="code-this">self</span>.build()
            <span class="code-this">self</span>.learn()`
                            }} /></pre>
                        </div>
                    </div>
                    <div className="hero-socials">
                        <a href="https://github.com/karthik132007" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <i className="fab fa-github"></i>
                        </a>
                        <a href="https://www.linkedin.com/in/karthikeya2k7" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <i className="fab fa-linkedin"></i>
                        </a>
                        <a href="https://codolio.com/profile/karthik27k/card" target="_blank" rel="noopener noreferrer" aria-label="Codolio">
                            <i className="fa-solid fa-code"></i>
                        </a>
                        <a href="mailto:karthikeya2k7@zohomail.in" aria-label="Email">
                            <i className="fas fa-envelope"></i>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
