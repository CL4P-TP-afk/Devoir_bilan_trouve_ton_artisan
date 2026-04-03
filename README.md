# Trouve ton artisan

Application full stack permettant de consulter un annuaire d’artisans locaux, de naviguer par catégories, d’effectuer des recherches multi-critères et de contacter un artisan via un formulaire.

Le projet est composé de deux applications distinctes :
- un frontend React/Vite dans `frontend/`
- une API REST Node.js/Express dans `backend/`

## Présentation

Le frontend fournit l'interface utilisateur et consomme l'API backend pour afficher les données métier. Le backend expose des endpoints REST connectés à une base MySQL/MariaDB via Sequelize.

Le périmètre actuel couvre :
- la page d'accueil avec artisans mis en avant
- la navigation par catégories
- la recherche par mot-clé
- la fiche détaillée d'un artisan
- le formulaire de contact relié au backend

## Fonctionnalités

### Frontend

- affichage des artisans mis en avant sur la page d'accueil
- chargement dynamique des catégories dans le header
- fallback local des catégories si l'API est indisponible
- navigation vers les pages catégorie, recherche et fiche artisan
- recherche via l'URL `/recherche?q=...`
- affichage des états `loading`, `error`, `empty state` et succès d'envoi
- pages `404` et pages légales provisoires en construction
- SEO simple via titre, meta description, `robots.txt` et `sitemap.xml`

### Backend

- endpoint de santé `GET /health`
- liste des catégories triées par ordre alphabétique
- liste des artisans d'une catégorie
- sélection de 3 artisans mis en avant maximum
- recherche paginée par nom, ville ou spécialité
- récupération de la fiche complète d'un artisan
- envoi d'un message de contact via l'API Mailtrap
- documentation Swagger disponible sur `/api-docs`

## Stack technique

### Frontend

- React 19
- React Router DOM 7
- Vite
- Sass
- Bootstrap 5
- Bootstrap Icons
- ESLint

### Backend

- Node.js
- Express 5
- Sequelize
- MySQL / MariaDB
- mysql2
- dotenv
- cors
- morgan
- swagger-ui-express

### Base de données

- MySQL / MariaDB
- encodage `utf8mb4`
- collation `utf8mb4_unicode_ci`

## Architecture globale

```text
frontend (React / Vite)
  -> appelle l'API REST
backend (Express / Sequelize)
  -> interroge MySQL / MariaDB
```

### Structure du dépôt

```text
.
├── backend/   # API REST Express, Sequelize, Swagger
├── frontend/  # SPA React/Vite
├── sql/       # scripts de création, seed et tests SQL
├── tests/     # exports de résultats SQL documentés
├── docs/      # rapport de projet
└── README.md
```

### Organisation backend

Le backend suit une structure de type MVC légère :
- `routes/` pour les endpoints HTTP
- `controllers/` pour la logique métier
- `models/` pour les modèles et associations Sequelize
- `middlewares/` pour la validation et la gestion d'erreurs
- `db/` pour la configuration Sequelize
- `docs/` pour la spécification OpenAPI

### Organisation frontend

Le frontend est structuré par responsabilités :
- `pages/` pour les vues routées
- `components/` pour les composants réutilisables et sections
- `services/` pour les appels API
- `styles/` pour les styles Sass
- `app/` pour la configuration applicative et les routes

## Installation complète

### 1. Base de données

Exécuter les scripts du dossier `sql/` dans cet ordre :

1. `00_create_database.sql`
2. `01_create_user_and_grants.sql`
3. `02_schema.sql`
4. `03_seed.sql`
5. `04_tests.sql`

Le script `01_create_user_and_grants.sql` crée un utilisateur applicatif local `app_trouve_artisan`. Le mot de passe défini dans ce script doit être reporté dans `backend/.env`.

### 2. Backend

```bash
cd backend
npm install
```

Créer ensuite un fichier `.env` à partir de `backend/.env.exemple`.

### 3. Frontend

```bash
cd frontend
npm install
```

