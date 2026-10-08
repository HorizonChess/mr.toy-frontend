import { Link } from 'react-router-dom'

export function HomePage() {

    return (
        <section className="home-page">
            <h2>Welcome to Mister Toy</h2>
            <p>The best toys in town, for kids of all ages.</p>
            <Link to="/toy">Browse our toys</Link>
        </section>
    )
}
