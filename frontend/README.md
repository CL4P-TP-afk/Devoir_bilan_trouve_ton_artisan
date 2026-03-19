# Frontend — Trouve ton artisan

Frontend React de la plateforme **Trouve ton artisan**.

Ce projet a été réalisé dans le cadre d’un projet de formation avec une approche volontairement professionnelle :
- architecture modulaire
- séparation des responsabilités
- connexion à une API REST réelle
- gestion des erreurs et fallback UX

---

## 🎯 Objectif du projet

L’application permet aux utilisateurs de :

- consulter les artisans mis en avant
- parcourir les artisans par catégorie
- rechercher un artisan par mot-clé
- consulter la fiche détaillée d’un artisan
- contacter un artisan via un formulaire

Le frontend consomme une **API REST Node.js / Express** connectée à une base **MySQL**.

---

## 🧱 Stack technique

### Frontend

- React
- Vite
- React Router
- Sass (SCSS)
- Bootstrap
- Bootstrap Icons

### Backend (API consommée)

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

## ⚙️ Configuration

Le frontend communique avec l’API via la variable :
```
VITE_API_URL
```
Exemple :
```
VITE_API_URL=http://localhost:3001/api
```
Fallback par défaut :
```
[http://localhost:3001/api](http://localhost:3001/api)
```

---

## 🗂️ Architecture du projet
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
│  ├─ artisan-detail
│  │  ├─ ArtisanHeroSection.jsx
│  │  ├─ ArtisanAboutSection.jsx
│  │  └─ ArtisanContactSection.jsx
│  │
│  ├─ home
│  │  ├─ FeaturedArtisansSection.jsx
│  │  ├─ HeroSection.jsx
│  │  └─ StepsSection.jsx
│  │
│  ├─ layout
│  │  ├─ Header.jsx
│  │  ├─ Footer.jsx
│  │  └─ Layout.jsx
│  │
│  └─ search
│     └─ SearchForm.jsx
│
├─ pages
│  ├─ Home.jsx
│  ├─ Category.jsx
│  ├─ ArtisanDetail.jsx
│  ├─ SearchResults.jsx
│  ├─ NotFound.jsx
│  └─ ConstructionPage.jsx
│
├─ services
│  ├─ api.js
│  ├─ artisans.service.js
│  └─ categoryService.js
│
└─ styles
   ├─ _variables.scss
   ├─ _header.scss
   ├─ _footer.scss
   ├─ _home.scss
   ├─ _category.scss
   ├─ _artisan.scss
   ├─ _artisan-card.scss
   ├─ _status.scss
   └─ main.scss
```
---

## 🧠 Architecture React 

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
- la scalabilité

---

## 🔌 Communication avec l'API
Tous les appels HTTP sont centralisés dans :
```
services/api.js
```
Fonction principale :
```
apiFetch()
```
Responsabilités :
- construire les URL API
- gérer les requêtes HTTP
- centraliser les erreurs

Exemples de services :
- artisans.service.js
- categoryService.js

Exemples d’endpoints utilisés :
```
GET /api/artisans
GET /api/artisans/featured
GET /api/categories
GET /api/artisans/:id
POST /api/artisans/:id/contact
```
Les services utilisent cette fonction pour récupérer les données.

---

## ⚠️ Gestion des erreurs

Le projet inclut plusieurs stratégies UX :

- fallback local pour les catégories si l’API échoue
- messages utilisateurs clairs en cas d’erreur
- gestion des états :
   -   loading
   -   empty
   -   error

Objectif : interface toujours fonctionnelle même en cas de problème backend

---

## 🎨 Styles & design system

Organisation avec Sass :
```
styles/
```
- variables globales (_variables.scss)
- styles par page / composant
- séparation claire des responsabilités

Respect des maquettes Figma :
- couleurs
- typographie
- layout responsive

---

## ✅ Bonnes pratiques appliquées
- architecture modulaire
- séparation pages / composants / services
- composants réutilisables
- centralisation des appels API
- gestion des erreurs UX
- fallback en cas de panne API
- routing propre avec React Router
- layout global partagé (Header / Footer)
- composants découplés (pages → sections)
---

## 🔗 Lien avec le backend

API utilisée :
```
[http://localhost:3001/api](http://localhost:3001/api)
```
---

## 🧩 Fonctionnalités implémentées

- page d’accueil dynamique
- affichage des artisans mis en avant
- navigation par catégories
- page détail artisan
- formulaire de contact fonctionnel (email via backend)
- moteur de recherche avec page de résultats
- gestion des erreurs utilisateur
- pages 404 et pages en construction

---

## 📈 Améliorations possibles
- pagination des résultats
- filtres avancés (ville, note, spécialité)
- optimisation des performances
- amélioration accessibilité (a11y)
- tests unitaires

---

## 👨‍💻 Auteur
Projet réalisé dans le cadre d’une formation développeur web, avec une approche orientée pratiques professionnelles modernes.