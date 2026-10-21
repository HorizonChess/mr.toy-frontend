export function ToyPreview({ toy }) {
    const { name, imgUrl, price, inStock } = toy

    return (
        <article className="toy-preview">
            {/* Always rendered, so cards without an image keep the same rows */}
            <div className="toy-img">
                {imgUrl && <img src={imgUrl} alt={name} />}
            </div>
            <h4>{name}</h4>
            <p className="toy-price">${price.toLocaleString()}</p>
            <p className={`pill with-dot ${inStock ? 'in-stock' : 'out-of-stock'}`}>
                {inStock ? 'In stock' : 'Out of stock'}
            </p>
        </article>
    )
}
