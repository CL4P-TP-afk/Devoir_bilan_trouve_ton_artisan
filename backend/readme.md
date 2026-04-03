# API - Trouve ton artisan

Backend REST du projet **Trouve ton artisan**, développé avec **Node.js**, **Express**, **Sequelize** et **MySQL/MariaDB**.

Cette API fournit au frontend :

- la liste des catégories
- la liste des artisans d’une catégorie
- les artisans mis en avant
- la recherche d’artisans
- la fiche détaillée d’un artisan
- l’envoi d’un message de contact via Mailtrap API

---

## Stack technique

- Node.js
- Express
- MySQL / MariaDB
- Sequelize
- mysql2
- dotenv
- cors
- morgan
- swagger-ui-express

---

## Architecture

```text
backend/
├── src/
│   ├── app.js                  # Configuration principale d’Express
│   ├── server.js               # Point d’entrée du serveur, charge l’env et démarre l’API
│   │
│   ├── db/
│   │   └── sequelize.js        # Configuration Sequelize et connexion MySQL
│   │
│   ├── models/                 # Modèles Sequelize
│   │   ├── Artisan.js
│   │   ├── Category.js
│   │   ├── Specialty.js
│   │   └── index.js            # Déclaration des associations entre modèles
│   │
│   ├── controllers/            # Logique métier des endpoints
│   │   ├── artisans.controller.js
│   │   └── categories.controller.js
│   │
│   ├── routes/                 # Définition des routes HTTP
│   │   ├── artisans.routes.js
│   │   └── categories.routes.js
│   │
│   ├── middlewares/            # Validation et gestion des erreurs
│   │   ├── catchAsync.js
│   │   ├── errorHandler.js
│   │   └── validateIdParam.js
│   │
│   └── docs/
│       └── openapi.js          # Spécification OpenAPI utilisée par Swagger UI
│
├── .env.exemple                # Modèle de variables d’environnement
├── package.json
└── readme.md
```

Cette organisation sépare clairement :

- **routes** : définition des endpoints HTTP
- **controllers** : logique métier et format de réponse JSON
- **middlewares** : validation et gestion des erreurs
- **db** : connexion à la base de données
- **models** : structure des entités manipulées par Sequelize
- **docs** : documentation OpenAPI exposée via Swagger UI

---

## Architecture backend

```text
Client (frontend / navigateur)
│
▼
Routes (Express)
│
▼
Middlewares
• validation des paramètres
• gestion des erreurs async
│
▼
Controllers
(logique métier)
│
▼
Sequelize ORM
│
▼
MySQL / MariaDB
│
▼
Réponse JSON
```

### Circulation d’une requête

Le flux d’une requête dans ce backend est le suivant :

1. le client appelle une route Express
2. la route applique éventuellement un ou plusieurs middlewares
3. le contrôleur exécute la logique métier
4. Sequelize interroge la base de données
5. le contrôleur reformate les données si nécessaire
6. l’API renvoie une réponse JSON au frontend

Cette séparation facilite :

- la lisibilité du code
- la maintenance
- le débogage
- l’évolution des endpoints sans mélanger routing, validation et accès aux données

### Accès aux données et associations Sequelize

L’accès à la base de données est réalisé via **Sequelize**, qui permet de manipuler les tables sous forme de modèles JavaScript.

Les associations définies dans `src/models/index.js` sont :

- `Category (1) -> (N) Specialty`
- `Specialty (1) -> (N) Artisan`

Ces relations permettent d’utiliser les `include` de Sequelize pour récupérer les données liées, par exemple :

- la spécialité d’un artisan
- la catégorie liée à cette spécialité

Concrètement, cela évite d’écrire les jointures SQL à la main dans les contrôleurs et permet de conserver une logique métier plus lisible.

---

## Fonctionnalités

L’API implémente actuellement les endpoints suivants :

- `GET /health`
- `GET /api/categories`
- `GET /api/categories/:id/artisans`
- `GET /api/artisans/featured`
- `GET /api/artisans/:id`
- `GET /api/artisans?search=...`
- `POST /api/artisans/:id/contact`

