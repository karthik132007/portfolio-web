import { useEffect, useRef, useState } from 'react'
import useReveal from '../hooks/useReveal'

export default function GitHubHeatmap() {
    const wrapperRef = useRef(null)
    const gridRef = useRef(null)
    const [stats, setStats] = useState({ total: 0, current: 0, longest: 0 })
    const [animated, setAnimated] = useState(false)
    const [displayStats, setDisplayStats] = useState({ total: 0, current: 0, longest: 0 })
    useReveal(wrapperRef)

    useEffect(() => {
        const GITHUB_USERNAME = 'karthik132007'
        const API_URL = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`

        fetch(API_URL)
            .then((res) => {
                if (!res.ok) throw new Error(res.status)
                return res.json()
            })
            .then((json) => {
                const contributions = json.contributions || []
                renderGrid(contributions)
            })
            .catch(() => {
                console.warn('GitHub API unavailable, using simulated data.')
                const data = []
                const today = new Date()
                for (let i = 363; i >= 0; i--) {
                    const d = new Date(today)
                    d.setDate(d.getDate() - i)
                    const rand = Math.random()
                    let level = 0, count = 0
                    if (rand > 0.6) { level = 1; count = Math.ceil(Math.random() * 3) }
                    if (rand > 0.75) { level = 2; count = Math.ceil(Math.random() * 5) + 2 }
                    if (rand > 0.88) { level = 3; count = Math.ceil(Math.random() * 7) + 4 }
                    if (rand > 0.95) { level = 4; count = Math.ceil(Math.random() * 10) + 8 }
                    data.push({ date: d.toISOString().split('T')[0], count, level })
                }
                renderGrid(data)
            })
    }, [])

    function renderGrid(contributions) {
        const grid = gridRef.current
        if (!grid) return

        const WEEKS = 52
        const DAYS = 7
        const TARGET = WEEKS * DAYS
        const data = contributions.slice(-TARGET)
        while (data.length < TARGET) {
            data.unshift({ date: '', count: 0, level: 0 })
        }

        grid.innerHTML = ''
        const fragment = document.createDocumentFragment()
        data.forEach((item) => {
            const cell = document.createElement('div')
            cell.className = 'heatmap-cell'
            cell.setAttribute('data-level', Math.min(item.level, 4))

            let tooltip
            if (item.date) {
                const d = new Date(item.date + 'T00:00:00')
                const dateStr = d.toLocaleDateString('en-US', {
                    month: 'short', day: 'numeric', year: 'numeric',
                })
                tooltip = item.count > 0
                    ? `${item.count} contribution${item.count > 1 ? 's' : ''} on ${dateStr}`
                    : `No contributions on ${dateStr}`
            } else {
                tooltip = 'No data'
            }
            cell.setAttribute('data-tooltip', tooltip)
            fragment.appendChild(cell)
        })
        grid.appendChild(fragment)

        const totalContributions = data.reduce((sum, d) => sum + d.count, 0)
        let currentStreak = 0
        for (let i = data.length - 1; i >= 0; i--) {
            if (data[i].count > 0) currentStreak++
            else break
        }
        let longestStreak = 0
        let tempStreak = 0
        for (const d of data) {
            if (d.count > 0) { tempStreak++; longestStreak = Math.max(longestStreak, tempStreak) }
            else tempStreak = 0
        }

        setStats({ total: totalContributions, current: currentStreak, longest: longestStreak })
    }

    // Animate counters on scroll into view
    useEffect(() => {
        if (animated) return
        const section = document.getElementById('github-activity')
        if (!section) return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setAnimated(true)
                        observer.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.2 }
        )
        observer.observe(section)
        return () => observer.disconnect()
    }, [animated])

    useEffect(() => {
        if (!animated) return
        const duration = 1500
        const start = performance.now()
        function step(now) {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setDisplayStats({
                total: Math.floor(eased * stats.total),
                current: Math.floor(eased * stats.current),
                longest: Math.floor(eased * stats.longest),
            })
            if (progress < 1) requestAnimationFrame(step)
            else setDisplayStats(stats)
        }
        requestAnimationFrame(step)
    }, [animated, stats])

    return (
        <section id="github-activity" className="section">
            <div className="bg-glow right"></div>
            <div className="container">
                <div className="card heatmap-wrapper" ref={wrapperRef}>
                    <div className="heatmap-header">
                        <div className="heatmap-title">
                            <h3>COMMITMENT TO GROWTH</h3>
                            <span className="heatmap-subtitle">ACTIVITY LOG / YEAR 2025</span>
                        </div>
                        <div className="heatmap-stats">
                            <div>
                                <div className="heatmap-stat-number">{displayStats.total}</div>
                                <div className="heatmap-stat-label">COMMITS</div>
                            </div>
                            <div>
                                <div className="heatmap-stat-number">{displayStats.current}</div>
                                <div className="heatmap-stat-label">CURRENT STREAK</div>
                            </div>
                            <div>
                                <div className="heatmap-stat-number">{displayStats.longest}</div>
                                <div className="heatmap-stat-label">LONGEST STREAK</div>
                            </div>
                        </div>
                    </div>
                    <div className="heatmap-months">
                        {Array.from({ length: 12 }, (_, i) => {
                            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                            return months[(new Date().getMonth() + 1 + i) % 12];
                        }).map((m, index) => (
                            <span key={`${m}-${index}`}>{m}</span>
                        ))}
                    </div>
                    <div className="heatmap-grid" ref={gridRef}></div>
                    <div className="heatmap-legend">
                        <span className="heatmap-legend-label">Less</span>
                        {[0, 1, 2, 3, 4].map((level) => (
                            <div key={level} className="heatmap-legend-square" data-level={level}></div>
                        ))}
                        <span className="heatmap-legend-label">More</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
