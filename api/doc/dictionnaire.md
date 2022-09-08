# Dictionnaire de données

## Les différentes Tables

### Table *user*

Champ | Type | Spécificités | Description
--- | --- | --- | ---
code_user | INT | GENERATED ALWAYS AS IDENTITY PRIMARY KEY | Identifiant de l'utilisateur
email | EMAIL | NOT NULL UNIQUE | email de l'utilisateur, fait office de login
password | TEXT | NOT NULL | mot de passe de l'utilisateur, qui sera crypté
lastname | TEXT | NOT NULL | Nom de l'utilisateur
firstname | TEXT | NOT NULL | Prénom de l'utilisateur
profile_picture | TEXT | | lien vers un site de stockage de photo (genre [Cloudinary](https://cloudinary.com/))
created_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | date de création du compte utilisateur
updated_at | TIMESTAMPTZ | | date de modification du compte utilisateur

### Table *collection*

Champ | Type | Spécificités | Description
--- | --- | --- | ---
code_collection | INT | GENERATED ALWAYS AS IDENTITY PRIMARY KEY | Identifiant de la collection
label | TEXT | | Nom de la collection
code_user | INT | NOT NULL REFERENCES user(code_user) | Mise en relation des tables User et Collection
created_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | date de création de la collection
updated_at | TIMESTAMPTZ | | date de modification de la collection

### Table *system*

Champ | Type | Spécificités | Description
--- | --- | --- | ---
code_system | INT | NOT NULL UNIQUE | Identifiant du système
name | TEXT | NOT NULL | Nom du système
company | TEXT | | Nom de la compagnie
type | TEXT | NOT NULL | Type du système (console, console portable, ect...)
release_date | INT | NOT NULL | Date de lancement du système
end_date | INT | | Date de fin du système
support_type | TEXT | NOT NULL | Type de support (cartouche, cd, etc...)
media | TEXT | | Lien vers la photo du système (à stocker sur Cloudinary?)
created_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | date de création du système
updated_at | TIMESTAMPTZ | | date de modification du système

### Table *game*

Champ | Type | Spécificités | Description
--- | --- | --- | ---
code_game | INT | NOT NULL UNIQUE| Identifiant du jeu
title | TEXT | NOT NULL | Titre du jeu
code_system | INT | REFERENCES système (code_système) | Identifiant du système
created_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | date de création du jeu
updated_at | TIMESTAMPTZ | | date de modification du jeu

### Table d'association *collection_has_system* entre *collection* et *system*

Champ | Type | Spécificités | Description
--- | --- | --- | ---
code_collection | INT | NOT NULL REFERENCES collection (code_collection) | Identifiant de la collection
code_system | INT | NOT NULL REFERENCES système (code_system) | Identifiant du système
code_game | INT | NOT NULL REFERENCES système (code_game) | Identifiant du jeu

### Table *desc*

(Cette table fera appel à une API externe (screenscraper), mais les données récoltées seront ensuite stockées en base de données)

Champ | Type | Spécificités | Description
--- | --- | --- | ---
code_game | INT | NOT NULL UNIQUE | Identifiant du jeu
title | TEXT | NOT NULL | Titre du jeu
code_system | INT | NOT NULL REFERENCES système (code_système) | Identifiant du système
publisher | TEXT | | Éditeur du jeu
developer | TEXT | | Développeur du jeu
players | TEXT | | Nombre de joueur du jeu
rating | TEXT | | Note du jeu
desc | TEXT | | Synopsis du jeu
release_date | TEXT | | Date de sortie du jeu
genre | TEXT | | Genre du jeu
medias | TEXT | | Lien vers la photo du jeu (mettre l'écran titre? la cartouche du jeu? et ensuite la stocker? Pour la video, s'il y en a une, faire appel à l'API)
created_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | date de création du jeu
updated_at | TIMESTAMPTZ | | date de modification du jeu

### Table *contact*

Champ | Type | Spécificités | Description
--- | --- | --- | ---
code_contact | INT | GENERATED ALWAYS AS IDENTITY PRIMARY KEY | Identifiant de contact
firstname | TEXT | NOT NULL | Prénom de l'utilisateur
lastname | TEXT | | nom de l'utilisateur
email | EMAIL | NOT NULL | Email de l'utilisateur
message | TEXT | NOT NULL | Message de l'utilisateur
created_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | date de création du message
updated_at | TIMESTAMPTZ | | date de modification du message
