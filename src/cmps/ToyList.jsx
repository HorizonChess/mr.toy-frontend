import { Link } from 'react-router-dom'

import { ToyPreview } from './ToyPreview.jsx'

export function ToyList({ toys, onRemoveToy }) {

    if (!toys.length) return <p>No toys to show</p>
    return (
        <ul className="toy-list clean-list">
            {toys.map(toy =>
                <li key={toy._id} className="toy-card">
                    <ToyPreview toy={toy} />

                    <div className="toy-actions">
                        <Link to={`/toy/${toy._id}`} className="btn">Details</Link>
                        <Link to={`/toy/edit/${toy._id}`} className="btn btn-outline btn-secondary">Edit</Link>
                    </div>
                    <button
                        className="btn-remove btn-icon btn-outline btn-danger"
                        aria-label={`Remove ${toy.name}`}
                        onClick={() => onRemoveToy(toy._id)}
                    >✕</button>
                </li>)}
        </ul>
    )
}
