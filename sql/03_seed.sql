/*
-------------------------------------------------------
Script: 03_seed.sql
Projet: Trouve ton artisan
Description:
Alimentation de la base de données à partir du fichier data.xlsx fournis.
Pré-requis:
- Exécuter 00_create_database.sql puis 02_schema.sql avant
-------------------------------------------------------
*/

USE trouve_ton_artisan;

-- Rejouable : on vide les tables dans l'ordre enfant -> parent
SET FOREIGN_KEY_CHECKS = 0;

DELETE FROM artisans;
DELETE FROM specialties;
DELETE FROM categories;

-- remet à zéro les auto-incréments
ALTER TABLE artisans AUTO_INCREMENT = 1;
ALTER TABLE specialties AUTO_INCREMENT = 1;
ALTER TABLE categories AUTO_INCREMENT = 1;

SET FOREIGN_KEY_CHECKS = 1;


START TRANSACTION;

-- 1) Catégories
INSERT INTO categories (name) VALUES
  ('Alimentation'),
  ('Bâtiment'),
  ('Fabrication'),
  ('Services');

-- 2) Spécialités (rattachées à une catégorie)
INSERT INTO specialties (name, category_id)
VALUES ('Boucher', (SELECT id FROM categories WHERE name = 'Alimentation'));
INSERT INTO specialties (name, category_id)
VALUES ('Boulanger', (SELECT id FROM categories WHERE name = 'Alimentation'));
INSERT INTO specialties (name, category_id)
VALUES ('Chocolatier', (SELECT id FROM categories WHERE name = 'Alimentation'));
INSERT INTO specialties (name, category_id)
VALUES ('Traiteur', (SELECT id FROM categories WHERE name = 'Alimentation'));
INSERT INTO specialties (name, category_id)
VALUES ('Chauffagiste', (SELECT id FROM categories WHERE name = 'Bâtiment'));
INSERT INTO specialties (name, category_id)
VALUES ('Electricien', (SELECT id FROM categories WHERE name = 'Bâtiment'));
INSERT INTO specialties (name, category_id)
VALUES ('Menuisier', (SELECT id FROM categories WHERE name = 'Bâtiment'));
INSERT INTO specialties (name, category_id)
VALUES ('Plombier', (SELECT id FROM categories WHERE name = 'Bâtiment'));
INSERT INTO specialties (name, category_id)
VALUES ('Bijoutier', (SELECT id FROM categories WHERE name = 'Fabrication'));
INSERT INTO specialties (name, category_id)
VALUES ('Couturier', (SELECT id FROM categories WHERE name = 'Fabrication'));
INSERT INTO specialties (name, category_id)
VALUES ('Ferronier', (SELECT id FROM categories WHERE name = 'Fabrication'));
INSERT INTO specialties (name, category_id)
VALUES ('Coiffeur', (SELECT id FROM categories WHERE name = 'Services'));
INSERT INTO specialties (name, category_id)
VALUES ('Fleuriste', (SELECT id FROM categories WHERE name = 'Services'));
INSERT INTO specialties (name, category_id)
VALUES ('Toiletteur', (SELECT id FROM categories WHERE name = 'Services'));
INSERT INTO specialties (name, category_id)
VALUES ('Webdesign', (SELECT id FROM categories WHERE name = 'Services'));