---

## Prérequis

Pour exécuter le backend localement, il faut disposer de :

- Node.js
- npm
- une base MySQL ou MariaDB accessible
- un compte Mailtrap si tu veux tester l’envoi de message

---

## Installation

Depuis le dossier `backend` :

```bash
npm install
```

Créer ensuite un fichier `.env` à partir de `.env.exemple`.

---

## Variables d’environnement

Le projet fournit un modèle : [`.env.exemple`](./.env.exemple)

### Exemple de configuration locale

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

### Référence des variables

| Variable | Obligatoire | Description |
|---|---|---|
| `PORT` | non | Port HTTP de l’API. Défaut : `3001` |
| `NODE_ENV` | non | Environnement d’exécution, par exemple `development` ou `production` |
| `DB_HOST` | oui | Hôte de la base de données |
| `DB_PORT` | non | Port MySQL. Défaut : `3306` |
| `DB_USER` | oui | Utilisateur MySQL |
| `DB_PASSWORD` | oui | Mot de passe MySQL |
| `DB_NAME` | oui | Nom de la base de données |
| `DB_SSL` | non | Active SSL si la valeur est `true` |
| `FRONTEND_URL` | non | Origine frontend autorisée par CORS. Défaut : `http://localhost:5173` |
| `MAILTRAP_API_TOKEN` | oui pour le contact | Token API Mailtrap |
| `MAILTRAP_INBOX_ID` | oui pour le contact | Identifiant de l’inbox Mailtrap |
| `MAIL_FROM_EMAIL` | oui pour le contact | Adresse expéditeur utilisée par l’API |
| `MAIL_FROM_NAME` | oui pour le contact | Nom expéditeur |
| `MAIL_TO` | oui pour le contact | Adresse destinataire des messages |

### Remarques importantes

- Le fichier `.env` ne doit pas être versionné.
- Si la connexion à la base de données échoue, le serveur ne démarre pas.
- La connexion MySQL peut utiliser SSL avec `DB_SSL=true`.
- L’endpoint de contact dépend de la configuration Mailtrap.

---

## Lancer l’API

### Développement

```bash
npm run dev
```

### Production

```bash
npm start
```

Par défaut, l’API est disponible sur :

