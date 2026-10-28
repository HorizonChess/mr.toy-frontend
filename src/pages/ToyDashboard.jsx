import { useEffect, useState } from 'react'
import { Chart as ChartJS } from 'chart.js'

import { toyService } from '../services/toy.service.js'
import { utilService } from '../services/util.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'

import { ToyPriceChart } from '../cmps/ToyPriceChart.jsx'
import { ToyInStockChart } from '../cmps/ToyInStockChart.jsx'
import { ToySalesChart } from '../cmps/ToySalesChart.jsx'

// Chart text matches the app's font and text color
ChartJS.defaults.font.family = utilService.getCssVar('--ff-body')
ChartJS.defaults.color = utilService.getCssVar('--clr-text')

export function ToyDashboard() {
    const [stats, setStats] = useState(null)

    useEffect(() => {
        async function loadStats() {
            try {
                const stats = await toyService.getStats()
                setStats(stats)
            } catch (err) {
                console.log('Had issues loading stats', err)
                showErrorMsg('Cannot load stats')
            }
        }
        loadStats()
    }, [])

    if (!stats) return <div>Loading...</div>

    return (
        <section className="toy-dashboard">
            <h2>Dashboard</h2>
            <section className="charts">
                <ToyPriceChart stats={stats} />
                <ToyInStockChart stats={stats} />
                <ToySalesChart />
            </section>
        </section>
    )
}
