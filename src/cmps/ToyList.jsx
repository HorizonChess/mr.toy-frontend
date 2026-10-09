import { Link } from 'react-router-dom'

import { ToyPreview } from './ToyPreview.jsx'

export function ToyList({ toys, onRemoveToy }) {

    if (!toys.length) return <p>No toys to show</p>
    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <li key={toy._id}>
                    <ToyPreview toy={toy} />

                    <div className="toy-actions">
                        <Link to={`/toy/${toy._id}`}>Details</Link> &nbsp; | &nbsp;
                        <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
                        <button onClick={() => onRemoveToy(toy._id)}>x</button>
                    </div>
                </li>)}
        </ul>
    )
}
