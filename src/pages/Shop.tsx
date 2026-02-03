import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Products from "../data/Products";
import type { ProductProps } from "../data/Products";
import type { CartItems } from "./Cart";
import type { FavoriteItems } from "./Favorites";

export default function Shop() {
    const [products, setProducts] = useState<ProductProps[]>([]);
    const [activeCategory, setActiveCategory] = useState<string>("All");
    const [cart, setCart] = useState<CartItems[]>([]);
    const [isInit, setIsInit] = useState<boolean>(false); // init du cart
    const [favorite, setFavorite] = useState<FavoriteItems[]>([]);

    const cart_key: string = "cart";
    const favorite_key: string = "favorites";

    // Charger les produits
    useEffect(() => {
        setProducts(Products)
    }, [])

    // Charger le panier
    useEffect(() => {
        const savedCart = localStorage.getItem(cart_key);
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
        setIsInit(true);
    }, []);

    // Sync le panier vers localstorage
    useEffect(() => {
        if (!isInit) return;
        localStorage.setItem(cart_key, JSON.stringify(cart));
    }, [cart, isInit]);

    useEffect(() => {
        const savedFavorites = localStorage.getItem(favorite_key);
        if (savedFavorites) {
            setFavorite(JSON.parse(savedFavorites));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(favorite_key, JSON.stringify(favorite));
    }, [favorite]);

    function addToCart(product: ProductProps) {
        setCart((prevCart) => [
            ...prevCart,
            { product, quantity: 1 }
        ]);
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
        return favorite.some((item) => item.id == productId);
    }

    function toggleFavorite(product: ProductProps) {
        setFavorite((prev) => {
            if (prev.some((item) => item.id === product.id)) {
                return prev.filter((item) => item.id !== product.id);
            }
            return [...prev, product];
        })
    }

    function setFilter(category: string) {
        setActiveCategory(category)

        if (category === "All") {
            setProducts(Products)
        } else {
            const filtered = Products.filter(
                (product) => product.category === category
            )
            setProducts(filtered)
        }
    }

    return (
        <div className="min-h-screen w-screen bg-gray-300 overflow-y-hidden" id="document">
            <head>
                <title>ReactMart • Shop</title>
            </head>

            {/* HEADER */}
            <header className="z-1 relative p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 drop-shadow-lg/30">
                <div className="absolute inset-0 bg-[url(/src/data/images/LeafBackground.jpg)] bg-center grayscale"></div>
                <div className="absolute inset-0 bg-[#DABEB6]/70"></div>
                <h1 className="z-2 text-white font-bold text-xl text-center mx-5 sm:text-left text-shadow-lg">ReactMart - Shop</h1>
                <nav className="z-2 flex justify-center sm:justify-end gap-4 mx-5">
                    <Link to="/" className="bg-[#EED0C6] px-3 py-2 rounded-md hover:scale-110 duration-100"><p className="text-white">Shop</p></Link>
                    <Link to="/cart" className="bg-[#EED0C6] px-3 py-2 rounded-md hover:scale-110 duration-100"><p className="text-white">Cart</p></Link>
                </nav>
            </header>

            {/* CONTENT */}
            <div id="body" className="flex flex-col overflow-auto p-4 bg-gradient-to-t from-red-50 to-stone-50">
                <h2 className="text-3xl text-black text-center mt-5">Catégories :</h2>
                <div className="text-center mb-5">
                    <button onClick={() => setFilter("All")} className={`px-5 py-2 m-1 rounded-md duration-150 ${activeCategory === "All" ? "!bg-[#EED0C6] !border-solid !border-2 !border-[#DABEB6]" : "!bg-[#7A8D9B]"}`}>Tout</button>
                    <button onClick={() => setFilter("Décoration")} className={`px-5 py-2 m-1 rounded-md duration-150 ${activeCategory === "Décoration" ? "!bg-[#EED0C6] !border-solid !border-2 !border-[#DABEB6]" : "!bg-[#7A8D9B]"}`}>Décoration</button>
                    <button onClick={() => setFilter("Maison")} className={`px-5 py-2 m-1 rounded-md duration-150 ${activeCategory === "Maison" ? "!bg-[#EED0C6] !border-solid !border-2 !border-[#DABEB6]" : "!bg-[#7A8D9B]"}`}>Maison</button>
                    <button onClick={() => setFilter("Cuisine")} className={`px-5 py-2 m-1 rounded-md duration-150 ${activeCategory === "Cuisine" ? "!bg-[#EED0C6] !border-solid !border-2 !border-[#DABEB6]" : "!bg-[#7A8D9B]"}`}>Cuisine</button>
                    <button onClick={() => setFilter("Art")} className={`px-5 py-2 m-1 rounded-md duration-150 ${activeCategory === "Art" ? "!bg-[#EED0C6] !border-solid !border-2 !border-[#DABEB6]" : "!bg-[#7A8D9B]"}`}>Art</button>
                    <button onClick={() => setFilter("Papeterie")} className={`px-5 py-2 m-1 rounded-md duration-150 ${activeCategory === "Papeterie" ? "!bg-[#EED0C6] !border-solid !border-2 !border-[#DABEB6]" : "!bg-[#7A8D9B]"}`}>Papeterie</button>
                    <button onClick={() => setFilter("Mode")} className={`px-5 py-2 m-1 rounded-md duration-150 ${activeCategory === "Mode" ? "!bg-[#EED0C6] !border-solid !border-2 !border-[#DABEB6]" : "!bg-[#7A8D9B]"}`}>Mode</button>
                    <button onClick={() => setFilter("Accessoires")} className={`px-5 py-2 m-1 rounded-md duration-150 ${activeCategory === "Accessoires" ? "!bg-[#EED0C6] !border-solid !border-2 !border-[#DABEB6]" : "!bg-[#7A8D9B]"}`}>Accessoires</button>
                    <button onClick={() => setFilter("Bijoux")} className={`px-5 py-2 m-1 rounded-md duration-150 ${activeCategory === "Bijoux" ? "!bg-[#EED0C6] !border-solid !border-2 !border-[#DABEB6]" : "!bg-[#7A8D9B]"}`}>Bijoux</button>
                </div>
                <div id="productsContainer" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
                    {/* Product Cards */}
                    {products.map((product) => (
                        <div key={product.id} className="relative bg-white text-black p-4 my-3 drop-shadow-md/25 rounded-md overflow-hidden hover:scale-102 duration-150">
                            <div className="relative flex justify-center h-50 w-full bg-gradient-to-b from-gray-100 to-[#EED0C6] rounded-md">
                                <p className="absolute left-0 top-0 text-white opacity-90 bg-[#cccccc] px-3 py-1 m-2 rounded-md">{product.category}</p>
                                <div className="absolute right-0 top-0">
                                    <a onClick={() => toggleFavorite(product)} className="text-3xl m-2 !text-yellow-500 hover:cursor-pointer">
                                        {isInFavorite(product.id) ? "★" : "☆"}
                                    </a>
                                </div>
                                <p className="absolute right-0 bottom-0 text-white bg-[#DABEB6] px-3 py-1 m-2 rounded-md">{product.price}€</p>
                                <img src={product.images} className="max-w-full" />
                            </div>
                            <hr className="border-solid border-black border-1 rounded-md my-3" />
                            {/* Card Content */}
                            <div className="h-fit min-h-25 w-full">
                                <h2 className="text-xl text-center mb-2">{product.name}</h2>
                                <p className="text-sm text-[#B2B9BF] mb-2">{product.description}</p>
                            </div>
                            {/* Card Buttons */}
                            {isInCart(product.id) ? (
                                <div className="flex flex-col gap-1 w-fit">
                                    <Link to="/Cart" className="!text-white bg-[#7A8D9B] px-5 py-2 rounded-full hover:bg-green-300 hover:cursor-pointer duration-150"><p className="text-white">Voir le panier</p></Link>
                                    <a onClick={() => RemoveFromCart(product.id)} className="!text-white bg-red-500 px-5 py-2 rounded-full hover:opacity-60 hover:cursor-pointer duration-150">Retirer du panier</a>
                                </div>
                            )
                                : (
                                    <div className="flex flex-col gap-1 w-fit">
                                        <a onClick={() => addToCart(product)} className="!text-white bg-[#7A8D9B] px-5 py-2 rounded-full hover:bg-green-300 hover:cursor-pointer duration-150">Ajouter au panier</a>
                                    </div>
                                )
                            }
                            <p id="quantity" className="text-sm my-3"></p>
                        </div>
                    ))}
                </div>
            </div >

            {/* FOOTER */}
            <div className="relative flex w-full h-50 items-center justify-center">
                <div className="absolute inset-0 bg-[url(/src/data/images/LeafBackground.jpg)] bg-center grayscale"></div>
                <div className="absolute inset-0 bg-[#DABEB6]/70"></div>
                <h2 className="relative text-4xl text-center text-white drop-shadow-md/25">© ReactMart • Tout droit réservé</h2>
            </div>

        </div >
    )
}