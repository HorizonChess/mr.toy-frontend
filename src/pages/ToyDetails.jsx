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
            {toy.msgs && toy.msgs.length > 0 && (
                <section className="toy-msgs">
                    <h4>Messages</h4>
                    <ul className="clean-list">
                        {toy.msgs.map(msg =>
                            <li key={msg.id}><strong>{msg.by.fullname}:</strong> {msg.txt}</li>
                        )}
                    </ul>
                </section>
            )}
            <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;
            <Link to="/toy">Back</Link>

            <button className="btn-chat" title="Chat with us" onClick={() => setIsChatOpen(true)}>💬</button>
            <NicePopup
                isOpen={isChatOpen}
                onClose={() => setIsChatOpen(false)}
                heading={`Chat about ${toy.name}`}
                footing="We usually reply within seconds"
            >
                <Chat />
            </NicePopup>
        </section>
    )
}
