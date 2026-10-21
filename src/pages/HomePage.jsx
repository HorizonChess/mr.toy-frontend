import { Link } from 'react-router-dom'

const HERO_BLOCKS = ['T', 'O', 'Y', 'S', '!', '★']

export function HomePage() {

    return (
        <section className="home-page">
            <div className="hero-txt">
                <h2>Welcome to <span>Mister Toy</span></h2>
                <p>The best toys in town, for kids of all ages.</p>
                <Link to="/toy" className="btn">Browse our toys</Link>
            </div>

            {/* Decorative toy blocks */}
            <div className="hero-blocks" aria-hidden="true">
                {HERO_BLOCKS.map((char, idx) =>
                    <span key={idx} style={{ '--i': idx }}>{char}</span>
                )}
            </div>
        </section>
    )
}
