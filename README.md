# Social_Network_Project

![forthebadge](https://github.com/Mat95rix7/Social_Network_Project/blob/main/api/images/profil/star.png)

## Sommaire

- [Présentation](#présentation)
- [Langages utilisés](#langages-utilisés)
- [Installation](#installation)
- [Utilisation](#utilisation)

## Présentation

Le projet Social Network Project a pour objectif d'offrir un reseau social privé à utilisé entre groupe pour échanger d'informations des photos et rester toujours en contact.

## Langages utilisés

Le projet est constitué d'un backend (api) realisé avec node JS, Express et la base de données MangoDB et un frontend (Client) réalise avec le framework Vue.JS et tailwind pour le css.

## Installation

### Dépendances

Avant de cloner le projet, assurez-vous d'avoir installé [Node.js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Pour installer les dépendances, il faut acceder au dossiers concernés ( api / Client ) puis utilisez l'une des commandes suivantes :

Dossier du  backend : 
            
            ```bash
            cd api
            
            ```bash
            
            # Utilisation de yarn
            yarn install
            
            # Utilisation de npm
            npm install

Dossier au frontend : 
            
            ```bash
            cd client
              
              # Utilisation de yarn
            yarn install
            
            # Utilisation de npm
            npm install

Pour lancer le serveur de développement, utilisez la commande suivante :

il faut lancer en premier le backend avec la commande :

            ```bash
            
            npm start

puis on lance le frond avec la commande : 

            ```bash
            
            npm run dev
            ```
Accédez à http://localhost:5173/ dans votre navigateur pour accéder au serveur de développement.

#### Utilisation

**Options pour l'Admin :**

  - Bouton de connexion / déconnexion
  - (Si connecté) peut créer, modifier, supprimer, liker et disliker des posts
  - (Si connecté) peut modifier ou supprimer les posts des autres utilisateurs.
  - (Si connecté) peut mettre ou modifier sa photo de profil. 

**Options pour les Autres Utilisateurs :**

  - Bouton de connexion / déconnexion
  - (Si connecté) peut créer, modifier, supprimer, liker et disliker des posts
  - (Si connecté) peut mettre ou modifier leur photos de profil.

Note :
  Les informations sur les variables d'environnement et le mode admin sont le fichier .default