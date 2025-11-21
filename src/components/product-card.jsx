export default function ProductCard(props) {
    
    return (
        <div className="bg-white shadow-lg rounded-2xl p-5 max-w-xs hover:shadow-2xl transition-shadow duration-300">
            <h1>{props.name}</h1>
            <p>{props.description}</p>
            <p>{props.price}</p>
            <button>Add to Cart</button>
        </div>
    )
}