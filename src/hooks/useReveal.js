import { useEffect } from 'react'

export default function useReveal(ref) {
    useEffect(() => {
        const el = ref.current
        if (!el) return

        el.classList.add('reveal')

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed')
                        observer.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [ref])
}
