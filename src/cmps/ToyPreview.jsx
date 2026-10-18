export function ToyPreview({ toy }) {
    const { name, imgUrl, price, inStock } = toy

    return (
        <article className="toy-preview">
            <h4>{name}</h4>
            {imgUrl && <img src={imgUrl} alt={name} />}
            <p>Price: <span>${price.toLocaleString()}</span></p>
            <p className={inStock ? 'in-stock' : 'out-of-stock'}>
                {inStock ? 'In stock' : 'Out of stock'}
            </p>
        </article>
    )
}
