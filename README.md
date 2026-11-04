# Terres Saintes — version de travail enrichie

Atlas biblique interactif fondé sur Leaflet.

## Principes documentaires

1. **La Bible est la source première** pour les événements qu'elle rapporte. Chaque donnée narrative doit renvoyer à un passage précis.
2. Les données de tradition, d'histoire et d'archéologie sont présentées comme des éclairages distincts, jamais comme des corrections automatiques du texte biblique.
3. Distinguer explicitement : texte biblique ; tradition ; attestations historiques/archéologiques ; hypothèses de reconstruction.
4. Ne pas attribuer de date absolue, de coordonnées ou de tracé précis quand les sources ne les permettent pas.
5. Toute géométrie schématique doit être signalée comme telle. Les frontières politiques ne doivent pas être présentées comme exactes sans source et période précises.
6. Pour les travaux futurs, documenter chaque objet avec références bibliques, références universitaires (auteur, titre, publication, pages/DOI ou URL), date de consultation et niveau de confiance.

## Modifications intégrées dans cette version

- Ajout de fonds de carte : OpenStreetMap classique, imagerie satellite Esri, relief ombré Esri et OpenTopoMap.
- Menus de couches convertis en panneaux accordéon avec groupes de filtres imbriqués.
- Affichage progressif selon le zoom : moins de lieux à petite échelle, étiquettes et détails à plus grande échelle.
- Correction de l'itinéraire de Jonas : aucune date absolue n'est attribuée ; seule Joppé est marquée ; aucune ligne vers l'Espagne ni coordonnée hypothétique de Tarsis n'est dessinée. Le texte (Jon 1,3) nomme le départ et la destination, mais pas la date ni le parcours.
- Tarsis est conservée comme lieu à localisation discutée sans point cartographique fixe.

## Références de conception

- Atlas biblique des Bernardins : https://atlas-biblique-bernardins.lovable.app/
- BibleProject Atlas : https://atlas.bible-project.com/

Ces sites sont des références d'inspiration et de comparaison ; cette version n'en copie pas les données.

## Limites à traiter dans les prochaines phases

Les données actuelles restent un prototype. Les coordonnées, emprises territoriales, périodes et itinéraires existants doivent faire l'objet d'une vérification systématique avant publication comme données historiques établies. Il faudra enrichir les fiches avec des références universitaires vérifiables et remplacer les polygones très schématiques par des géométries sourcées. Les estimations de durée de déplacement doivent également être affinées par type de terrain, saison, réseau viaire et conditions de navigation.

## Lancement

Ouvrir `index.html` dans un navigateur ou publier le contenu du dépôt avec GitHub Pages.
