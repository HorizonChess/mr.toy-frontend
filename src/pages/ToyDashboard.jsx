import { useEffect, useState } from 'react'

import { toyService } from '../services/toy.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'

import { ToyPriceChart } from '../cmps/ToyPriceChart.jsx'
import { ToyInStockChart } from '../cmps/ToyInStockChart.jsx'

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

    return (
        <section className="toy-dashboard">
            <h2>Dashboard</h2>
            <section className="charts">
                <ToyPriceChart stats={stats} />
                <ToyInStockChart stats={stats} />
            </section>
        </section>
    )
}
