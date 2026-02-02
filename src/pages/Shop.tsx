import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Products from "../data/Products";
import type { ProductProps } from "../data/Products";

export default function Shop() {
    const [products, setProducts] = useState<ProductProps[]>([]);
    const [activeCategory, setActiveCategory] = useState<string>("All");

    useEffect(() => {
        setProducts(Products)
    }, [])

    function Filter(category: string) {
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
                    <Link to="/Cart" className="bg-[#EED0C6] px-3 py-2 rounded-md hover:scale-110 duration-100"><p className="text-white">Cart</p></Link>
                </nav>
            </header>

            {/* CONTENT */}
            <div id="body" className="flex flex-col overflow-auto p-4">
                <h2 className="text-3xl text-black text-center mt-5">Catégories :</h2>
                <div className="text-center mb-5">
                    <button onClick={() => Filter("All")} className={`px-5 py-2 m-1 rounded-md duration-150 ${activeCategory === "All" ? "!bg-[#EED0C6] !border-solid !border-2 !border-[#DABEB6]" : "!bg-[#7A8D9B]"}`}>Tout</button>
                    <button onClick={() => Filter("Décoration")} className={`px-5 py-2 m-1 rounded-md duration-150 ${activeCategory === "Décoration" ? "!bg-[#EED0C6] !border-solid !border-2 !border-[#DABEB6]" : "!bg-[#7A8D9B]"}`}>Décoration</button>
                    <button onClick={() => Filter("Maison")} className={`px-5 py-2 m-1 rounded-md duration-150 ${activeCategory === "Maison" ? "!bg-[#EED0C6] !border-solid !border-2 !border-[#DABEB6]" : "!bg-[#7A8D9B]"}`}>Maison</button>
                    <button onClick={() => Filter("Cuisine")} className={`px-5 py-2 m-1 rounded-md duration-150 ${activeCategory === "Cuisine" ? "!bg-[#EED0C6] !border-solid !border-2 !border-[#DABEB6]" : "!bg-[#7A8D9B]"}`}>Cuisine</button>
                    <button onClick={() => Filter("Art")} className={`px-5 py-2 m-1 rounded-md duration-150 ${activeCategory === "Art" ? "!bg-[#EED0C6] !border-solid !border-2 !border-[#DABEB6]" : "!bg-[#7A8D9B]"}`}>Art</button>
                    <button onClick={() => Filter("Papeterie")} className={`px-5 py-2 m-1 rounded-md duration-150 ${activeCategory === "Papeterie" ? "!bg-[#EED0C6] !border-solid !border-2 !border-[#DABEB6]" : "!bg-[#7A8D9B]"}`}>Papeterie</button>
                    <button onClick={() => Filter("Mode")} className={`px-5 py-2 m-1 rounded-md duration-150 ${activeCategory === "Mode" ? "!bg-[#EED0C6] !border-solid !border-2 !border-[#DABEB6]" : "!bg-[#7A8D9B]"}`}>Mode</button>
                    <button onClick={() => Filter("Accessoires")} className={`px-5 py-2 m-1 rounded-md duration-150 ${activeCategory === "Accessoires" ? "!bg-[#EED0C6] !border-solid !border-2 !border-[#DABEB6]" : "!bg-[#7A8D9B]"}`}>Accessoires</button>
                    <button onClick={() => Filter("Bijoux")} className={`px-5 py-2 m-1 rounded-md duration-150 ${activeCategory === "Bijoux" ? "!bg-[#EED0C6] !border-solid !border-2 !border-[#DABEB6]" : "!bg-[#7A8D9B]"}`}>Bijoux</button>
                </div>
                <div id="productsContainer" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white text-black p-4 my-3 drop-shadow-md/25 rounded-md overflow-hidden hover:scale-102 duration-150">
                            <div className="relative flex justify-center h-50 w-full bg-gradient-to-b from-gray-100 to-[#EED0C6] rounded-md">
                                <p className="absolute left-0 top-0 text-white opacity-90 bg-[#cccccc] px-3 py-1 m-2 rounded-md">{product.category}</p>
                                <p className="absolute right-0 bottom-0 text-white bg-[#DABEB6] px-3 py-1 m-2 rounded-md">{product.price}€</p>
                                <img src={product.images} className="max-w-full" />
                            </div>
                            <hr className="border-solid border-black border-1 rounded-md my-3" />
                            <div className="h-25 w-full">
                                <h2 className="text-xl text-center mb-2">{product.name}</h2>
                                <p className="text-sm text-[#B2B9BF] mb-2">{product.description}</p>
                            </div>
                            <div className="" id="">

                            </div>
                            <a className="bg-[#7A8D9B] px-5 py-2 rounded-full hover:bg-green-300 hover:cursor-pointer duration-150"><span className="text-white">Ajouter au panier</span></a>
                            <p id="quantity" className="text-sm my-3"></p>
                        </div>
                    ))}
                </div>
            </div >

            {/* FOOTER */}
            <div className="relative flex w-full h-50 items-center justify-center">
                <div className="absolute inset-0 bg-[url(/src/data/images/LeafBackground.jpg)] bg-center grayscale"></div>
                <div className="absolute inset-0 bg-[#EED0C6]/70"></div>
                <h2 className="relative text-4xl text-center text-white">© ReactMart • Tout droit réservé</h2>
            </div>

        </div >
    )
}