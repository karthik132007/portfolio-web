import { useRef } from 'react'
import useReveal from '../hooks/useReveal'

const categories = [
    {
        icon: 'fas fa-code',
        name: 'Languages',
        items: [
            { icon: 'fab fa-python', label: 'Python' },
            { icon: 'fab fa-java', label: 'Java' },
            { img: '/assets/icons8-c++.svg', label: 'C/C++' },
        ],
    },
    {
        icon: 'fas fa-brain',
        name: 'ML & Data Science',
        items: [
            { img: '/assets/icons8-tensorflow.svg', label: 'TensorFlow' },
            { img: '/assets/scikit-learn.svg', label: 'Scikit-learn' },
            { img: '/assets/OpenCV.svg', label: 'OpenCV' },
            { img: '/assets/NumPy.svg', label: 'NumPy' },
            { img: '/assets/Pandas.svg', label: 'Pandas' },
            { img: '/assets/jupyter.png', label: 'Jupyter' },
            { img: '/assets/Matplotlib.svg', label: 'Matplotlib' },
        ],
    },
    {
        icon: 'fas fa-cloud',
        name: 'Cloud & DevOps',
        items: [
            { icon: 'fab fa-git-alt', label: 'Git' },
            { icon: 'fab fa-docker', label: 'Docker' },
            { icon: 'fas fa-cloud', label: 'Cloud Computing' },
            { icon: 'fab fa-linux', label: 'Linux' },
        ],
    },
    {
        icon: 'fas fa-tools',
        name: 'Tools',
        items: [
            { img: '/assets/Flask.svg', label: 'Flask' },
            { img: '/assets/MongoDB.svg', label: 'MongoDB' },
            { img: '/assets/SQL Developer.svg', label: 'SQL' },
            { icon: 'fas fa-bolt', label: 'FastAPI' },
        ],
    },
]

export default function Skills() {
    const ref = useRef(null)
    useReveal(ref)

    return (
        <section id="skills" className="section">
            <div className="bg-glow right"></div>
            <div className="container">
                <div className="section-header-wrapper">
                    <div className="section-label">EXPERTISE</div>
                    <h2 className="section-title">Tech Stack</h2>
                    <p className="section-subtitle">Technologies I work with</p>
                </div>

                <div className="skills-grid" ref={ref}>
                    {categories.map((cat) => (
                        <div key={cat.name} className="card skill-category">
                            <div className="category-header">
                                <i className={`${cat.icon} category-icon`}></i>
                                <h3>{cat.name}</h3>
                            </div>
                            <div className="skill-items">
                                {cat.items.map((item) => (
                                    <div key={item.label} className="skill-item">
                                        {item.icon ? (
                                            <i className={item.icon}></i>
                                        ) : (
                                            <img src={item.img} alt={item.label} />
                                        )}
                                        <span>{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
