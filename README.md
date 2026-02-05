# ReactMart - Boutique en ligne artisanale

Une application e-commerce React pour vendre des produits artisanaux.

## Technologies utilisées

- **React** 
- **TypeScript** 
- **Vite** 
- **Tailwind CSS** 
- **React Router** 

## Fonctionnalités

- **Boutique** : Parcourir les produits artisanaux
- **Filtrage** : Par catégorie (Décoration, Cuisine, Mode, Bijoux, Art, etc.)
- **Tri** : Par prix ou par note (croissant/décroissant)
- **Panier** : Ajouter, modifier les quantités, supprimer des articles
- **Favoris** : Sauvegarder ses produits préférés
- **Page produit** : Voir les détails d'un article
- **Commande** : Formulaire de validation avec confirmation
- **Persistance** : Les données du panier et favoris sont sauvegardées dans le localStorage

## Démo

L'application est déployée sur Vercel : [Accéder à ReactMart](https://react-mart-omega.vercel.app/)

## Installation locale

```bash
# Cloner le projet
git clone https://github.com/votre-repo/reactmart.git

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev
```

## Structure du projet

```
src/
├── App.tsx          # Routes de l'application
├── data/
│   ├── Products.ts  # Liste des produits
│   └── images/      # Images des produits
└── pages/
    ├── Shop.tsx        # Page boutique
    ├── Cart.tsx        # Page panier
    ├── Favorites.tsx   # Page favoris
    └── ProductPage.tsx # Page détail produit
```
