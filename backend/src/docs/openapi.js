export const openapiSpec = {
  openapi: "3.0.0",
  info: {
    title: "API - Trouve ton artisan",
    version: "1.0.0",
    description: "Documentation OpenAPI de l’API Trouve ton artisan",
  },
  servers: [{ url: "http://localhost:3001" }],
  tags: [
    { name: "Health" },
    { name: "Categories" },
    { name: "Artisans" },
  ],
  components: {
    schemas: {
      Category: {
        type: "object",
        properties: {
          id: { type: "integer" },
          name: { type: "string" },
        },
        required: ["id", "name"],
      },
      ArtisanCard: {
        type: "object",
        properties: {
          id: { type: "integer" },
          name: { type: "string" },
          rating: { type: "number" },
          city: { type: "string" },
          image_url: { type: ["string", "null"] },
          is_featured: { type: "integer" },
          specialty: { type: "string" },
          category: { type: "string" },
        },
        required: ["id", "name", "rating", "city", "specialty", "category"],
      },
      ArtisanDetail: {
        allOf: [
          { $ref: "#/components/schemas/ArtisanCard" },
          {
            type: "object",
            properties: {
              about: { type: ["string", "null"] },
              email: { type: "string" },
              website: { type: ["string", "null"] },
            },
            required: ["email"],
          },
        ],
      },
      Error: {
        type: "object",
        properties: { error: { type: "string" } },
        required: ["error"],
      },
    },
  },
  paths: {
    "/health": {
      get: {
        tags: ["Health"],
        summary: "Vérifie que l'API répond",
        responses: {
          200: {
            description: "API opérationnelle",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { status: { type: "string" } },
                  required: ["status"],
                },
              },
            },
          },
        },
      },
    },

    "/api/categories": {
      get: {
        tags: ["Categories"],
        summary: "Liste des catégories",
        responses: {
          200: {
            description: "Liste des catégories",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Category" },
                },
              },
            },
          },
          503: {
            description: "Base de données indisponible",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/Error" } },
            },
          },
        },
      },
    },

    "/api/categories/{id}/artisans": {
      get: {
        tags: ["Categories"],
        summary: "Liste des artisans d'une catégorie",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer", minimum: 1 },
          },
        ],
        responses: {
          200: {
            description: "Liste d'artisans",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    category: { $ref: "#/components/schemas/Category" },
                    artisans: {
                      type: "array",
                      items: { $ref: "#/components/schemas/ArtisanCard" },
                    },
                  },
                  required: ["category", "artisans"],
                },
              },
            },
          },
          400: {
            description: "ID invalide",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/Error" } },
            },
          },
          404: {
            description: "Catégorie introuvable",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/Error" } },
            },
          },
          503: {
            description: "Base de données indisponible",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/Error" } },
            },
          },
        },
      },
    },

    "/api/artisans/featured": {
      get: {
        tags: ["Artisans"],
        summary: "Artisans mis en avant",
        responses: {
          200: {
            description: "Jusqu'à 3 artisans mis en avant",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/ArtisanCard" },
                },
              },
            },
          },
          503: {
            description: "Base de données indisponible",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/Error" } },
            },
          },
        },
      },
    },

    "/api/artisans/{id}": {
      get: {
        tags: ["Artisans"],
        summary: "Fiche artisan",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer", minimum: 1 },
          },
        ],
        responses: {
          200: {
            description: "Détail artisan",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ArtisanDetail" },
              },
            },
          },
          400: {
            description: "ID invalide",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/Error" } },
            },
          },
          404: {
            description: "Artisan introuvable",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/Error" } },
            },
          },
          503: {
            description: "Base de données indisponible",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/Error" } },
            },
          },
        },
      },
    },

    "/api/artisans": {
      get: {
        tags: ["Artisans"],
        summary: "Recherche artisans",
        parameters: [
          {
            name: "search",
            in: "query",
            required: false,
            schema: { type: "string" },
            description: "Mot-clé (nom, ville, spécialité)",
          },
        ],
        responses: {
          200: {
            description: "Résultats de recherche",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/ArtisanCard" },
                },
              },
            },
          },
          503: {
            description: "Base de données indisponible",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/Error" } },
            },
          },
        },
      },
    },
  },
};