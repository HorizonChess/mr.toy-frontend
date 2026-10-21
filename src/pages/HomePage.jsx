import { Link } from 'react-router-dom'

const HERO_BLOCKS = [...'MR.TOY']

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
                {/* The '.' is a small bouncing cube of its own, sitting like a period after "MR" */}
                {HERO_BLOCKS.map((char, idx) => char === '.'
                    ? <span key={idx} className="dot" style={{ '--i': idx }}></span>
                    : <span key={idx} style={{ '--i': idx }}>{char}</span>
                )}
            </div>
        </section>
    )
}
