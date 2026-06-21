# CyberTwin Frontend

Interface frontend Vue.js du projet CyberTwin.

## Prerequis

- Node.js 18+ (recommande: Node.js 20 LTS)
- npm (installe avec Node.js)

Verifie l'installation:

```bash
node -v
npm -v
```

## Installation

Depuis la racine du projet:

```bash
cd cybertwin-frontend
npm install
```

Cette commande installe les dependances du frontend definies dans `package.json`, notamment:

- `vue`
- `vite`
- `pinia`
- `vue-router`
- `chart.js`
- `vue-chartjs`

## Lancer le frontend en developpement

```bash
npm run dev
```

Vite affiche ensuite une URL locale (souvent `http://localhost:5173`).

## Build de production

```bash
npm run build
```

Les fichiers generes sont dans le dossier `dist/`.

## Previsualiser le build

```bash
npm run preview
```

## Lien avec le backend

Le frontend consomme l'API backend sur:

`http://localhost:3000`

Assure-toi que le backend est lance en parallele, sinon certaines pages (entreprise, actifs, vulnerabilites, dashboard, rapport) ne pourront pas charger les donnees.

## Resolution de problemes courants

1. `npm run dev` echoue juste apres installation:
	- Supprimer `node_modules` et `package-lock.json`, puis relancer `npm install`.
2. Erreurs CORS/API:
	- Verifier que le backend tourne bien sur `http://localhost:3000`.
3. Version de Node trop ancienne:
	- Mettre a jour Node.js vers une version LTS recente.

## Commandes utiles (resume)

```bash
npm install
npm run dev
npm run build
npm run preview
```
