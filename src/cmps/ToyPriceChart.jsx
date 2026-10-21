import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'

import { utilService } from '../services/util.service.js'

// Chart.js is tree-shakable: register only the pieces this chart uses
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

export function ToyPriceChart({ stats }) {
    // Chart.js wants parallel arrays: labels[i] goes with data[i]
    const data = {
        labels: stats.map(stat => stat.label),
        datasets: [
            {
                label: 'Average price ($)',
                data: stats.map(stat => stat.avgPrice),
                backgroundColor: utilService.getCssVar('--clr-primary'),
            },
        ],
    }

    return (
        <section className="chart-card">
            <h3>Average price per label</h3>
            <Bar data={data} />
        </section>
    )
}
