# Trouve ton artisan

## Présentation du projet

Projet fullstack réalisé dans le cadre de ma formation développeur web.

L'objectif de l'application est de permettre aux utilisateurs de trouver facilement un artisan local à partir de sa catégorie ou via une recherche multi-critères.

Fonctionnalités principales :

- consulter les artisans par catégorie
- afficher les artisans mis en avant
- rechercher un artisan (nom, ville, spécialité)
- consulter la fiche détaillée d’un artisan
- contacter un artisan via un formulaire

---

## 📌 État d’avancement du projet

- ✅ Maquettage UX/UI (Figma : desktop / tablette / mobile)
- ✅ Modélisation base de données (MCD / MLD / EER)
- ✅ Scripts SQL (création, seed, tests)
- ✅ API REST Node.js / Express
- ✅ Documentation API Swagger (OpenAPI)
- ✅ Frontend React (application complète)
- ✅ Déploiement complet (Frontend, Backend, Base de données)
- ✅ Mise en place du SEO (métadonnées dynamiques, sitemap, robots.txt)

---

## 🛠️ Stack technique

### Backend

- Node.js
- Express
- MySQL / MariaDB
- Sequelize (ORM)
- mysql2
- Swagger UI (OpenAPI)
- dotenv
- cors
- morgan (logs HTTP)
- nodemailer (formulaire de contact)

---

### Base de données

- MySQL / MariaDB (Aiven - base managée)
- charset : `utf8mb4`
- collation : `utf8mb4_unicode_ci`

---

### Frontend

- React
- React Router
- Vite
- Sass (SCSS)
- Bootstrap
- Bootstrap Icons

---

## 📂 Structure du projet
```
├── backend/ # API Express + Swagger
├── frontend/ # application React
├── sql/ # scripts SQL
├── docs/ # rapport de projet
├── tests/ # requêtes SQL de test
└── README.md
```

---

## 🧠 Architecture backend

L'API suit une architecture **Express MVC** :

- routes : définition des endpoints
- controllers : logique métier
- models : modèles Sequelize
- middlewares : validation et gestion des erreurs
- db : configuration Sequelize

Sequelize est utilisé comme ORM pour manipuler les données via des modèles JavaScript.

---

## 🧠 Architecture frontend

Le frontend suit une architecture modulaire :

- pages : gestion des routes
- sections : découpage des pages
- composants : éléments réutilisables
- services : appels API centralisés

Exemple :
```
Home
↓
FeaturedArtisansSection
↓
ArtisanCard
```

Cette organisation permet une meilleure maintenabilité et réutilisabilité du code.

---

## 🚀 Installation du projet

### 1️⃣ Base de données

Dossier :
```
sql/
```

Ordre d’exécution :

1. 00_create_database.sql  
2. 01_create_user_and_grants.sql  
3. 02_schema.sql  
4. 03_seed.sql  
5. 04_tests.sql  

---

### 2️⃣ Lancer le backend

```
cd backend
npm install
npm run dev
```

API: [http://localhost:3001](http://localhost:3001)

Health check: [http://localhost:3001/health](http://localhost:3001/health)

Swagger: [http://localhost:3001/api-docs](http://localhost:3001/api-docs)

---

### 3️⃣ Lancer le frontend
```
cd frontend
npm install
npm run dev
```
Application: [http://localhost:5173](http://localhost:5173)

---

## 🌍 Version déployée

Le projet est accessible en ligne :

- Frontend : https://devoir-bilan-trouve-ton-artisan-zeta.vercel.app  
- Backend : (Render - URL API)

---

## ✉️ Système de contact

Le système de contact repose sur un endpoint backend :
```
POST /api/artisans/:id/contact
```
En environnement de développement, un système SMTP était utilisé via Nodemailer.

En production, ce système a été remplacé par l’API **Mailtrap (mode sandbox)** en raison des limitations des plateformes cloud (ports SMTP bloqués sur Render).

Cela permet de simuler l’envoi d’emails de manière fiable sans dépendre d’un serveur SMTP.

---

## 🔍 SEO

Le référencement du site a été pris en compte avec une approche hybride :

- métadonnées statiques dans `index.html`
- composant React `Seo.jsx` pour les pages dynamiques
- génération d’un `sitemap.xml`
- configuration d’un `robots.txt`

Chaque page dispose d’un titre et d’une description adaptés (accueil, catégorie, fiche artisan, recherche, etc.).

---


## 📚 Endpoints principaux
- **Catégories:**
  -   GET /api/categories
  -   GET /api/categories/:id/artisans

- **Artisans:**
  -   GET /api/artisans/featured
  -   GET /api/artisans/:id
  -   GET /api/artisans?search=...
  -   POST /api/artisans/:id/contact

---

## 🔐 Sécurité
- utilisateur MySQL dédié
- principe du moindre privilège
- variables d’environnement (.env)
- gestion centralisée des erreurs
- protection contre les injections SQL via Sequelize

---

## 📊 Fonctionnalités backend
- API REST Express
- ORM Sequelize
- pagination des résultats
- recherche multi-critères
- logs HTTP (Morgan)
- validation des paramètres
- envoi d’emails (Nodemailer)

---

## 🎯 Fonctionnalités frontend
- navigation multi-pages (React Router)
- recherche dynamique d’artisans
- affichage conditionnel (loading / error / empty state)
- composants réutilisables
- formulaire de contact connecté à l’API
- fallback en cas d’indisponibilité API
- interface responsive

---

## 📈 Qualité du projet

Une analyse Lighthouse a été réalisée (exemple sur home-desktop):

- Performance : 100
- Accessibilité : 95
- Bonnes pratiques : 100
- SEO : 100

---

## 👤 Auteur
```
Loïc
Projet réalisé dans le cadre d'une formation développeur web.
```