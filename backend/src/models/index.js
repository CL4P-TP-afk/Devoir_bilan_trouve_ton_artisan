import { sequelize } from "../db/sequelize.js";
import { Category } from "./Category.js";
import { Specialty } from "./Specialty.js";
import { Artisan } from "./Artisan.js";

// Category (1) -> (N) Specialty
Category.hasMany(Specialty, { foreignKey: "category_id", as: "specialties" });
Specialty.belongsTo(Category, { foreignKey: "category_id", as: "category" });

// Specialty (1) -> (N) Artisan
Specialty.hasMany(Artisan, { foreignKey: "specialty_id", as: "artisans" });
Artisan.belongsTo(Specialty, { foreignKey: "specialty_id", as: "specialty" });

export { sequelize, Category, Specialty, Artisan };