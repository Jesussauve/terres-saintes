# Terres Saintes — version 2 (prototype enrichi)

## Lancer le site
1. Décompresser l’archive.
2. Ouvrir `index.html` dans un navigateur récent.
3. Une connexion Internet est nécessaire pour Leaflet et les fonds de carte.

Pour un fonctionnement plus fiable, lancer un serveur local dans le dossier : `python -m http.server 8000`, puis ouvrir `http://localhost:8000`.

## Changements de cette version
- Fond physique sans affichage des routes ni des noms de villes modernes (service de relief Esri), avec OpenTopoMap conservé en option.
- Noms des villes affichés dans une couche indépendante, qui suit la langue choisie (français, anglais, latin) pour les lieux renseignés.
- Curseur chronologique à l’année, avec saisie directe d’une année et boutons de progression annuelle.
- Fleuves dessinés comme des lignes et sélectionnables sur leur tracé, avec une zone de clic élargie mais invisible.
- Ajout de régions historiques de Galilée, Samarie et Judée, affichées avec des contours et remplissages discrets.
- Emprises impériales désactivées par défaut et rendues très discrètes : les anciennes géométries du prototype restent schématiques et ne sont pas des frontières fiables.
- Ajout de lieux et de séquences de déplacements de Jacob, Jonas, Tobie et Jésus en Galilée, avec références bibliques et avertissements lorsque le trajet exact n’est pas fourni par le texte.
- Le panneau « À propos » rappelle que l’Écriture est la source première ; les autres sources éclairent le contexte.

## Limites à connaître
- Les tracés ajoutés sont des séquences de lieux bibliques, pas des routes antiques reconstituées. La Bible ne donne pas toujours l’origine, les étapes ou le chemin précis : l’atlas ne doit pas les inventer.
- L’identification de Tarsis est discutée ; son point sur la carte est une hypothèse illustrative, pas une certitude.
- Les contours de Galilée, Samarie et Judée sont des repères régionaux approximatifs, non des frontières administratives exactes.
- Les polygones impériaux du prototype doivent encore être remplacés par des géométries historiques sourcées.
- Le fond physique utilise actuellement un service de relief Esri ancien ; sa disponibilité et ses conditions peuvent évoluer. Une solution cartographique pérenne devra être retenue avant une diffusion durable.
- Le relief détaillé et les courbes de niveau au 1:25 000 ne sont pas intégrés.
- Les fiches complètes ne sont pas encore toutes traduites ; les noms de villes sont traduits pour les entrées déjà renseignées.
- Les 73 livres catholiques et l’index complet des lieux bibliques restent à intégrer.
- La mesure de distance est à vol d’oiseau. Les estimations de durée restent indicatives et ne reposent pas encore sur un réseau antique de routes, cols, gués et ports.

## Sources et principes
- Le texte biblique est la source première pour les événements et déplacements qu’il rapporte. Les références sont indiquées dans les fiches.
- Les traditions, identifications historiques, données archéologiques et hypothèses doivent être distinguées et documentées séparément.
- Fond de relief : service cartographique Esri, dont le service exact peut évoluer ; attribution affichée sur la carte.
- Fond topographique optionnel : OpenTopoMap, https://opentopomap.org/ (conditions et attribution du fournisseur).
- Leaflet : https://leafletjs.com/ (BSD-2-Clause).

## Publication sur GitHub Pages
Remplacer les fichiers du dépôt par le contenu de cette archive en conservant `index.html` à la racine, puis attendre le redéploiement GitHub Pages.
