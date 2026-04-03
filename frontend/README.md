# Frontend - Trouve ton artisan

Frontend React de la plateforme **Trouve ton artisan**.

Cette application permet à un utilisateur de :
- consulter les artisans mis en avant sur la page d’accueil
- parcourir les artisans par catégorie
- rechercher un artisan par mot-clé
- consulter la fiche détaillée d’un artisan
- contacter un artisan via un formulaire relié au backend

Le frontend consomme une **API REST Node.js / Express** exposée par le dossier `backend/` du projet.

---

## Objectif du frontend

Le frontend fournit l’interface utilisateur de l’application.  
Il s’appuie sur le backend pour récupérer les données des artisans et envoyer les messages du formulaire de contact.

Le projet est organisé de manière modulaire :
- pages pour les vues principales
- composants réutilisables pour l’interface
- services pour centraliser les appels API
- styles Sass pour l’habillage visuel

---

## Stack technique

### Dépendances principales

- React `19.2.0`
- React DOM `19.2.0`
- React Router DOM `7.13.1`
- Vite `7.3.1`
- Sass `1.97.3`
- Bootstrap `5.3.8`
- Bootstrap Icons `1.13.1`

### Outils de développement

- ESLint
- `@vitejs/plugin-react`

---

## Pré-requis

Avant de lancer le frontend, il faut disposer de :
- Node.js
- npm
- un backend fonctionnel dans le dossier `backend/` ou une API compatible accessible via URL

Par défaut, le frontend essaie d’appeler :
```env
http://localhost:3001/api
```

Cela signifie que si aucune variable d’environnement n’est définie, le backend doit être lancé localement sur le port `3001`.

---

## Installation

Cloner le projet complet :

```bash
git clone https://github.com/CL4P-TP-afk/Devoir_bilan_trouve_ton_artisan
cd Devoir_bilan_trouve_ton_artisan
cd frontend
npm install
```

---

## Configuration

Le frontend utilise la variable d’environnement suivante :

```env
VITE_API_URL
```

Exemple de valeur en local :

```env
VITE_API_URL=http://localhost:3001/api
```

Un fichier d’exemple est présent :

```bash
.env.example
```

Créer un fichier `.env` dans le dossier `frontend/` avec ce contenu :

```env
VITE_API_URL=http://localhost:3001/api
```

### Comportement par défaut

Si `VITE_API_URL` n’est pas définie, le frontend utilise automatiquement :

```env
http://localhost:3001/api
```

---

## Lancer le projet en développement

Depuis le dossier `frontend/` :

```bash
npm run dev
```

Le serveur de développement Vite démarre par défaut sur :

```txt
http://localhost:5173
```

Important :
- le frontend peut démarrer seul
- mais les fonctionnalités dépendantes de l’API nécessitent que le backend soit disponible

---

## Scripts npm disponibles

Dans `frontend/package.json`, les scripts disponibles sont :

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

### Détail

- `npm run dev`  
  Lance le serveur de développement Vite

- `npm run build`  
  Génère la version de production dans le dossier `dist/`

- `npm run preview`  
  Lance un serveur local pour prévisualiser le build de production

- `npm run lint`  
  Lance ESLint sur le projet

---

## Structure du projet

```txt
src
├── app
│   ├── App.jsx
│   ├── config.js
│   └── routes.jsx
│
├── assets
│
├── components
│   ├── artisans
│   │   └── ArtisanCard.jsx
│   │
│   ├── artisan-detail
│   │   ├── ArtisanHeroSection.jsx
│   │   ├── ArtisanAboutSection.jsx
│   │   └── ArtisanContactSection.jsx
│   │
│   ├── home
│   │   ├── FeaturedArtisansSection.jsx
│   │   ├── HeroSection.jsx
│   │   └── StepsSection.jsx
│   │
│   ├── layout
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── Layout.jsx
│   │
│   ├── search
│   │   └── SearchForm.jsx
│   │
│   └── seo
│       └── Seo.jsx
│
├── pages
│   ├── Home.jsx
│   ├── Category.jsx
│   ├── ArtisanDetail.jsx
│   ├── SearchResults.jsx
│   ├── NotFound.jsx
│   └── ConstructionPage.jsx
│
├── services
│   ├── api.js
│   ├── artisans.service.js
│   └── categoryService.js
│
└── styles
    ├── _variables.scss
    ├── _header.scss
    ├── _footer.scss
    ├── _home.scss
    ├── _category.scss
    ├── _artisan.scss
    ├── _artisan-card.scss
    ├── _status.scss
    └── main.scss
```

---

## Architecture frontend

Le frontend suit une séparation simple par responsabilités :

```txt
Pages
  ↓
Composants / Sections UI
  ↓
Services API
```

Exemple :
```txt
Home
  ↓
FeaturedArtisansSection
  ↓
ArtisanCard
```

Cette organisation permet :
- de séparer l’interface de la récupération des données
- de centraliser les appels HTTP
- de réutiliser les composants visuels
- de faciliter la maintenance

---

## Routes frontend

Les routes actuellement présentes sont :

- `/` : page d’accueil
- `/categories/:id` : page d’une catégorie d’artisans
- `/artisans/:id` : fiche détaillée d’un artisan
- `/recherche` : page de recherche
- `/mentions-legales` : page en construction
- `/donnees-personnelles` : page en construction
- `/accessibilite` : page en construction
- `/cookies` : page en construction
- `*` : page 404

---

## Communication avec le backend

Tous les appels HTTP du frontend passent par :

```txt
src/services/api.js
```

La fonction centrale est :

```txt
apiFetch()
```

Elle sert à :
- construire l’URL complète de l’API
- envoyer les requêtes HTTP
- normaliser les erreurs de réponse

