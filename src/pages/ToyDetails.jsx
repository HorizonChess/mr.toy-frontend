import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { toyService } from '../services/toy.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToy(toy))
            .catch(err => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Cannot load toy')
                navigate('/toy')
            })
    }

    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details">
            <h1>{toy.name}</h1>
            {toy.imgUrl && <img src={toy.imgUrl} alt={toy.name} />}
            <h5>Price: ${toy.price.toLocaleString()}</h5>
            <p className={toy.inStock ? 'in-stock' : 'out-of-stock'}>
                {toy.inStock ? 'In stock' : 'Out of stock'}
            </p>
            <ul className="toy-labels clean-list flex">
                {toy.labels.map(label => <li key={label}>{label}</li>)}
            </ul>
            <p>Added on: {new Date(toy.createdAt).toLocaleDateString()}</p>
            <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;
            <Link to="/toy">Back</Link>
        </section>
    )
}
