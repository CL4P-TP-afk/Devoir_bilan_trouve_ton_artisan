import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.js";

export const Artisan = sequelize.define(
  "Artisan",
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(150), allowNull: false },
    rating: { type: DataTypes.DECIMAL(2, 1), allowNull: false },
    city: { type: DataTypes.STRING(100), allowNull: false },
    about: { type: DataTypes.TEXT, allowNull: true },
    email: { type: DataTypes.STRING(150), allowNull: false },
    website: { type: DataTypes.STRING(255), allowNull: true },
    image_url: { type: DataTypes.STRING(255), allowNull: true },
    is_featured: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    specialty_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
  },
  { tableName: "artisans" }
);