-- 3) Artisans (rattachés à une spécialité)
INSERT INTO artisans (name, rating, city, about, email, website, is_featured, specialty_id)
VALUES (
  'Boucherie Dumont',
  4.5,
  'Lyon',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ',
  'boucherie.dumond@gmail.com',
  NULL,
  0,
  (SELECT s.id
   FROM specialties s
   JOIN categories c ON c.id = s.category_id
   WHERE s.name = 'Boucher' AND c.name = 'Alimentation')
);
INSERT INTO artisans (name, rating, city, about, email, website, is_featured, specialty_id)
VALUES (
  'Au pain chaud',
  4.8,
  'Montélimar',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ',
  'aupainchaud@hotmail.com',
  NULL,
  1,
  (SELECT s.id
   FROM specialties s
   JOIN categories c ON c.id = s.category_id
   WHERE s.name = 'Boulanger' AND c.name = 'Alimentation')
);
INSERT INTO artisans (name, rating, city, about, email, website, is_featured, specialty_id)
VALUES (
  'Chocolaterie Labbé',
  4.9,
  'Lyon',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ',
  'chocolaterie-labbe@gmail.com',
  'https://chocolaterie-labbe.fr',
  1,
  (SELECT s.id
   FROM specialties s
   JOIN categories c ON c.id = s.category_id
   WHERE s.name = 'Chocolatier' AND c.name = 'Alimentation')
);
INSERT INTO artisans (name, rating, city, about, email, website, is_featured, specialty_id)
VALUES (
  'Traiteur Truchon',
  4.1,
  'Lyon',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ',
  'contact@truchon-traiteur.fr',
  'https://truchon-traiteur.fr',
  0,
  (SELECT s.id
   FROM specialties s
   JOIN categories c ON c.id = s.category_id
   WHERE s.name = 'Traiteur' AND c.name = 'Alimentation')
);
INSERT INTO artisans (name, rating, city, about, email, website, is_featured, specialty_id)
VALUES (
  'Orville Salmons',
  5.0,
  'Evian',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ',
  'o-salmons@live.com',
  NULL,
  1,
  (SELECT s.id
   FROM specialties s
   JOIN categories c ON c.id = s.category_id
   WHERE s.name = 'Chauffagiste' AND c.name = 'Bâtiment')
);
INSERT INTO artisans (name, rating, city, about, email, website, is_featured, specialty_id)
VALUES (
  'Mont Blanc Eléctricité',
  4.5,
  'Chamonix',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ',
  'contact@mont-blanc-electricite.com',
  'https://mont-blanc-electricite.com',
  0,
  (SELECT s.id
   FROM specialties s
   JOIN categories c ON c.id = s.category_id
   WHERE s.name = 'Electricien' AND c.name = 'Bâtiment')
);
INSERT INTO artisans (name, rating, city, about, email, website, is_featured, specialty_id)
VALUES (
  'Boutot & fils',
  4.7,
  'Bourg-en-bresse',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ',
  'boutot-menuiserie@gmail.com',
  'https://boutot-menuiserie.com',
  0,
  (SELECT s.id
   FROM specialties s
   JOIN categories c ON c.id = s.category_id
   WHERE s.name = 'Menuisier' AND c.name = 'Bâtiment')
);
INSERT INTO artisans (name, rating, city, about, email, website, is_featured, specialty_id)
VALUES (
  'Vallis Bellemare',
  4.0,
  'Vienne',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ',
  'v.bellemare@gmail.com',
  'https://plomberie-bellemare.com',
  0,
  (SELECT s.id
   FROM specialties s
   JOIN categories c ON c.id = s.category_id
   WHERE s.name = 'Plombier' AND c.name = 'Bâtiment')
);
INSERT INTO artisans (name, rating, city, about, email, website, is_featured, specialty_id)
VALUES (
  'Claude Quinn',
  4.2,
  'Aix-les-bains',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ',
  'claude.quinn@gmail.com',
  NULL,
  0,
  (SELECT s.id
   FROM specialties s
   JOIN categories c ON c.id = s.category_id
   WHERE s.name = 'Bijoutier' AND c.name = 'Fabrication')
);
INSERT INTO artisans (name, rating, city, about, email, website, is_featured, specialty_id)
VALUES (
  'Amitee Lécuyer',
  4.5,
  'Annecy',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ',
  'a.amitee@hotmail.com',
  'https://lecuyer-couture.com',
  0,
  (SELECT s.id
   FROM specialties s
   JOIN categories c ON c.id = s.category_id
   WHERE s.name = 'Couturier' AND c.name = 'Fabrication')
);
INSERT INTO artisans (name, rating, city, about, email, website, is_featured, specialty_id)
VALUES (
  'Ernest Carignan',
  5.0,
  'Le Puy-en-Velay',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ',
  'e-carigan@hotmail.com',
  NULL,
  0,
  (SELECT s.id
   FROM specialties s
   JOIN categories c ON c.id = s.category_id
   WHERE s.name = 'Ferronier' AND c.name = 'Fabrication')
);
INSERT INTO artisans (name, rating, city, about, email, website, is_featured, specialty_id)
VALUES (
  'Royden Charbonneau',
  3.8,
  'Saint-Priest',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ',
  'r.charbonneau@gmail.com',
  NULL,
  0,
  (SELECT s.id
   FROM specialties s
   JOIN categories c ON c.id = s.category_id
   WHERE s.name = 'Coiffeur' AND c.name = 'Services')
);
INSERT INTO artisans (name, rating, city, about, email, website, is_featured, specialty_id)
VALUES (
  'Leala Dennis',
  3.8,
  'Chambéry',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ',
  'l.dennos@hotmail.fr',
  'https://coiffure-leala-chambery.fr',
  0,
  (SELECT s.id
   FROM specialties s
   JOIN categories c ON c.id = s.category_id
   WHERE s.name = 'Coiffeur' AND c.name = 'Services')
);
INSERT INTO artisans (name, rating, city, about, email, website, is_featured, specialty_id)
VALUES (
  'C''est sup''hair',
  4.1,
  'Romans-sur-Isère',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ',
  'sup-hair@gmail.com',
  'https://sup-hair.fr',
  0,
  (SELECT s.id
   FROM specialties s
   JOIN categories c ON c.id = s.category_id
   WHERE s.name = 'Coiffeur' AND c.name = 'Services')
);
INSERT INTO artisans (name, rating, city, about, email, website, is_featured, specialty_id)
VALUES (
  'Le monde des fleurs',
  4.6,
  'Annonay',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ',
  'contact@le-monde-des-fleurs-annonay.fr',
  'https://le-monde-des-fleurs-annonay.fr',
  0,
  (SELECT s.id
   FROM specialties s
   JOIN categories c ON c.id = s.category_id
   WHERE s.name = 'Fleuriste' AND c.name = 'Services')
);
INSERT INTO artisans (name, rating, city, about, email, website, is_featured, specialty_id)
VALUES (
  'Valérie Laderoute',
  4.5,
  'Valence',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ',
  'v-laredoute@gmail.com',
  NULL,
  0,
  (SELECT s.id
   FROM specialties s
   JOIN categories c ON c.id = s.category_id
   WHERE s.name = 'Toiletteur' AND c.name = 'Services')
);
INSERT INTO artisans (name, rating, city, about, email, website, is_featured, specialty_id)
VALUES (
  'CM Graphisme',
  4.4,
  'Valence',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ',
  'contact@cm-graphisme.com',
  'https://cm-graphisme.com',
  0,
  (SELECT s.id
   FROM specialties s
   JOIN categories c ON c.id = s.category_id
   WHERE s.name = 'Webdesign' AND c.name = 'Services')
);

COMMIT;
