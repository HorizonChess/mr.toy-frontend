import { NavLink } from 'react-router-dom'

import { useOnlineStatus } from '../hooks/useOnlineStatus.js'

export function AppHeader() {
    const isOnline = useOnlineStatus()

    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>Mister Toy</h1>
                <span className={`online-status ${isOnline ? 'online' : 'offline'}`}>
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
