import { useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js'
import { Line } from 'react-chartjs-2'

import { utilService } from '../services/util.service.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

const DAY_MS = 24 * 60 * 60 * 1000

export function ToySalesChart({ days = 14 }) {
    // Demo data: lazy init so it's generated once, not on every re-render
    const [sales] = useState(() => _makeRandomSales(days))

    const data = {
        labels: sales.map(sale => new Date(sale.date).toLocaleDateString()),
        datasets: [
            {
                label: 'Toys sold (demo data)',
                data: sales.map(sale => sale.count),
                borderColor: '#ae2012', // --clr2
                backgroundColor: '#ae2012',
                tension: 0.3,
            },
        ],
    }

    return (
        <section className="chart-card">
            <h3>Daily sales</h3>
            <Line data={data} />
        </section>
    )
}

function _makeRandomSales(days) {
    const today = Date.now()
    return Array.from({ length: days }, (_, idx) => ({
        date: today - (days - 1 - idx) * DAY_MS,
        count: utilService.getRandomIntInclusive(5, 50),
    }))
}
