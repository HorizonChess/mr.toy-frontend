import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

export function ToyInStockChart({ stats }) {
    const data = {
        labels: stats.map(stat => stat.label),
        datasets: [
            {
                label: 'In stock (%)',
                data: stats.map(stat => stat.inStockPct),
                backgroundColor: '#ee9b00', // --clr2bg
            },
        ],
    }

    // Each label's % is independent (they don't add up to 100), so a fixed 0-100% bar axis, not a pie
    const options = {
        indexAxis: 'y',
        scales: {
            x: { min: 0, max: 100, ticks: { callback: value => value + '%' } },
        },
    }

    return (
        <section className="chart-card">
            <h3>Inventory by label</h3>
            <Bar data={data} options={options} />
        </section>
    )
}
