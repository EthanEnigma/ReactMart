import type { ProductProps } from '../data/Products';

interface ProductCardProps {
    product: ProductProps;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="product-card">
            <img src={product.images} alt={product.name} className="product-image"/>
            <h3 className="product-name">{product.name}</h3>
            <h3 className="product-category">{product.category}</h3>
            <h3 className="product-stock">{product.stock}</h3>
            <h3 className="product-description">{product.description}</h3>
            <h3 className="product-rating">Rating: {product.rating}</h3>
            <h3 className="product-reviews">{product.reviews}</h3>
            <h3 className="product-tags">{product.tags}</h3>
            <h3 className="product-price">{product.price} €</h3>
            <button onClick={() => alert(`You bought ${product.name}`) } disabled={product.stock <= 0}>
            {product.stock - 1}
            </button>
        </div>
    );
}
