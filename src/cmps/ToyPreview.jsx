export function ToyPreview({ toy }) {

    return (
        <article className="toy-preview">
            <h4>{toy.name}</h4>
            {toy.imgUrl && <img src={toy.imgUrl} alt={toy.name} />}
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <p className={toy.inStock ? 'in-stock' : 'out-of-stock'}>
                {toy.inStock ? 'In stock' : 'Out of stock'}
            </p>
        </article>
    )
}
