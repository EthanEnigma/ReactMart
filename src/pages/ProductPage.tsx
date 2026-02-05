import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Products from "../data/Products";
import type { ProductProps } from "../data/Products";
import type { CartItems } from "./Cart";
import type { FavoriteItems } from "./Favorites";

export default function ProductPage() {

    const [products, setProducts] = useState<ProductProps[]>([]);
    const [cart, setCart] = useState<CartItems[]>([]);
    const [isInit, setIsInit] = useState<boolean>(false); // init du cart
    const [favorite, setFavorite] = useState<FavoriteItems[]>([]);

    const cart_key: string = "cart";
    const favorite_key: string = "favorites";

    // Charger produits
    useEffect(() => {
        setProducts(Products)
    }, [])

    // Charger panier
    useEffect(() => {
        const savedCart = localStorage.getItem(cart_key);
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
        setIsInit(true);
    }, []);

    // Charger favoris
    useEffect(() => {
        const savedFavorites = localStorage.getItem(favorite_key);
        if (savedFavorites) {
            setFavorite(JSON.parse(savedFavorites));
        }
    }, []);

    // Sync le panier vers localstorage
    useEffect(() => {
        if (!isInit) return;
        localStorage.setItem(cart_key, JSON.stringify(cart));
    }, [cart, isInit]);

    // Sync favoris vers localstorage
    useEffect(() => {
        localStorage.setItem(favorite_key, JSON.stringify(favorite));
    }, [favorite]);


    function addToCart(product: ProductProps) {
        setCart((prevCart) => [...prevCart, { product, quantity: 1 }]);
    }

    function RemoveFromCart(productId: number) {
        setCart((prevCart) =>
            prevCart.filter((item) => item.product.id !== productId)
        );
    }

    function isInCart(productId: number) {
        return cart.some((item) => item.product.id === productId);
    }

    function isInFavorite(productId: number) {
        return favorite.some((item) => item.id === productId);
    }

    function toggleFavorite(product: ProductProps) {
        setFavorite((prev) => {
            if (prev.some((item) => item.id === product.id)) {
                return prev.filter((item) => item.id !== product.id);
            } else {
                return [...prev, product];
            }
        })
    }

    // Recup id via url
    const { id } = useParams<{ id: string }>();

    // Trouver produit
    const product: ProductProps | undefined = Products.find(
        (p) => p.id === Number(id)
    );

    // Si pas produit
    if (!product) {
        return <p>Produit introuvable</p>;
    }

    return (
        <div className="min-h-screen w-screen bg-gray-300 flex flex-col">
            <head>
                <title>ReactMart • Page Produit</title>
            </head>

            {/* HEADER */}
            <header className="z-1 relative p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 drop-shadow-lg/30">
                <div className="absolute inset-0 bg-[url(/src/data/images/LeafBackground.jpg)] bg-center grayscale"></div>
                <div className="absolute inset-0 bg-[#DABEB6]/70"></div>
                <h1 className="z-2 text-white font-bold text-xl text-center mx-5 sm:text-left text-shadow-lg">ReactMart - Page Produit</h1>
                <nav className="z-2 flex justify-center sm:justify-end gap-4 mx-5">
                    <Link to="/" className="bg-[#EED0C6] px-3 py-2 rounded-md hover:scale-110 duration-100"><p className="text-white">Boutique</p></Link>
                    <Link to="/favorites" className="bg-[#EED0C6] px-3 py-2 rounded-md hover:scale-110 duration-100"><p className="text-white">Favoris</p></Link>
                    <Link to="/cart" className="bg-[#EED0C6] px-3 py-2 rounded-md hover:scale-110 duration-100"><p className="text-white">Panier</p></Link>
                </nav>
            </header>

            {/* CONTENT */}
            <div className="flex flex-grow items-center justify-center px-4">
                {/* Product Cards */}
                <div key={product.id} className="relative bg-white text-black p-10 rounded-lg shadow-lg max-w-6xl mx-auto m-5">
                    {/* IMAGE + INFOS */}
                    <div className="flex flex-col lg:flex-row gap-8 items-center">

                        {/* IMAGE */}
                        <div className="relative w-full lg:w-1/2 h-[380px] bg-gradient-to-b from-gray-100 to-[#EED0C6] rounded-lg flex items-center justify-center overflow-hidden">
                            <p className="absolute left-0 top-0 text-white bg-[#cccccc]/90 px-3 py-1 m-2 rounded-md text-sm">
                                {product.category}
                            </p>

                            <div className="absolute right-0 top-0">
                                <a onClick={() => toggleFavorite(product)} className="text-3xl m-2 !text-yellow-500 hover:cursor-pointer">
                                    {isInFavorite(product.id) ? "★" : "☆"}
                                </a>
                                <p className="absolute right-3">{product.rating}</p>
                            </div>

                            <p className="absolute right-0 bottom-0 text-white bg-[#DABEB6] px-3 py-1 m-2 rounded-md">
                                {product.price} €
                            </p>

                            <img
                                src={product.images}
                                alt={product.name}
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>

                        {/* INFOS */}
                        <div className="w-full lg:w-1/2 flex flex-col gap-3">
                            <h2 className="text-3xl font-bold">{product.name}</h2>

                            <p className="text-gray-600 leading-relaxed">
                                <span className="font-semibold">Description :</span> {product.description}
                            </p>

                            <p><span className="font-semibold">Artisan :</span> {product.artisan}</p>
                            <p><span className="font-semibold">Avis :</span> {product.reviews}</p>
                            <p><span className="font-semibold">Stock :</span> {product.stock}</p>

                            <p>
                                <span className="font-semibold">Tags :</span>{" "}
                                {product.tags.join(", ")}
                            </p>

                            {/* BOUTONS */}
                            <div className="flex flex-wrap gap-4 mt-6">
                                {isInCart(product.id) ? (
                                    <>
                                        <div className="flex flex-col gap-1 w-fit">
                                            <Link to="/Cart" className="!text-white bg-[#7A8D9B] px-5 py-2 rounded-full hover:bg-green-300 hover:cursor-pointer duration-150"><p className="text-white">Voir le panier</p></Link>
                                            <a onClick={() => RemoveFromCart(product.id)} className="!text-white bg-red-500 px-5 py-2 rounded-full hover:opacity-60 hover:cursor-pointer duration-150">Retirer du panier</a>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-col gap-1 w-fit">
                                        <a onClick={() => addToCart(product)} className="!text-white bg-[#7A8D9B] px-5 py-2 rounded-full hover:bg-green-300 hover:cursor-pointer duration-150">Ajouter au panier</a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* FOOTER */}
            <div className="relative flex w-full h-50 items-center justify-center mt-auto">
                <div className="absolute inset-0 bg-[url(/src/data/images/LeafBackground.jpg)] bg-center grayscale"></div>
                <div className="absolute inset-0 bg-[#DABEB6]/70"></div>
                <h2 className="relative text-4xl text-center text-white drop-shadow-md/25">© ReactMart • Tout droit réservé</h2>
            </div>
        </div >
    );
}
