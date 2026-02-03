import { Link } from "react-router";
import type { ProductProps } from '../data/Products';
import { useEffect, useState } from "react";

export interface CartItems {
    product: ProductProps;
    quantity: number;
}
export default function Cart() {
    const [cart, setCart] = useState<CartItems[]>([]);
    const [isInit, setIsInit] = useState<boolean>(false);
    
    useEffect(() => {
        const saved = localStorage.getItem('cart');
        if (saved) {
            setCart(JSON.parse(saved));
        }
        setIsInit(true);
    }, []);

    useEffect(() => {
        if (!isInit) return;
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart, isInit]);


    const handleUpdateQuantity = (id: number, delta: number) => {
        setCart(prev => prev.map(item => item.product.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) }: item)
        );
    };

    const handleRemove = (id: number) => {
        setCart(prev => prev.filter(item => item.product.id !== id));
    };

    const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    return (
        <div>
            <h1>Shopping Cart</h1>
            <Link to="/shop">Page Shop</Link>
            <div className="cart">
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div>
                        {cart.map(({product, quantity }) => (
                            <div key={product.id} className="cart-item">
                                <img src={product.images} alt={product.name} className="cart-product-image" />
                                <p>{product.name}</p>
                                <p>Price: {product.price} €</p>
                                <p>Quantity: {quantity}</p>
                                <button onClick={() => handleUpdateQuantity(product.id, 1)} disabled={product.stock <= 0}>+</button>
                                <button onClick={() => handleUpdateQuantity(product.id, -1)} disabled={product.stock <= 1}>-</button>
                                <button onClick={() => handleRemove(product.id)}>Remove</button>
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
