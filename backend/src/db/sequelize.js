/**
 * Configuration Sequelize.
 *
 * Sequelize est l'ORM utilisé pour se connecter à MySQL/MariaDB et manipuler
 * les données via des modèles (Category, Specialty, Artisan) au lieu d'écrire
 * des requêtes SQL manuelles dans les controllers.
 *
 * - Utilise les variables d'environnement (.env)
 * - Désactive le logging SQL par défaut (logging: false)
 * - Configure les conventions de nommage pour matcher la base existante :
 *   underscored + created_at / updated_at.
 */

import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql", // ok pour MySQL et MariaDB
    logging: true,   
    define: {
      underscored: true,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      freezeTableName: true, // important: tables existantes (categories, specialties, artisans)
    },
  }
);