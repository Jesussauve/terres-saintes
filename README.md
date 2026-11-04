# Terres Saintes — première version

## Lancer le site
1. Décompresser `terres-saintes.zip`.
2. Ouvrir `index.html` dans un navigateur récent.
3. Une connexion Internet est nécessaire pour charger Leaflet et les fonds de carte.

Pour un fonctionnement plus fiable, lancer un petit serveur local dans le dossier :
- Python : `python -m http.server 8000`
- Puis ouvrir `http://localhost:8000`

## Publier gratuitement
Le dossier peut être publié sur GitHub Pages :
1. Créer un dépôt public GitHub.
2. Ajouter tous les fichiers du dossier.
3. Dans Settings > Pages, choisir la branche `main` et le dossier `/root`.
4. Le site sera publié à l'adresse `https://<utilisateur>.github.io/<depot>/`.

## Ce qui fonctionne déjà
- Carte du bassin méditerranéen et du Proche-Orient, zoom et déplacement.
- Fonds OpenStreetMap et OpenTopoMap.
- Échelle cartographique dynamique (en km).
- Curseur chronologique de 2000 av. J.-C. à 70 apr. J.-C., avec lecture automatique.
- Couches naturelles : hydrographie et polygones de végétation schématiques.
- Couches historiques filtrées par date : pouvoirs, villes et itinéraires.
- Fiches contextuelles cliquables pour les villes, territoires et itinéraires.
- Filtrage Ancien / Nouveau Testament.
- Outil de mesure entre deux points avec estimations à pied, à cheval et par mer.
- Choix de langue d'interface préparé (français, anglais, latin).

## Limites importantes de cette version
- Les données géographiques historiques sont un petit jeu de démonstration, pas un atlas complet.
- Les polygones politiques sont schématiques et ne doivent pas être lus comme des frontières exactes.
- Les itinéraires sont des tracés pédagogiques, parfois très hypothétiques.
- La végétation est une couche illustrative, pas une reconstitution datée.
- Le relief est visible dans le fond topographique, mais les courbes de niveau à grande échelle (1:25 000 et plus détaillées) ne sont pas intégrées.
- Le calcul des trajets mesure une distance directe. Une vraie estimation par réseau antique demanderait un graphe de routes, cols, gués et ports.
- Les traductions complètes des fiches et données ne sont pas encore réalisées ; seul le sélecteur de langue est préparé.
- La couche d'hydrographie dessinée dans cette version est une sélection illustrative, non exhaustive.

## Sources et conditions
- Leaflet : https://leafletjs.com/ (BSD-2-Clause).
- OpenStreetMap : https://www.openstreetmap.org/copyright ; respecter la politique d'utilisation des tuiles https://operations.osmfoundation.org/policies/tiles/.
- OpenTopoMap : https://opentopomap.org/ ; attribution et conditions indiquées sur le site.
- Google Fonts (typographies) : https://fonts.google.com/ ; chargement externe facultatif.

## Évolutions recommandées
1. Remplacer les données de démonstration par des données validées, documentées et sourcées.
2. Créer des périodes politiques distinctes et des géométries plus précises.
3. Ajouter des villes avec variantes linguistiques et chrononymes.
4. Ajouter les couches de relief et courbes de niveau via des données altimétriques ouvertes, sans prétendre à une précision indisponible.
5. Créer un réseau antique de routes terrestres et maritimes pour le calcul des temps de parcours.
6. Ajouter les 73 livres catholiques, les références bibliques et un index des lieux.
