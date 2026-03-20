import { Sequelize } from "sequelize";

/**
 * Détermine si l'application est en environnement de production.
 * Utilisé pour adapter certains comportements (logs, sécurité…)
 */
const isProduction = process.env.NODE_ENV === "production";

/**
 * Active ou non le SSL pour la connexion MySQL.
 * Nécessaire pour certaines bases hébergées (Aiven, PlanetScale…)
 */
const useSSL = process.env.DB_SSL === "true";

/**
 * Instance Sequelize (ORM)
 *
 * Permet de :
 * - gérer la connexion à la base MySQL
 * - manipuler les données via des modèles JS
 * - éviter d'écrire du SQL brut dans les controllers
 */
export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    dialect: "mysql",

    /**
     * Active les logs SQL uniquement en développement
     * → utile pour debug, mais à éviter en production
     */
    logging: !isProduction,

    /**
     * Configuration SSL (si requise par l'hébergeur DB)
     */
    dialectOptions: useSSL
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
      : {},

    /**
     * Configuration globale des modèles Sequelize
     */
    define: {
      underscored: true, // snake_case (created_at)
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      freezeTableName: true, // empêche Sequelize de renommer les tables
    },
  }
);