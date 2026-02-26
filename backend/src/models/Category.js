import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.js";

export const Category = sequelize.define(
  "Category",
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
  },
  { tableName: "categories" }
);