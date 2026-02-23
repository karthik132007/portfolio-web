import { useRef } from 'react'
import useReveal from '../hooks/useReveal'

const certs = [
    {
        faIcon: 'fas fa-certificate',
        name: 'Cambridge B2 Empower',
        org: 'Cambridge University Press',
        status: 'Certified',
        src: '/assets/b2.pdf',
    },
    {
        img: '/assets/aws_ml.png',
        name: 'AWS Educate Machine Learning Foundations',
        org: 'Amazon Web Services',
        status: 'Valid',
        href: 'https://www.credly.com/badges/84d7fa16-2254-42b1-9ad4-91757efcfc79/public_url',
        src: '/assets/aws_ml.png',
    },
    {
        img: '/assets/data_analysis.png',
        name: 'Data Analysis with Python',
        org: 'IBM',
        status: 'Valid',
        src: '/assets/data_analysis.png',
    },
]

export default function Certifications({ openModal }) {
    const ref = useRef(null)
    useReveal(ref)

    return (
        <section id="certifications" className="section">
            <div className="bg-glow left"></div>
            <div className="container">
                <div className="section-header-wrapper">
                    <div className="section-label">CREDENTIALS</div>
                    <h2 className="section-title">Certifications</h2>
                    <p className="section-subtitle">Professional certifications earned</p>
                </div>

                <div className="certifications-grid" ref={ref}>
                    {certs.map((cert) => (
                        <div key={cert.name} className="card certification-card">
                            <div className="cert-icon">
                                {cert.img ? (
                                    <img src={cert.img} alt={cert.name} />
                                ) : cert.faIcon ? (
                                    <i className={cert.faIcon}></i>
                                ) : (
                                    cert.icon
                                )}
                            </div>
                            <div className="cert-info">
                                <h3>{cert.name}</h3>
                                <p>{cert.org}</p>
                            </div>
                            <div className="cert-footer">
                                <div className="cert-status">
                                    <i className="fas fa-certificate"></i>
                                    <span>{cert.status}</span>
                                </div>
                                {(cert.src || cert.href) && (
                                    <div className="cert-actions">
                                        <button
                                            className="btn btn-outline"
                                            onClick={() => openModal(cert.src, cert.name, cert.href)}
                                        >
                                            View
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
