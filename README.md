# Fashby Marketplace

Un marché moderne de la mode pour des articles neufs et d'occasion, proposant des conseils de style alimentés par l'IA.

<div align="center">
  <img src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" alt="Fashby Banner" width="100%" />
</div>

## Description

Fashby Marketplace est une application React conçue pour offrir une expérience d'achat fluide et personnalisée. Elle permet aux utilisateurs de naviguer parmi une large sélection de vêtements, chaussures et accessoires, qu'ils soient neufs ou de seconde main. L'une des fonctionnalités phares est l'assistant de style intelligent, qui utilise l'API Gemini de Google pour fournir des recommandations personnalisées basées sur les requêtes des utilisateurs.

## Fonctionnalités Clés

-   **Navigation par Catégorie** : Explorez les articles par catégories telles que Femmes, Hommes, Chaussures, Sacs, Accessoires et Luxe.
-   **Conseils de Style IA** : Obtenez des suggestions de tenues et de style personnalisées grâce à l'intégration de l'API Gemini.
-   **Produits en Vedette et Nouveautés** : Découvrez les articles populaires et les dernières tendances.
-   **Section Seconde Main & Premium** : Trouvez des pièces uniques et certifiées, ou mettez en vente vos propres articles.
-   **Filtres de Recherche** : Affinez vos recherches par taille, couleur, état, prix, etc.
-   **Interface Responsive** : Une expérience utilisateur optimisée pour tous les appareils.

## Stack Technologique

-   **Frontend** : [React 19](https://react.dev/), [Vite](https://vitejs.dev/)
-   **Langage** : [TypeScript](https://www.typescriptlang.org/)
-   **Styling** : [Tailwind CSS](https://tailwindcss.com/) (via CDN)
-   **Icônes** : [Lucide React](https://lucide.dev/)
-   **IA** : [Google Gemini API](https://ai.google.dev/)

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :
-   [Node.js](https://nodejs.org/) (version recommandée : LTS)
-   npm (généralement inclus avec Node.js)

## Installation et Configuration

1.  **Cloner le dépôt :**

    ```bash
    git clone <votre-url-de-repo>
    cd fashby-marketplace
    ```

2.  **Installer les dépendances :**

    ```bash
    npm install
    ```

3.  **Configurer les variables d'environnement :**

    Créez un fichier `.env` ou `.env.local` à la racine du projet et ajoutez votre clé API Gemini :

    ```env
    VITE_GEMINI_API_KEY=votre_cle_api_gemini_ici
    ```

    > **Note :** Vous pouvez obtenir une clé API Gemini sur [Google AI Studio](https://aistudio.google.com/).

## Lancer l'Application

Pour démarrer le serveur de développement :

```bash
npm run dev
```

L'application sera accessible à l'adresse indiquée dans le terminal (généralement `http://localhost:3000` selon la configuration Vite).

## Structure du Projet

```
.
├── components/       # Composants React réutilisables (Navbar, ProductCard, etc.)
├── services/         # Services pour les appels API (geminiService.ts)
├── App.tsx           # Composant principal de l'application
├── constants.ts      # Données statiques (catégories, produits, filtres)
├── index.html        # Point d'entrée HTML
├── index.tsx         # Point d'entrée React
├── types.ts          # Définitions des types TypeScript
└── vite.config.ts    # Configuration de Vite
```
