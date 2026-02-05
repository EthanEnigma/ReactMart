import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { ProductProps } from "../data/Products";
import type { CartItems } from "./Cart";

export type FavoriteItems = ProductProps;

export default function Favorites() {
    const favorite_key = "favorites";
    const cart_key = "cart";

    const [favorites, setFavorites] = useState<FavoriteItems[]>([]);
    const [cart, setCart] = useState<CartItems[]>([]);

    // Charger les favoris
    useEffect(() => {
        const savedFavorites = localStorage.getItem(favorite_key);
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }
    }, []);

    // Charger le panier pour pouvoir tester si un produit est déjà dedans
    useEffect(() => {
        const savedCart = localStorage.getItem(cart_key);
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    function removeFavorite(id: number) {
        const updated = favorites.filter((product) => product.id !== id);
        setFavorites(updated);
        localStorage.setItem(favorite_key, JSON.stringify(updated));
    }

    function isInCart(id: number) {
        return cart.some((item: any) => item.product.id === id);
    }

    function addToCart(product: ProductProps) {
        const updated = [...cart, { product, quantity: 1 }];
        setCart(updated);
        localStorage.setItem(cart_key, JSON.stringify(updated));
    }

    return (
        <div className="min-h-screen w-screen bg-gradient-to-t from-red-50 to-stone-50">
            <head>
                <title>ReactMart • Favoris</title>
            </head>

            {/* HEADER */}
            <header className="z-1 relative p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 drop-shadow-lg/30">
                <div className="absolute inset-0 bg-[url(/src/data/images/LeafBackground.jpg)] bg-center grayscale"></div>
                <div className="absolute inset-0 bg-[#DABEB6]/70"></div>
                <h1 className="z-2 text-white font-bold text-xl mx-5 text-shadow-lg">ReactMart - Favoris</h1>

                <nav className="z-2 flex gap-4 mx-5">
                    <Link to="/" className="bg-[#EED0C6] px-3 py-2 rounded-md hover:scale-110 duration-100"><p className="text-white">Boutique</p></Link>
                    <Link to="/favorites" className="bg-[#EED0C6] px-3 py-2 rounded-md hover:scale-110 duration-100"><p className="text-white">Favoris</p></Link>
                    <Link to="/cart" className="bg-[#EED0C6] px-3 py-2 rounded-md hover:scale-110 duration-100"><p className="text-white">Panier</p></Link>
                </nav>
            </header>

            {/* CONTENT */}
            <div className="p-6">
                <h2 className="text-3xl text-center mb-6 text-black">Vos Favoris ⭐</h2>

                {favorites.length === 0 ? (
                    <p className="text-center text-lg text-gray-600 text-black">
                        Aucun article en favori pour le moment.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
                        {favorites.map((product) => (
                            <div key={product.id} className="bg-white p-4 rounded-md drop-shadow-md">

                                <img src={product.images} className="w-full rounded-md" />

                                <h3 className="mt-2 text-lg font-bold text-center">
                                    {product.name}
                                </h3>

                                <p className="text-sm text-gray-600 mb-2">{product.description}</p>

                                <p className="font-bold">{product.price}€</p>

                                <div className="flex flex-col gap-2 mt-3">

                                    {isInCart(product.id) ? (
                                        <Link
                                            to="/cart"
                                            className="bg-[#7A8D9B] !text-white px-4 py-2 rounded-md text-center"
                                        >
                                            Voir le panier
                                        </Link>
                                    ) : (
                                        <button
                                            onClick={() => addToCart(product)}
                                            className="bg-[#7A8D9B] !text-white px-4 py-2 rounded-md"
                                        >
                                            Ajouter au panier
                                        </button>
                                    )}

                                    <button
                                        onClick={() => removeFavorite(product.id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                                    >
                                        Retirer des favoris
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* FOOTER */}
            <div className="relative flex w-full h-50 items-center justify-center mt-auto">
                <div className="absolute inset-0 bg-[url(/src/data/images/LeafBackground.jpg)] bg-center grayscale"></div>
                <div className="absolute inset-0 bg-[#DABEB6]/70"></div>
                <h2 className="relative text-4xl text-center text-white drop-shadow-md/25">
                    © ReactMart • Tout droit réservé
                </h2>
            </div>
        </div>
    );
}
