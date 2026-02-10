/*
-------------------------------------------------------
Script: 00_create_database.sql
Projet: Trouve ton artisan
Description:
Création de la base de données principale du projet.
Ce script peut être exécuté plusieurs fois sans erreur.
-------------------------------------------------------
*/

-- Suppression de la base si elle existe déjà
DROP DATABASE IF EXISTS trouve_ton_artisan;

-- Création de la base de données
CREATE DATABASE IF NOT EXISTS trouve_ton_artisan
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;

-- Utilisation de la base
USE trouve_ton_artisan;
