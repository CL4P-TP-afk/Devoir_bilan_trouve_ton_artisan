/**
 * Modèle Sequelize : Specialty
 *
 * Représente la table `specialties`.
 * Une spécialité correspond à un métier précis (ex : boulanger, plombier).
 *
 * Relation :
 * - appartient à une Category
 * - possède plusieurs Artisans
 */

import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.js";

export const Specialty = sequelize.define(
  "Specialty",
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    category_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
  },
  { tableName: "specialties" }
);