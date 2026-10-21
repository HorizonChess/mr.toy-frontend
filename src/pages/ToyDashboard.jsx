import { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'

import { toyService } from '../services/toy.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'

// Chart.js is tree-shakable: register only the pieces this page uses
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

export function ToyDashboard() {
    const [stats, setStats] = useState(null)

    useEffect(() => {
        loadStats()
    }, [])

    function loadStats() {
        toyService.getStats()
            .then(stats => setStats(stats))
            .catch(err => {
                console.log('Had issues loading stats', err)
                showErrorMsg('Cannot load stats')
            })
    }

    if (!stats) return <div>Loading...</div>

    // Chart.js wants parallel arrays: labels[i] goes with data[i]
    const pricesData = {
        labels: stats.map(stat => stat.label),
        datasets: [
            {
                label: 'Average price ($)',
                data: stats.map(stat => stat.avgPrice),
                backgroundColor: '#087f81', // --clr1 (canvas can't read CSS vars)
            },
        ],
    }

    return (
        <section className="toy-dashboard">
            <h2>Dashboard</h2>
            <section className="chart-card">
                <h3>Average price per label</h3>
                <Bar data={pricesData} />
            </section>
        </section>
    )
}
