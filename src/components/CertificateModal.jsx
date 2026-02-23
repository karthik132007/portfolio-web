import { useEffect } from 'react'

export default function CertificateModal({ image, onClose }) {
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') onClose()
        }
        if (image) {
            document.addEventListener('keydown', handleKey)
            document.body.style.overflow = 'hidden'
        }
        return () => {
            document.removeEventListener('keydown', handleKey)
            document.body.style.overflow = ''
        }
    }, [image, onClose])

    return (
        <div
            className={`modal-overlay${image ? ' active' : ''}`}
            onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
        >
            <div className="modal-content">
                <button className="modal-close" onClick={onClose} aria-label="Close modal">
                    &times;
                </button>
                {image && <img src={image.src} alt={image.alt} />}
            </div>
        </div>
    )
}
