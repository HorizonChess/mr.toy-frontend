import { Link, NavLink } from 'react-router-dom'

import { useOnlineStatus } from '../hooks/useOnlineStatus.js'

const LOGO_TXT = 'Mister Toy'

export function AppHeader() {
    const isOnline = useOnlineStatus()

    return (
        <header className="app-header main-layout">
            <section className="header-container">
                <h1 className="logo">
                    <Link to="/" aria-label={LOGO_TXT}>
                        {/* One span per letter so each can get its own color and bounce delay */}
                        {[...LOGO_TXT].map((char, idx) =>
                            <span key={idx} style={{ '--i': idx }} aria-hidden="true">{char}</span>
                        )}
                    </Link>
                </h1>
                <span className={`online-status status ${isOnline ? 'online' : 'offline'}`}>
                    {isOnline ? 'Online' : 'Offline'}
                </span>
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/toy" >Toys</NavLink>
                    <NavLink to="/toy-dashboard" >Toy Dashboard</NavLink>
                </nav>
            </section>
        </header>
    )
}