Créer ensuite un fichier `.env` à partir de `frontend/.env.example`.

## Configuration

### Backend

Variables principales :

```env
PORT=3001
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_USER=app_trouve_artisan
DB_PASSWORD=CHANGE_ME
DB_NAME=trouve_ton_artisan
DB_SSL=false

FRONTEND_URL=http://localhost:5173

MAILTRAP_API_TOKEN=your_mailtrap_api_token
MAILTRAP_INBOX_ID=your_mailtrap_inbox_id
MAIL_FROM_EMAIL=no-reply@trouve-ton-artisan.fr
MAIL_FROM_NAME=Trouve ton artisan
MAIL_TO=test@example.com
```

Points importants :
- l'API ne démarre que si la connexion à la base fonctionne
- `FRONTEND_URL` contrôle l'origine autorisée par CORS
- le formulaire de contact dépend de la configuration Mailtrap
- `DB_SSL=true` active SSL pour une base distante

### Frontend

Variable utilisée :

```env
VITE_API_URL=http://localhost:3001/api
```

Si `VITE_API_URL` n'est pas définie, le frontend utilise cette même valeur par défaut via `src/services/api.js`.

## Lancement du projet

### Lancer le backend

```bash
cd backend
npm run dev
```

### Lancer le frontend

```bash
cd frontend
npm run dev
```

## URLs

### Locales

- Frontend : `http://localhost:5173`
- Backend : `http://localhost:3001`
- Health check : `http://localhost:3001/health`
- Swagger : `http://localhost:3001/api-docs`

### Déployées

- Frontend : `https://devoir-bilan-trouve-ton-artisan-zeta.vercel.app`
- Backend : déployé sur Render (non exposé publiquement dans ce dépôt)

## Interaction frontend / backend

Tous les appels HTTP du frontend sont centralisés dans `frontend/src/services/api.js` via `apiFetch()`.

Flux principal :

1. le frontend lit `VITE_API_URL`
2. il appelle les endpoints `/api/...` du backend
3. le backend interroge MySQL via Sequelize
4. il renvoie des réponses JSON consommées par les pages React

Correspondance principale :

- `Home` -> `GET /api/artisans/featured`
- `Header` -> `GET /api/categories`
- `Category` -> `GET /api/categories/:id/artisans`
- `SearchResults` -> `GET /api/artisans?search=...`
- `ArtisanDetail` -> `GET /api/artisans/:id`
- formulaire de contact -> `POST /api/artisans/:id/contact`

## Endpoints principaux

### Santé

- `GET /health`

### Catégories

- `GET /api/categories`
- `GET /api/categories/:id/artisans`

### Artisans

- `GET /api/artisans/featured`
- `GET /api/artisans`
- `GET /api/artisans/:id`
- `POST /api/artisans/:id/contact`

## Choix techniques notables

- La recherche backend est paginée avec `page` et `limit`, même si l'interface actuelle n'expose qu'une recherche simple par mot-clé.
- Les artisans mis en avant sont limités à 3 côté serveur et triés par note décroissante puis nom.
- Les catégories du header disposent d'un fallback local pour préserver la navigation de base si l'API ne répond pas.
- Les autres pages affichent explicitement des états d'erreur ou d'absence de données plutôt que de masquer un échec backend.
- L'image d'un artisan a un fallback local côté frontend si `image_url` est absente.
- Le contact passe par l'API HTTP Mailtrap et non par SMTP.
- Les pages `/mentions-legales`, `/donnees-personnelles`, `/accessibilite` et `/cookies` pointent actuellement vers une page générique en construction.

## SEO

Le projet inclut un socle SEO adapté à une SPA :

- balises de base dans `frontend/index.html`
- mise à jour dynamique du titre et de la meta description via `Seo.jsx`
- `frontend/public/robots.txt`
- `frontend/public/sitemap.xml`
- métadonnées dédiées pour l'accueil, les catégories, la recherche, la fiche artisan, la 404 et la page en construction

## Auteur

Loïc  
Projet réalisé dans le cadre d'une formation développeur web.
