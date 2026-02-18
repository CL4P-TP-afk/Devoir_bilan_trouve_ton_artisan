/*
-------------------------------------------------------
Script: 02_schema.sql
Projet: Trouve ton artisan
Description:
Création du schéma relationnel (tables, contraintes, index).
Style "pro" inspiré du projet Tifosi : timestamps, index, cohérence.
Pré-requis:
- Exécuter 00_create_database.sql avant
-------------------------------------------------------
*/

USE trouve_ton_artisan;

-- 0) Suppression des tables dans l'ordre inverse des dépendances
-- (tables enfants puis tables parentes, afin de respecter les clés étrangères)
DROP TABLE IF EXISTS artisans;
DROP TABLE IF EXISTS specialties;
DROP TABLE IF EXISTS categories;

-- 1) Table: categories
-- Règles : id auto-incrémenté, nom unique, timestamps
CREATE TABLE IF NOT EXISTS categories (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_categories_name (name)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

-- 2) Table: specialities
-- Une spécialité appartient à une seule catégorie
CREATE TABLE IF NOT EXISTS specialties (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  category_id BIGINT UNSIGNED NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),

  -- évite doublon : même spécialité dans une même catégorie
  UNIQUE KEY uq_specialties_name_category (name, category_id),

  KEY idx_specialties_category_id (category_id),

  CONSTRAINT fk_specialties_category
    FOREIGN KEY (category_id) REFERENCES categories(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

-- 3) Table: artisans
-- Un artisan appartient à une seule spécialité
CREATE TABLE IF NOT EXISTS artisans (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  rating DECIMAL(2,1) NOT NULL,
  city VARCHAR(100) NOT NULL,
  about TEXT NULL,
  email VARCHAR(150) NOT NULL,
  website VARCHAR(255) NULL,
  image_url VARCHAR(255) NULL,
  is_featured TINYINT(1) NOT NULL DEFAULT 0,
  specialty_id BIGINT UNSIGNED NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),

  KEY idx_artisans_specialty_id (specialty_id),
  KEY idx_artisans_name (name),
  KEY idx_artisans_city (city),
  KEY idx_artisans_is_featured (is_featured),

  CONSTRAINT fk_artisans_specialty
    FOREIGN KEY (specialty_id) REFERENCES specialties(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;
