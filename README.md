# Demo

Le projet est disponible à cette adresse
[twitter.gweltaz-calori.com](https://twitter.gweltaz-calori.com)

# Lancer le projet

```
cp .env .env.dist
npm install
npm run start
```

# Architecture

Le `.env` contient toutes les variables d'environnement relatif à l'application (Port, tokens, etc )
Le dossier `/src` contient tout le code relatif au serveur
Le dossier `/client` contient tout le code relatif au client

# Détail du Serveur

Le serveur est composé de deux types de `streams`

* Transform -> Pour le traitement et la modification
* Writable -> Pour l'output final en l'occurence vers des sockets

Une connection Socket permet de notifier le client de l'arrivé de nouvelles informations en temps réel

Le serveur contient également 3 routes d'api donnant des informations complémentaires

# Choix techniques

J'ai fait le choix d'uiliser un `.env` ce qui permet entre autre d'avoir une configuration propre pour chacun des utilisateurs du projet mais aussi de potentiellement utiliser des variable associées au système en production

J'ai fait le choix d'utiliser `async/await` pour des requêtes http simples, les méthodes du client twitter retournant une `Promise`, cela permet une lisibilité du code simple

J'ai fait le choix d'utiliser `les streams` pour lire petit à petit les données et ainsi à envoyer les informations sans surcharger le serveur.

J'ai fait le choix d'uiliser le wrapper `node-twitter` qui permet de simplifier les appels HTTP à l'API de twitter

J'ai fait le choix d'utiliser `express` pour les routes d'api simples mais surtout pour la possibilité de mettre en place un dossier `static` ou `public` par défaut

# Difficultés rencontrées

La principale difficulté que j'ai rencontré est la modification des filtres du stream twitter à la volée. En effet le seul moyen de modifier le filtre de ce stream et de le détruire et donc de potentiellement devoir attendre avant de pouvoir faire de nouvelles requêtes. Pour palier à ce problème j'ai simplement fait en sorte que la requête du stream porte sur tous les hashtags populaires. C'est ensuite via le stream que je filtre sans avoir besoin de détruire le stream
