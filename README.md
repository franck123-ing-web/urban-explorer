Urban Explorer – Application Mobile City Guide
Membres de l’équipe

Rizlène BERRAG

Amine KAOUTAR

Franck JOEL

1. Contexte et Objectifs

Urban Explorer est une application mobile de type City Guide développée avec React Native, TypeScript et Expo.

L'objectif de l'application est de permettre aux utilisateurs de :

Découvrir des lieux culturels (musées, monuments, parcs…)

Visualiser leur emplacement sur une carte interactive

Planifier une visite grâce à un calendrier

Prendre une photo souvenir et l'utiliser comme avatar

Ce projet a été réalisé dans le cadre du TP final du module React Native, afin de mettre en pratique les notions vues en cours :

Navigation mobile

Consommation d'API

Gestion de l'état

Utilisation de composants natifs

2. Technologies Utilisées
Framework Mobile

React Native

Expo

Langage

TypeScript

Librairies principales

React Navigation – gestion de la navigation

react-native-maps – affichage de la carte

react-native-calendars – calendrier

expo-image-picker / expo-camera – caméra et photo

AsyncStorage (bonus) – sauvegarde locale

3. Architecture du Projet

Le projet est organisé de manière modulaire afin de séparer les responsabilités.

urban-explorer
│
├── src
│   ├── screens
│   │   ├── DiscoveryScreen.tsx
│   │   ├── MapScreen.tsx
│   │   ├── DetailScreen.tsx
│   │   └── ProfileScreen.tsx
│   │
│   ├── components
│   │   └── LieuCard.tsx
│   │
│   ├── types
│   │   └── Lieu.ts
│   │
│   └── services
│       └── api.ts
│
├── App.tsx
├── package.json
└── tsconfig.json
Principe de séparation

screens/ : contient les écrans principaux de l'application

components/ : composants réutilisables

types/ : types TypeScript

services/ : gestion des appels API

Cette organisation permet un code plus maintenable et plus lisible.

4. Navigation de l’Application

La navigation repose sur React Navigation.

Bottom Tab Navigator

L’application contient trois onglets principaux :

Découverte

Affiche la liste des lieux culturels récupérés depuis l’API.

Carte

Affiche les lieux sur une carte interactive avec des marqueurs.

Mon Profil

Permet à l'utilisateur de prendre une photo selfie et l'afficher comme avatar.

Stack Navigator

Dans l’onglet Découverte, un Stack Navigator permet de naviguer entre :

Liste des lieux

Détail d’un lieu

Cela permet d'afficher les informations détaillées d’un lieu sélectionné.

5. Intégration de l’API

L’application utilise l’API Open Data de la Ville de Paris.

URL de l’API
https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-culturels-a-paris/records?limit=30
Données utilisées

Les informations récupérées sont :

nom_usuel : nom du lieu

adresse : adresse postale

coordonnees_geo.lat : latitude

coordonnees_geo.lon : longitude

Gestion des données

L’appel API est effectué avec :

useEffect pour lancer la requête au chargement

fetch pour récupérer les données

useState pour stocker les lieux

Les données sont ensuite affichées avec FlatList.

6. Composants Natifs Implémentés
6.1 Carte et Localisation

Bibliothèque utilisée :

react-native-maps

Fonctionnalités :

Affichage d'une MapView plein écran

Placement de markers pour chaque lieu

Utilisation des coordonnées GPS récupérées depuis l’API

Affichage du nom du lieu au clic sur un marker

Carte centrée par défaut sur Paris

Latitude : 48.8566
Longitude : 2.3522
6.2 Calendrier

Bibliothèque utilisée :

react-native-calendars

Fonctionnalités :

Intégration dans l'écran DetailScreen

Sélection d’une date de visite

Stockage de la date dans le state

Affichage d’un message de confirmation

Exemple :

Visite au Musée du Louvre planifiée le 2026-03-20
6.3 Caméra / Photo de Profil

Bibliothèque utilisée :

expo-image-picker

Fonctionnalités :

Demande de permissions caméra

Prise d’une photo selfie

Affichage de la photo comme avatar utilisateur

7. Fonctionnalités Bonus

Certaines améliorations peuvent être ajoutées pour enrichir l’application :

Géolocalisation utilisateur

Utilisation de :

expo-location

Permet de :

détecter la position de l'utilisateur

centrer la carte sur sa position

Sauvegarde locale

Utilisation de :

AsyncStorage

Permet de conserver :

la photo de profil

les dates de visite

Amélioration UI/UX

ActivityIndicator pendant le chargement des données

gestion des erreurs réseau

interface plus fluide et plus claire

8. Installation et Lancement du Projet
Cloner le projet
git clone <URL_DU_REPO>
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

9. Répartition du Travail
Rizlène BERRAG

Interface utilisateur

Gestion de la liste des lieux

Amine KAOUTAR

Navigation et structure de l’application

Franck JOEL

Intégration de la carte (react-native-maps)

Implémentation du calendrier pour planifier les visites

10. Conclusion

Ce projet nous a permis de mettre en pratique plusieurs concepts essentiels du développement mobile :

architecture d’application React Native

navigation mobile

intégration d’API

utilisation de composants natifs

L’application Urban Explorer constitue une base solide pour une application de guide touristique moderne et interactive.
