import { useParams } from "react-router-dom";
import Products from "../data/Products";
import type { ProductProps } from "../data/Products";

export default function ProductPage() {
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
        <div>
            <h1>{product.name}</h1>

            <img src={product.images} className="w-full h-full" />

            <p><strong>Catégorie :</strong> {product.category}</p>
            <p><strong>Prix :</strong> {product.price} €</p>
            <p><strong>Description :</strong> {product.description}</p>
            <p><strong>Artisan :</strong> {product.artisan}</p>
            <p><strong>Note :</strong> {product.rating}</p>
            <p><strong>Nombre d’avis :</strong> {product.reviews}</p>

            <p><strong>Tags :</strong></p>
            <ul>
                {product.tags.map((tag, index) => (
                    <li key={index}>{tag}</li>
                ))}
            </ul>
        </div>
    );
}
