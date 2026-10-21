import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { toyService } from '../services/toy.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'

import { NicePopup } from '../cmps/NicePopup.jsx'
import { Chat } from '../cmps/Chat.jsx'

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const [isChatOpen, setIsChatOpen] = useState(false)
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
    const { _id, name, imgUrl, price, inStock, labels, createdAt, msgs } = toy
    return (
        <section className="toy-details">
            <div className="toy-img">
                {imgUrl && <img src={imgUrl} alt={name} />}
            </div>

            <section className="toy-info card">
                <h1>{name}</h1>
                <p className="toy-price">${price.toLocaleString()}</p>
                <p className={`pill with-dot ${inStock ? 'in-stock' : 'out-of-stock'}`}>
                    {inStock ? 'In stock' : 'Out of stock'}
                </p>
                <ul className="toy-labels clean-list">
                    {labels.map(label => <li key={label} className="pill">{label}</li>)}
                </ul>
                <p className="toy-date">Added on: {new Date(createdAt).toLocaleDateString()}</p>
                <div className="toy-actions">
                    <Link to={`/toy/edit/${_id}`} className="btn">Edit</Link>
                    <Link to="/toy" className="btn btn-outline btn-secondary">Back</Link>
                </div>
            </section>

            {msgs && msgs.length > 0 && (
                <section className="toy-msgs card">
                    <h4>Messages</h4>
                    <ul className="clean-list">
                        {msgs.map(msg =>
                            <li key={msg.id}><strong>{msg.by.fullname}:</strong> {msg.txt}</li>
                        )}
                    </ul>
                </section>
            )}

            <button className="btn-chat btn-icon" title="Chat with us" onClick={() => setIsChatOpen(true)}>💬</button>
            <NicePopup
                isOpen={isChatOpen}
                onClose={() => setIsChatOpen(false)}
                heading={`Chat about ${name}`}
                footing="We usually reply within seconds"
            >
                <Chat />
            </NicePopup>
        </section>
    )
}
