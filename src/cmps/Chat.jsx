import { useState, useEffect, useRef } from 'react'

import { utilService } from '../services/util.service.js'

const AUTO_REPLIES = [
    'Thanks for reaching out! We will get back to you soon.',
    'Great question! Let me check that for you.',
    'This toy is one of our best sellers!',
    'Anything else I can help you with?',
]

export function Chat() {
    const [msgs, setMsgs] = useState([])
    const [txt, setTxt] = useState('')
    const timeoutIdsRef = useRef([])

    useEffect(() => {
        return () => timeoutIdsRef.current.forEach(clearTimeout)
    }, [])

    function onSendMsg(ev) {
        ev.preventDefault()
        if (!txt.trim()) return

        addMsg(txt, 'me')
        setTxt('')

        const timeoutId = setTimeout(() => {
            const reply = AUTO_REPLIES[utilService.getRandomIntInclusive(0, AUTO_REPLIES.length - 1)]
            addMsg(reply, 'shop')
        }, 1500)
        timeoutIdsRef.current.push(timeoutId)
    }

    function addMsg(txt, by) {
        const msg = { id: utilService.makeId(), txt, by }
        setMsgs(prevMsgs => [...prevMsgs, msg])
    }

    return (
        <section className="chat">
            <ul className="msg-list clean-list">
                {msgs.map(msg =>
                    <li key={msg.id} className={`msg ${msg.by}`}>{msg.txt}</li>
                )}
            </ul>
            <form onSubmit={onSendMsg}>
                <input type="text"
                    placeholder="Type a message..."
                    value={txt}
                    onChange={ev => setTxt(ev.target.value)}
                    autoFocus
                />
                <button>Send</button>
            </form>
        </section>
    )
}
