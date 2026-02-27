/**
 * Configuration Sequelize.
 *
 * Initialise la connexion à la base MySQL/MariaDB via Sequelize.
 * Sequelize agit comme un ORM (Object Relational Mapper) permettant
 * de manipuler les tables via des modèles JavaScript plutôt que via
 * des requêtes SQL écrites directement dans les controllers.
 *
 * Configuration :
 * - connexion via variables d'environnement (.env)
 * - dialect: mysql (compatible MySQL et MariaDB)
 * - logging activé en développement pour afficher les requêtes SQL / désactivé en prod
 * - conventions de nommage alignées sur la base existante :
 *   created_at / updated_at et noms de tables figés.
 */

import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql", // ok pour MySQL et MariaDB
    logging: false,   
    define: {
      underscored: true,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      freezeTableName: true, // important: tables existantes (categories, specialties, artisans)
    },
  }
);