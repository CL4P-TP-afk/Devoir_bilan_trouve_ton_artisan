import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql", // ok pour MySQL et MariaDB
    logging: true,   // mets true si tu veux voir les requêtes SQL
    define: {
      underscored: true,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      freezeTableName: true, // important: tables existantes (categories, specialties, artisans)
    },
  }
);