/**
 * Configuration du pool de connexions MySQL.
 * 
 * Utilisation de mysql2/promise pour permettre
 * l'utilisation d'async/await.
 * 
 * Le pool permet de réutiliser les connexions
 * et d'améliorer les performances.
 */

import mysql from "mysql2/promise";
import "dotenv/config";

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});
