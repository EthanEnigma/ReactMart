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
    const [ordered, setOrdered] = useState<boolean>(false);
    const [form, setForm] = useState({ nom: '', prenom: '', email: '', adresse: '', ville: '', pays: '' });

    // Gérer la validation de la commande
    const handleOrder = (e: React.FormEvent) => {
        e.preventDefault();
        setOrdered(true);
        setCart([]);
        localStorage.removeItem('cart');
    };

    // Charger le panier
    useEffect(() => {
        const saved = localStorage.getItem('cart');
        if (saved) {
            setCart(JSON.parse(saved));
        }
        setIsInit(true);
    }, []);

    // Sync le panier vers le localstorage
    useEffect(() => {
        if (!isInit) return;
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart, isInit]);

    // Met à jour la quantité d'un produit dans le panier
    const handleUpdateQuantity = (id: number, delta: number) => {
        setCart(prev => prev.map(item => item.product.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) }: item)
        );
    };

    // Supprime un produit du panier
    const handleRemove = (id: number) => {
        setCart(prev => prev.filter(item => item.product.id !== id));
    };

    // Calcul du total du panier
    const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    return (
        <div className="min-h-screen w-screen bg-gray-300 overflow-y-hidden">
            <head>
                <title>ReactMart • Panier</title> 
            </head>
            
            {/* HEADER */}
            <header className="z-1 relative p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 drop-shadow-lg/30">
                <div className="absolute inset-0 bg-[url(/src/data/images/LeafBackground.jpg)] bg-center grayscale"></div>
                <div className="absolute inset-0 bg-[#DABEB6]/70"></div>
                <h1 className="z-2 text-white font-bold text-xl text-center mx-5 sm:text-left text-shadow-lg">ReactMart - Panier</h1>
                <nav className="z-2 flex justify-center sm:justify-end gap-4 mx-5">
                    <Link to="/" className="bg-[#EED0C6] px-3 py-2 rounded-md hover:scale-110 duration-100"><p className="text-white">Boutique</p></Link>
                    <Link to="/cart" className="bg-[#EED0C6] px-3 py-2 rounded-md hover:scale-110 duration-100"><p className="text-white">Favoris</p></Link>                    
                    <Link to="/cart" className="bg-[#EED0C6] px-3 py-2 rounded-md hover:scale-110 duration-100"><p className="text-white">Panier</p></Link>
                </nav>
            </header>

            {/* CONTENT */}
            <div className="flex flex-col overflow-auto p-4 bg-gradient-to-t from-red-50 to-stone-50 min-h-[60vh]">
                <h2 className="text-3xl text-black text-center mt-5">Votre Panier</h2>

                {ordered ? (
                    <div className="max-w-3xl mx-auto w-full mt-8 bg-white drop-shadow-md/25 rounded-md p-6 text-center">
                        <p className="text-5xl mb-4">✅</p>
                        <p className="text-2xl text-black font-bold">Commande confirmée !</p>
                        <p className="text-[#B2B9BF] mt-2">Merci {form.prenom} {form.nom} pour votre achat.</p>
                        <p className="text-[#B2B9BF]">Un email de confirmation a été envoyé à {form.email}</p>
                        <div className="mt-5 flex justify-center">
                            <Link to="/" className="!text-white bg-[#7A8D9B] px-5 py-2 rounded-full hover:bg-green-300 hover:cursor-pointer duration-150">Retour au shop</Link>
                        </div>
                    </div>
                ) : 
                
                    cart.length === 0 ? (
                    <div className="max-w-3xl mx-auto w-full mt-8 bg-white drop-shadow-md/25 rounded-md p-6 text-center">
                        <p className="text-lg text-black">Votre panier est vide.</p>
                        <p className="text-sm text-[#B2B9BF] mt-2">Ajoutez des articles depuis la boutique.</p>
                        <div className="mt-5 flex justify-center">
                            <Link to="/" className="!text-white bg-[#7A8D9B] px-5 py-2 rounded-full hover:bg-green-300 hover:cursor-pointer duration-150">Retour au shop</Link>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Total */}
                        <div className="max-w-7xl mx-auto w-full mt-6 mb-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                            <div className="bg-white drop-shadow-md/25 rounded-md px-4 py-3 w-full sm:w-auto">
                                <p className="text-black text-xl">
                                    Total : <span className="font-bold">{total.toFixed(2)} €</span>
                                </p>
                            </div>
                            <Link to="/" className="!text-white bg-[#7A8D9B] px-5 py-2 rounded-full hover:bg-green-300 hover:cursor-pointer duration-150">Continuer vos achats</Link>
                        </div>

                        {/* Cart Items */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-7xl mx-auto w-full">
                            {cart.map(({ product, quantity }) => (
                                <div key={product.id} className="relative bg-white text-black p-4 drop-shadow-md/25 rounded-md overflow-hidden hover:scale-102 duration-150">
                                    <div className="relative flex justify-center h-50 w-full bg-gradient-to-b from-gray-100 to-[#EED0C6] rounded-md">
                                        <p className="absolute left-0 top-0 text-white opacity-90 bg-[#cccccc] px-3 py-1 m-2 rounded-md">{product.category}</p>
                                        <p className="absolute right-0 bottom-0 text-white bg-[#DABEB6] px-3 py-1 m-2 rounded-md">{product.price}€</p>
                                        <Link to={`/product/${product.id}`} className="block h-full w-full">
                                            <img src={product.images} alt={product.name} className="w-full h-full object-contain" />
                                        </Link>
                                    </div>
                                    <hr className="border-solid border-black border-1 rounded-md my-3" />
                                    <div className="h-fit w-full">
                                        <h3 className="text-xl text-center mb-2">{product.name}</h3>
                                        <p className="text-sm text-[#B2B9BF] mb-4">{product.description}</p>
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                            <div className="flex items-center gap-2">
                                                <span className="text-black">Quantité :</span>
                                                <div className="flex items-center gap-2">
                                                    <button onClick={() => handleUpdateQuantity(product.id, -1)} disabled={quantity <= 1}
                                                        className={`px-4 py-2 rounded-md duration-150 ${quantity > 1 ? "!bg-[#EED0C6] hover:!bg-[#DABEB6]" : "!bg-gray-300 cursor-not-allowed"} !text-white`}> 
                                                        -
                                                    </button>
                                                    <span className="min-w-8 text-center font-bold">{quantity}</span>
                                                    <button onClick={() => handleUpdateQuantity(product.id, 1)} disabled={quantity >= product.stock}
                                                        className={`px-4 py-2 rounded-md duration-150 ${quantity < product.stock ? "!bg-[#EED0C6] hover:!bg-[#DABEB6]" : "!bg-gray-300 cursor-not-allowed"} !text-white`}>
                                                        +
                                                    </button>
                                                </div>
                                                <span className="text-xs text-[#B2B9BF]">(stock: {product.stock})</span>
                                            </div>
                                            <a onClick={() => handleRemove(product.id)}
                                                className="!text-white bg-red-500 px-5 py-2 rounded-full hover:opacity-60 hover:cursor-pointer duration-150">
                                                Retirer
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Formulaire de commande */}
                        <form onSubmit={handleOrder} className="max-w-xl mx-auto w-full mt-6 bg-white drop-shadow-md/25 rounded-md p-6">
                            <h3 className="text-xl text-black text-center mb-4">Formulaire de commande</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <input type="text" value={form.prenom} onChange={(e) => setForm({...form, prenom: e.target.value})} required
                                    placeholder="Prénom" className="px-4 py-2 border border-gray-300 rounded-md text-black" />
                                <input type="text" value={form.nom} onChange={(e) => setForm({...form, nom: e.target.value})} required
                                    placeholder="Nom" className="px-4 py-2 border border-gray-300 rounded-md text-black" />
                            </div>
                            <input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} required
                                placeholder="Email" className="w-full px-4 py-2 border border-gray-300 rounded-md text-black mt-3" />
                            <input type="text" value={form.adresse} onChange={(e) => setForm({...form, adresse: e.target.value})} required
                                placeholder="Adresse" className="w-full px-4 py-2 border border-gray-300 rounded-md text-black mt-3" />
                            <div className="grid grid-cols-2 gap-3 mt-3">
                                <input type="text" value={form.ville} onChange={(e) => setForm({...form, ville: e.target.value})} required
                                    placeholder="Ville" className="px-4 py-2 border border-gray-300 rounded-md text-black" />
                                <input type="text" value={form.pays} onChange={(e) => setForm({...form, pays: e.target.value})} required
                                    placeholder="Pays" className="px-4 py-2 border border-gray-300 rounded-md text-black" />
                            </div>
                            <button type="submit" className="!text-white bg-green-500 px-8 py-3 rounded-full hover:bg-green-600 hover:cursor-pointer duration-150 font-bold w-full mt-4">
                                Commander ({total.toFixed(2)} €)
                            </button>
                        </form>
                    </>
                )}
            </div>

            {/* FOOTER */}
            <div className="relative flex w-full h-50 items-center justify-center">
                <div className="absolute inset-0 bg-[url(/src/data/images/LeafBackground.jpg)] bg-center grayscale"></div>
                <div className="absolute inset-0 bg-[#DABEB6]/70"></div>
                <h2 className="relative text-4xl text-center text-white drop-shadow-md/25">© ReactMart • Tout droit réservé</h2>
            </div>
        </div>
    );
}
