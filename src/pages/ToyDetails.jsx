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
            <h1>{name}</h1>
            {imgUrl && <img src={imgUrl} alt={name} />}
            <h5>Price: ${price.toLocaleString()}</h5>
            <p className={inStock ? 'in-stock' : 'out-of-stock'}>
                {inStock ? 'In stock' : 'Out of stock'}
            </p>
            <ul className="toy-labels clean-list flex">
                {labels.map(label => <li key={label}>{label}</li>)}
            </ul>
            <p>Added on: {new Date(createdAt).toLocaleDateString()}</p>
            {msgs && msgs.length > 0 && (
                <section className="toy-msgs">
                    <h4>Messages</h4>
                    <ul className="clean-list">
                        {msgs.map(msg =>
                            <li key={msg.id}><strong>{msg.by.fullname}:</strong> {msg.txt}</li>
                        )}
                    </ul>
                </section>
            )}
            <Link to={`/toy/edit/${_id}`}>Edit</Link> &nbsp;
            <Link to="/toy">Back</Link>

            <button className="btn-chat" title="Chat with us" onClick={() => setIsChatOpen(true)}>💬</button>
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