[http://localhost:3001](http://localhost:3001)

Le frontend local autorisé par défaut est :

[http://localhost:5173](http://localhost:5173)

---

## Documentation API

Une documentation Swagger est disponible à l’adresse suivante :

[http://localhost:3001/api-docs](http://localhost:3001/api-docs)

Elle est servie par l’application Express à partir de `src/docs/openapi.js`.

---

## Endpoints

### `GET /health`

Vérifie que l’API répond.

#### Réponse

```json
{
  "status": "API OK"
}
```

---

### `GET /api/categories`

Retourne la liste des catégories triées par ordre alphabétique.

#### Exemple de réponse

```json
[
  {
    "id": 1,
    "name": "Alimentation"
  },
  {
    "id": 2,
    "name": "Bâtiment"
  }
]
```

---

### `GET /api/categories/:id/artisans`

Retourne les artisans rattachés à une catégorie.

#### Exemple

```text
GET /api/categories/2/artisans
```

#### Exemple de réponse

```json
{
  "category": {
    "id": 2,
    "name": "Bâtiment"
  },
  "artisans": [
    {
      "id": 4,
      "name": "Martin Couverture",
      "rating": 4.8,
      "city": "Lyon",
      "image_url": "https://example.com/images/martin.jpg",
      "specialty": "Couvreur"
    }
  ]
}
```

#### Erreurs possibles

- `400` : identifiant invalide
- `404` : catégorie introuvable

---

### `GET /api/artisans/featured`

Retourne jusqu’à `3` artisans mis en avant.

#### Tri appliqué

- note décroissante
- nom alphabétique

#### Exemple de réponse

```json
[
  {
    "id": 3,
    "name": "Boulangerie Durand",
    "rating": 4.9,
    "city": "Toulouse",
    "image_url": "https://example.com/images/durand.jpg",
    "is_featured": 1,
    "specialty": "Boulanger",
    "category": "Alimentation"
  }
]
```

---

### `GET /api/artisans/:id`

Retourne la fiche détaillée d’un artisan.

#### Exemple

```text
GET /api/artisans/3
```

#### Exemple de réponse

```json
{
  "id": 3,
  "name": "Boulangerie Durand",
  "rating": 4.9,
  "city": "Toulouse",
  "about": "Artisan boulanger depuis 15 ans.",
  "email": "contact@durand.fr",
  "website": "https://durand.fr",
  "image_url": "https://example.com/images/durand.jpg",
  "is_featured": 1,
  "specialty": "Boulanger",
  "category": "Alimentation"
}
```

#### Erreurs possibles

- `400` : identifiant invalide
- `404` : artisan introuvable

---

### `GET /api/artisans?search=...`

Recherche des artisans par :

- nom
- ville
- spécialité

La recherche est paginée.

#### Paramètres de requête

| Paramètre | Obligatoire | Description |
|---|---|---|
| `search` | non | Mot-clé recherché |
| `page` | non | Numéro de page. Défaut : `1` |
| `limit` | non | Nombre maximum de résultats. Défaut : `25`, maximum : `100` |

#### Exemple

```text
GET /api/artisans?search=boulanger&page=1&limit=10
```

#### Exemple de réponse

```json
{
  "page": 1,
  "limit": 10,
  "results": 1,
  "data": [
    {
      "id": 3,
      "name": "Boulangerie Durand",
      "rating": 4.9,
      "city": "Toulouse",
      "image_url": "https://example.com/images/durand.jpg",
      "is_featured": 1,
      "specialty": "Boulanger",
      "category": "Alimentation"
    }
  ]
}
```

#### Si `search` est absent ou vide

```json
{
  "page": 1,
  "limit": 25,
  "results": 0,
  "data": []
}
```

---

### `POST /api/artisans/:id/contact`

Envoie un message lié à un artisan via l’API HTTP Mailtrap.

#### Exemple de requête

```text
POST /api/artisans/3/contact
Content-Type: application/json
```

```json
{
  "name": "Jean Dupont",
  "email": "jean@email.com",
  "message": "Bonjour, je souhaite un devis."
}
```

#### Réponse en cas de succès

```json
{
  "success": true,
  "message": "Message envoyé avec succès"
}
```

#### Erreurs possibles

- `400` : champs requis manquants
- `404` : artisan introuvable
- `503` : service de contact momentanément indisponible

#### Comportement actuel

- l’envoi est réalisé via Mailtrap API
- l’email fourni par l’utilisateur est utilisé comme `reply_to`
- la réponse ne contient actuellement ni `messageId` ni `previewUrl`

---

## Gestion des erreurs

L’API repose sur :

- `validateIdParam` pour valider les paramètres d’URL
- `catchAsync` pour centraliser les erreurs asynchrones
- `errorHandler` pour renvoyer des réponses JSON cohérentes

### Exemples

```json
{
  "error": "Invalid id"
}
```

```json
{
  "error": "Category not found"
}
```

```json
{
  "error": "Artisan not found"
}
```

```json
{
  "error": "Le service de contact est momentanément indisponible. Veuillez réessayer plus tard."
}
```

---

## Logs et sécurité

### Logs

L’API utilise **Morgan** pour journaliser les requêtes HTTP :

- format `dev` en développement
- format `combined` en production

### Sécurité

- les secrets sont externalisés via les variables d’environnement
- CORS autorise l’origine définie par `FRONTEND_URL`
- la connexion MySQL peut utiliser SSL avec `DB_SSL=true`

---

## Évolution technique

- Implémentation initiale du contact via SMTP (Nodemailer / Ethereal)
- Migration vers Mailtrap API pour compatibilité cloud (Render)