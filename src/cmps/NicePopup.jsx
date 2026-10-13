import { useEffect } from 'react'

export function NicePopup({ isOpen, onClose, heading, footing, children }) {

    useEffect(() => {
        if (!isOpen) return

        function handleKeyDown(ev) {
            if (ev.key === 'Escape') onClose()
        }

        document.body.addEventListener('keydown', handleKeyDown)

        return () => {
            document.body.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen])

    if (!isOpen) return null
    return (
        <section className="nice-popup-backdrop" onClick={onClose}>
            <section className="nice-popup" onClick={ev => ev.stopPropagation()}>
                <header>
                    <h3>{heading}</h3>
                    <button className="btn-close" onClick={onClose}>x</button>
                </header>
                <main>
                    {children}
                </main>
                <footer>
                    {footing}
                </footer>
            </section>
        </section>
    )
}