### Endpoints utilisés par le frontend

#### Catégories

```http
GET /api/categories
GET /api/categories/:id/artisans
```

#### Artisans

```http
GET /api/artisans/featured
GET /api/artisans/:id
GET /api/artisans?search=...
POST /api/artisans/:id/contact
```

### Services utilisés

- `artisans.service.js`
- `categoryService.js`

---

## Fonctionnalités implémentées

### 1. Page d’accueil

La page d’accueil :
- affiche une section héros
- affiche des étapes de présentation
- récupère les artisans mis en avant depuis l’API

Endpoint utilisé :

```http
GET /api/artisans/featured
```

---

### 2. Navigation par catégories

Le menu du header charge dynamiquement les catégories depuis l’API :

```http
GET /api/categories
```

Quand l’utilisateur ouvre une catégorie, la page correspondante charge :
- les informations de la catégorie
- la liste des artisans liés à cette catégorie

Endpoint utilisé :

```http
GET /api/categories/:id/artisans
```

---

### 3. Recherche d’artisans

Le formulaire de recherche redirige vers :

```txt
/recherche?q=mot-cle
```

La page de résultats appelle le backend avec le paramètre `search` :

```http
GET /api/artisans?search=...
```

La recherche repose actuellement sur un mot-clé transmis dans l’URL.  
Le frontend exploite la propriété `data` renvoyée par le backend pour afficher les résultats.

---

### 4. Fiche détaillée d’un artisan

La page détail charge un artisan à partir de son identifiant :

```http
GET /api/artisans/:id
```

La fiche affiche notamment :
- le nom
- la note
- la ville
- la spécialité
- la catégorie
- la description
- les coordonnées disponibles dans la réponse API

---

### 5. Formulaire de contact

La fiche artisan contient un formulaire de contact connecté au backend.

Endpoint utilisé :

```http
POST /api/artisans/:id/contact
```

Le frontend gère :
- la saisie du nom
- la saisie de l’email
- la saisie du message
- une validation simple côté client
- l’état d’envoi
- l’affichage d’un message de succès
- l’affichage d’un message d’erreur

La validation côté client vérifie :
- que tous les champs sont remplis
- que l’email a un format minimalement valide

Le backend reste responsable de la validation finale et de l’envoi du message.

---

## Gestion des erreurs et comportement de secours

Le frontend gère plusieurs états d’interface :
- chargement
- erreur
- absence de résultat
- succès d’envoi du formulaire

### Ce qui est prévu en cas d’échec API

Le projet inclut un fallback local pour les catégories du header :
- si l’API des catégories échoue, une liste locale de catégories est affichée

En revanche :
- la page d’accueil affiche une erreur si les artisans mis en avant ne peuvent pas être chargés
- la page catégorie affiche une erreur si les données de catégorie échouent
- la recherche affiche une erreur si la requête échoue
- la page détail affiche une erreur si l’artisan ne peut pas être chargé
- le formulaire de contact affiche une erreur si l’envoi échoue

Autrement dit, l’application ne reste pas totalement autonome sans backend, mais elle prévoit des retours utilisateur explicites.

---

## SEO

Le frontend inclut une stratégie SEO simple pour une SPA React.

### Éléments présents

- balises de base dans `index.html`
- composant React `Seo.jsx` pour mettre à jour :
  - le titre de la page
  - la meta description
- fichier `public/robots.txt`
- fichier `public/sitemap.xml`

### Pages concernées

Des métadonnées sont définies pour :
- l’accueil
- la page catégorie
- la fiche artisan
- la page de recherche
- la page 404
- la page en construction

Note :
les routes légales (`/mentions-legales`, `/donnees-personnelles`, `/accessibilite`, `/cookies`) réutilisent actuellement la même page en construction, avec les mêmes métadonnées.

---

## Styles et interface

Le projet utilise :
- Bootstrap pour la grille et certains composants d’interface
- Bootstrap Icons pour les icônes
- Sass pour l’organisation des styles personnalisés

Les imports principaux sont réalisés dans `src/main.jsx` :
- Bootstrap JS
- Bootstrap CSS
- Bootstrap Icons
- `main.scss`

---

## Déploiement

Le frontend contient un fichier :

```txt
vercel.json
```

Ce fichier configure une réécriture vers `index.html` pour permettre à React Router de fonctionner correctement en production sur Vercel.

Le projet prévoit également l’utilisation de `VITE_API_URL` pour pointer vers une API distante en production.

---

## Lien avec le backend

Le frontend est conçu pour fonctionner avec le backend du même projet.

### Base locale attendue

Par défaut :

```env
VITE_API_URL=http://localhost:3001/api
```

### Côté backend

Le backend expose notamment :
- `GET /api/categories`
- `GET /api/categories/:id/artisans`
- `GET /api/artisans/featured`
- `GET /api/artisans/:id`
- `GET /api/artisans?search=...`
- `POST /api/artisans/:id/contact`

Le backend dispose aussi d’un health check :

```http
GET /health
```

---

## Choix techniques

- La pagination est implémentée côté backend, mais non activée côté interface.
  Le volume de données actuel ne nécessite pas de pagination côté frontend.
  Le système est néanmoins prêt à évoluer si le nombre d’artisans augmente.

- Le frontend ne propose pas de filtres avancés.
  Ce choix correspond au périmètre fonctionnel du projet.

- Les pages légales utilisent actuellement un composant générique.
  Leur contenu n’est pas encore rédigé.

- Le fallback en cas d’indisponibilité du backend est volontairement limité.
  L’objectif est de préserver la cohérence des données et de ne pas dupliquer de logique côté frontend.

---
