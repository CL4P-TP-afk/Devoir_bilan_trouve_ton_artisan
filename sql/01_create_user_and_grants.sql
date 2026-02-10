/*
-------------------------------------------------------
Script: 01_create_user_and_grants.sql
Projet: Trouve ton artisan
Description:
Création d’un utilisateur SQL dédié à l’application
et attribution des droits nécessaires.
-------------------------------------------------------
*/
-- Suppression de l'utilisateur 'app_trouve_artisan'@'localhost' s'il existe
DROP USER IF EXISTS 'app_trouve_artisan'@'localhost';

-- Création de l'utilisateur applicatif
CREATE USER IF NOT EXISTS 'app_trouve_artisan'@'localhost'
IDENTIFIED BY 'ChangeMe!123';

-- Attribution des droits sur la base du projet
GRANT SELECT, INSERT, UPDATE, DELETE
ON trouve_ton_artisan.*
TO 'app_trouve_artisan'@'localhost';

-- Principe du moindre privilège :
-- l'utilisateur applicatif ne peut pas modifier la structure de la base


-- Application des changements
FLUSH PRIVILEGES;
