# Urban Explorer – Application Mobile City Guide
## Membres de l’équipe

Rizlène BERRAG

Amine KAOUTAR

Franck JOEL

## 1. Contexte et Objectifs

Urban Explorer est une application mobile de type City Guide développée avec React Native, Expo et TypeScript.

L’objectif de cette application est de permettre aux utilisateurs de :

Découvrir des lieux culturels (musées, monuments, parcs…)

Visualiser leurs emplacements sur une carte interactive

Planifier une visite grâce à un calendrier intégré

Prendre une photo souvenir et l’afficher comme avatar

Ce projet a été réalisé dans le cadre du TP final du module React Native afin de mettre en pratique les notions suivantes :

Navigation mobile

Consommation d’API

Gestion de l’état avec React

Utilisation de composants natifs



## 2. Technologies Utilisées

### Framework Mobile

React Native

Expo

Langage

TypeScript

### Librairies principales

React Navigation : gestion de la navigation entre les écrans

react-native-maps : affichage de la carte et des marqueurs

react-native-calendars : intégration du calendrier

expo-image-picker / expo-camera : prise de photo pour le profil

AsyncStorage (bonus) : sauvegarde locale des données


## 3. Architecture du Projet

Le projet est organisé de manière modulaire afin de faciliter la maintenance et la lisibilité du code.

Structure du projet

urban-explorer
│
├── src
│ ├── screens
│ │ ├── DiscoveryScreen.tsx
│ │ ├── MapScreen.tsx
│ │ ├── DetailScreen.tsx
│ │ └── ProfileScreen.tsx
│ │
│ ├── components
│ │ └── LieuCard.tsx
│ │
│ ├── types
│ │ └── Lieu.ts
│ │
│ └── services
│ └── api.ts
│
├── App.tsx
├── package.json
└── tsconfig.json

### Organisation des dossiers
screens

Contient les différents écrans de l’application.

components

Contient les composants réutilisables.

types

Contient les types TypeScript utilisés dans le projet.

services

Contient les fonctions liées aux appels API.



## 4. Navigation de l’Application

La navigation est réalisée avec React Navigation.

Bottom Tab Navigator

L’application comporte trois onglets principaux :

### Découverte

Affiche la liste des lieux culturels récupérés depuis l’API.

### Carte

Affiche les lieux sur une carte interactive avec des marqueurs.

### Mon Profil

Permet à l’utilisateur de prendre une photo selfie et de l’afficher comme avatar.

Stack Navigator

Dans l’onglet Découverte, un Stack Navigator permet de naviguer entre :

l’écran de liste des lieux

l’écran de détail d’un lieu

Cela permet d’afficher les informations détaillées d’un lieu sélectionné.



## 5. Intégration de l’API

L’application utilise l’API Open Data de la Ville de Paris afin de récupérer les lieux culturels.

URL de l’API

https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-culturels-a-paris/records?limit=30

### Données utilisées

Les informations récupérées sont :

nom_usuel : nom du lieu

adresse : adresse postale

coordonnees_geo.lat : latitude

coordonnees_geo.lon : longitude

### Gestion des données

L’appel API est effectué avec :

useEffect pour lancer la requête lors du chargement de l’écran

fetch pour récupérer les données

useState pour stocker les lieux dans l’état

Les données sont ensuite affichées dans une FlatList.




## 6. Composants Natifs Implémentés
### 6.1 Carte et Localisation

Bibliothèque utilisée : react-native-maps

Fonctionnalités :

Affichage d’une MapView plein écran

Placement de markers pour chaque lieu

Utilisation des coordonnées GPS récupérées depuis l’API

Affichage du nom du lieu lors du clic sur un marker

Carte centrée par défaut sur Paris

Coordonnées utilisées :

Latitude : 48.8566
Longitude : 2.3522


### 6.2 Calendrier

Bibliothèque utilisée : react-native-calendars

Fonctionnalités :

Intégration dans l’écran DetailScreen

Sélection d’une date pour planifier une visite

Stockage de la date sélectionnée dans le state

Affichage d’un message de confirmation


### Exemple :

Visite au Musée du Louvre planifiée le 2026-03-20



### 6.3 Caméra / Photo de Profil

Bibliothèque utilisée : expo-image-picker

Fonctionnalités :

Demande de permissions d’accès à la caméra

Possibilité de prendre un selfie

Affichage de la photo comme avatar utilisateur



## 7. Fonctionnalités Bonus
Géolocalisation utilisateur

Utilisation de expo-location pour :

détecter la position de l’utilisateur

centrer la carte sur sa position

Sauvegarde locale

Utilisation de AsyncStorage pour conserver :

la photo de profil

les dates de visite planifiées

Amélioration de l’interface

ActivityIndicator pendant le chargement des données

gestion des erreurs réseau

amélioration de l’ergonomie de l’application





## 8. Installation et Lancement du Projet
Cloner le projet

git clone https://github.com/RizleneBERRAG/urban-explorer.git

Installer les dépendances

npm install

ou

yarn install

Lancer l’application

expo start

L’application peut être testée sur :

simulateur Android

simulateur iOS

smartphone avec Expo Go



## 9. Répartition du Travail

### Rizlène BERRAG

Interface utilisateur

Gestion de la liste des lieux

### Amine KAOUTAR

Navigation et structure générale de l’application


### Franck JOEL

Intégration de la carte avec react-native-maps

Implémentation du calendrier pour planifier les visites



## 10. Conclusion

Ce projet nous a permis de mettre en pratique plusieurs concepts importants du développement mobile :

la création d’une application avec React Native

l’utilisation d’une API externe

la gestion de composants natifs

la structuration d’un projet mobile

L’application Urban Explorer constitue une base solide pour un futur guide touristique mobile interactif.
