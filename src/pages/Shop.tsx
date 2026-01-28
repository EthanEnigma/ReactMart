import { useState } from "react"
import { Link } from "react-router-dom"
import type { ProductProps } from "../data/Products";

export default function Shop() {
    const [product, setProduct] = useState<ProductProps>();
    return (
        <div className="flex flex-col h-screen w-screen" id="document">

            {/* HEADER */}
            <div className="bg-[#7A8D9B] w-full p-4 flex justify-between items-center" id="header">
                <h1 className="text-white font-bold text-xl">Shop</h1>
                <nav className="flex gap-4">
                    <Link className="text-white hover:underline" to="/">Home</Link>
                    <Link className="text-white hover:underline" to="/Cart">Cart</Link>
                </nav>
            </div>

            {/* CONTENT */}
            <div className="flex-1 overflow-auto p-4 w-full" id="body">
                <div className="grid grid-cols-2 gap-4" id="productsContainer">
                    { }
                    <div className="bg-white text-black p-4 shadown rounded-ml" id="product">
                        <h1>Product</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}