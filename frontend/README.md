# Frontend — Trouve ton artisan

Frontend React de la plateforme **Trouve ton artisan**.

Cette application permet aux utilisateurs de :
- consulter les artisans mis en avant
- parcourir les catégories d’artisans
- accéder aux fiches détaillées des artisans
- contacter un artisan

Le frontend consomme une **API REST Node.js / Express** connectée à une base de données **MySQL**.

---

## Stack technique

Frontend :

- React
- Vite
- React Router
- Sass (SCSS)
- Bootstrap
- Bootstrap Icons

Backend (API consommée) :

- Node.js
- Express
- Sequelize
- MySQL / MariaDB

---

## Installation

Cloner le projet :
```
git clone https://github.com/CL4P-TP-afk/Devoir_bilan_trouve_ton_artisan
```
Se placer dans le dossier frontend :

```bash
cd frontend
```
Installer les dépendances :
```
npm install
```
Lancer le serveur de développement :
```
npm run dev
```
Le site sera accessible sur :

[http://localhost:5173](http://localhost:5173)

---

## Configuration

Le frontend communique avec l’API via la variable :
```
VITE_API_URL
```
Exemple :
```
VITE_API_URL=http://localhost:3001/api
```
Si la variable n’est pas définie, l’application utilise :
```
[http://localhost:3001/api](http://localhost:3001/api)
```

---

## Architecture du projet
```
src
├─ app
│  ├─ App.jsx
│  ├─ config.js
│  └─ routes.jsx
│
├─ assets
│
├─ components
│  ├─ artisans
│  │  └─ ArtisanCard.jsx
│  │
│  ├─ home
│  │  ├─ FeaturedArtisansSection.jsx
│  │  ├─ HeroSection.jsx
│  │  └─ StepsSection.jsx
│  │
│  └─ layout
│     ├─ Footer.jsx
│     ├─ Header.jsx
│     └─ Layout.jsx
│
├─ pages
│  ├─ ArtisanDetail.jsx
│  ├─ Category.jsx
│  ├─ Home.jsx
│  └─ NotFound.jsx
│
├─ services
│  ├─ api.js
│  ├─ artisans.service.js
│  └─ categoryService.js
│
└─ styles
   ├─ _home.scss
   ├─ _variables.scss
   └─ main.scss
```
---

## Architecture React utilisée

L'application suit une architecture par responsabilités :
```
Pages
  ↓
Sections UI
  ↓
Composants réutilisables
  ↓
Services API
```
Exemple :
```
Home
  ↓
FeaturedArtisansSection
  ↓
ArtisanCard
```

Cette organisation permet :
- une meilleure réutilisabilité des composants
- une séparation claire entre UI et logique métier
- une maintenance facilitée

---

## Communication avec l'API
Les appels HTTP sont centralisés dans le dossier services.

Le fichier api.js expose une fonction :
```
apiFetch()
```
Cette fonction :
- construit l’URL complète de l’API
- exécute les requêtes HTTP
- centralise la gestion des erreurs

Exemples de services :
- artisans.service.js
- categoryService.js

Exemples d’endpoints utilisés :
```
GET /api/artisans/featured
GET /api/categories
```
Les services utilisent cette fonction pour récupérer les données.

---

## Gestion des erreurs

Certaines parties critiques de l'interface utilisent un **fallback local**.

Exemple :

- le menu des catégories est chargé depuis l'API
- en cas d'erreur API, un fallback local permet de conserver un menu fonctionnel

Cela évite une interface inutilisable si l’API est indisponible.

---

## Styles et design system

Les styles sont organisés avec Sass :
```
styles
 ├─ main.scss
 ├─ _variables.scss
 └─ _home.scss
```

Le design system inclut :
- variables de couleurs
- typographie
- composants stylés

Les styles sont inspirés des maquettes Figma.

---

## Bonnes pratiques appliquées

- séparation pages / composants / services
- composants réutilisables (ArtisanCard)
- appel API centralisé
- styles organisés avec Sass
- routing géré avec React Router
- layout global (Header / Footer) partagé entre les pages
---

## Lien avec le backend

Le frontend consomme l'API :

[http://localhost:3001/api](http://localhost:3001/api)

Endpoints principaux :
```
GET /api/artisans
GET /api/artisans/featured
GET /api/categories
```
---

## Roadmap
Fonctionnalités en cours de développement :

- page catégorie
- page détail artisan
- recherche d'artisans
- formulaire de contact
- améliorations UX
