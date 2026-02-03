import { Link } from "react-router";
import type { ProductProps } from '../data/Products';

export interface CartItems {
    product: ProductProps;
    quantity: number;
}
interface PanierProps {
    products: ProductProps[];
    onUpdateQuantity: (id: number, delta: number) => void;
    onRemove: (id: number) => void;
}

export default function Cart({ products, onUpdateQuantity, onRemove }: PanierProps) {
    const total = products.reduce((sum, product) => sum + (product.price * product.stock), 0);
    return (
        <div>
            <h1>Shopping Cart</h1>
            <Link to="/shop">Page Shop</Link>
            <div className="cart">
                {products.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div>
                        {products.map(product => (
                            <div key={product.id} className="cart-item">
                                <img src={product.images} alt={product.name} className="cart-product-image" />
                                <p>{product.name}</p>
                                <p>Price: {product.price} €</p>
                                <p>Quantity: {product.stock}</p>
                                <button onClick={() => onUpdateQuantity(product.id, 1)} disabled={product.stock <= 0}>+</button>
                                <button onClick={() => onUpdateQuantity(product.id, -1)} disabled={product.stock <= 1}>-</button>
                                <button onClick={() => onRemove(product.id)}>Remove</button>
                            </div>
                        ))}
                        <div className="cart-total">
                            <h2>Total: {total.toFixed(2)} €</h2>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}