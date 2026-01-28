import type { ProductsProps } from "../data/Products";

interface PanierProps {
    products: ProductsProps[];
    onUpdateQuantity: (id: number, delta: number) => void;
    onRemove: (id: number) => void;
}

export default function Cart({ products, onUpdateQuantity, onRemove }: PanierProps) {
    return (
        <div className="cart">
            <h1>Your Shopping Cart</h1>
            {products.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    {products.map(product => (
                        <div key={product.id} className="cart-item">
                            <p>{product.name}</p>
                            <p>Price: {product.price} €</p>
                            <p>Quantity: {product.quantity}</p>
                            <button onClick={() => onUpdateQuantity(product.id, 1)} disabled={product.quantity <= 0}>+</button>
                            <button onClick={() => onUpdateQuantity(product.id, -1)} disabled={product.quantity <= 1}>-</button>
                            <button onClick={() => onRemove(product.id)}>Remove</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}