# CyberTwin - Backend

API REST pour la gestion d'une entreprise fictive, de ses actifs informatiques et de l'évaluation de son risque cyber.

## Pres du projet

CyberTwin permet de modéliser une entreprise, gérer son inventaire d'actifs, associer des vulnérabilités à ces actifs, et calculer automatiquement un score de risque cyber.

Ce backend fournit l'API utilisé par le frontend Vue.js.

## Stack 

- Node.js
- Express.js
- MySQL
- Sequelize (ORM)

## Installation

1. Cloner le repo et se placer dans le dossier `backend` :
```bash
cd backend
npm install
```

2. Créer une base de données MySQL nommée `cybertwin`  :
```sql
CREATE DATABASE cybertwin;
```

3. Créer un fichier `.env` à la racine de `backend/` avec ce contenu + l'adapter selon la config :

DB_HOST=localhost

DB_PORT=3306

DB_USER=root

DB_PASSWORD=ton_mot_de_passe

DB_NAME=cybertwin

PORT=3000

## Exécution

Mode dev  :
```bash
npm run dev
```

Mode production :
```bash
npm start
```


## Fonctionnalités

- Gestion de l'entreprise (consultation, modification)
- Gestion des actifs (création, lecture, modification, suppression)
- Gestion des vulnérabilités liées à un actif
- Calcul automatique du niveau de risque cyber (faible / moyen / élevé) + recommandations

Voir [API.md](./API.md) pour le détail des routes disponibles.