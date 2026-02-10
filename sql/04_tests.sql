/*
-------------------------------------------------------
Script: 04_tests.sql
Projet: Trouve ton artisan
Description:
Requêtes de vérification orientées "besoins applicatifs"
(menu, listes, fiche artisan, artisans du mois, recherche).
-------------------------------------------------------
*/

USE trouve_ton_artisan;

-- =====================================================
-- 1) Contrôles de volumétrie (sanity check)
-- =====================================================
SELECT 'categories' AS table_name, COUNT(*) AS nb FROM categories
UNION ALL
SELECT 'specialties', COUNT(*) FROM specialties
UNION ALL
SELECT 'artisans', COUNT(*) FROM artisans;

-- =====================================================
-- 2) Menu du site : liste des catégories (ordre alphabétique)
-- =====================================================
SELECT id, name
FROM categories
ORDER BY name ASC;

-- =====================================================
-- 3) Vérification relationnelle : spécialités rattachées à une catégorie
-- =====================================================
SELECT
  c.name AS category,
  COUNT(*) AS nb_specialties
FROM specialties s
JOIN categories c ON c.id = s.category_id
GROUP BY c.id, c.name
ORDER BY c.name;

-- =====================================================
-- 4) Liste artisans par catégorie (page catégorie)
-- Exemple : "Bâtiment" (change le nom si besoin)
-- =====================================================
SELECT
  a.id,
  a.name,
  a.rating,
  s.name AS specialty,
  a.city
FROM artisans a
JOIN specialties s ON s.id = a.specialty_id
JOIN categories c ON c.id = s.category_id
WHERE c.name = 'Bâtiment'
ORDER BY a.rating DESC, a.name ASC;

-- =====================================================
-- 5) Liste artisans par recherche (barre de recherche)
-- Recherche sur nom artisan (brief) + bonus utile : ville & spécialité
-- Change le mot-clé si besoin
-- =====================================================
SET @q = 'boul';

SELECT
  a.id,
  a.name,
  a.rating,
  s.name AS specialty,
  a.city,
  c.name AS category
FROM artisans a
JOIN specialties s ON s.id = a.specialty_id
JOIN categories c ON c.id = s.category_id
WHERE a.name LIKE CONCAT('%', @q, '%')
   OR s.name LIKE CONCAT('%', @q, '%')
   OR a.city LIKE CONCAT('%', @q, '%')
ORDER BY a.rating DESC, a.name ASC;

-- =====================================================
-- 6) Accueil : artisans du mois (3 max)
-- =====================================================
SELECT
  a.id,
  a.name,
  a.rating,
  s.name AS specialty,
  a.city
FROM artisans a
JOIN specialties s ON s.id = a.specialty_id
WHERE a.is_featured = 1
ORDER BY a.rating DESC, a.name ASC
LIMIT 3;

-- =====================================================
-- 7) Fiche artisan : récupérer toutes les infos nécessaires
-- Remplace l'id par un id existant
-- =====================================================
SET @artisan_id = 1;

SELECT
  a.id,
  a.name,
  a.rating,
  a.city,
  a.about,
  a.email,
  a.website,
  a.is_featured,
  s.name AS specialty,
  c.name AS category
FROM artisans a
JOIN specialties s ON s.id = a.specialty_id
JOIN categories c ON c.id = s.category_id
WHERE a.id = @artisan_id;

-- =====================================================
-- 8) Contrôle qualité : artisans sans spécialité (doit être 0)
-- =====================================================
SELECT COUNT(*) AS artisans_without_specialty
FROM artisans a
LEFT JOIN specialties s ON s.id = a.specialty_id
WHERE s.id IS NULL;

-- =====================================================
-- 9) Contrôle qualité : spécialités sans catégorie (doit être 0)
-- =====================================================
SELECT COUNT(*) AS specialties_without_category
FROM specialties s
LEFT JOIN categories c ON c.id = s.category_id
WHERE c.id IS NULL;
