# Documentation de l'API 

Base URL : `http://localhost:3000`

Toutes les requêtes et reps sont en JSON.

---

## Entreprise

### GET /company
Récupère les informations de l'entreprise.

**rep 200**
```json
{
  "id": 1,
  "name": "TechNova SARL",
  "sector": "E-commerce",
  "employees": 25,
  "servers": 4,
  "clientWorkstations": 20,
  "exposedServices": "Site web,API de paiement,Webmail"
}
```

### PUT /company
Crée ou met à jour l'entreprise.

**Body**
```json
{
  "name": "TechNova SARL",
  "sector": "E-commerce",
  "employees": 25,
  "servers": 4,
  "clientWorkstations": 20,
  "exposedServices": "Site web,API de paiement,Webmail"
}
```

**rep 200** : l'entreprise mise à jour.

---

## Actifs

### GET /assets
Liste tous les actifs (avec leurs vulnérabilités associées).

**rep 200**
```json
[
  {
    "id": 1,
    "type": "Serveur Web",
    "name": "Serveur principal",
    "exposedToInternet": true,
    "Vulnerabilities": []
  }
]
```

### POST /assets
Crée un nouvel actif.

**Body**
```json
{
  "type": "Serveur Web",
  "name": "Serveur principal",
  "exposedToInternet": true
}
```
Types possibles : `Serveur Web`, `Base de données`, `Poste utilisateur`, `Routeur`, `Pare-feu`, `Application métier`

**rep 201** : l'actif créé.
**erreur 400** : si `type` ou `name` manquant.

### PUT /assets/:id
Modifie un actif existant.

**Body** : un ou plusieurs champs à modifier (`type`, `name`, `exposedToInternet`)

**rep 200** : l'actif modifié.
**erreur 404** : si l'actif n'existe pas.

### DELETE /assets/:id
Supprime un actif + ses vulnérabilités associées.

**rep 204** : suppression réussie, pas de contenu.
**erreur 404** : si l'actif n'existe pas.

---

## Vulnérabilités

### GET /vulnerabilities
Liste toutes les vulnérabilités + l'actif associé.

**rep 200**
```json
[
  {
    "id": 1,
    "assetId": 1,
    "name": "Mot de passe faible",
    "criticality": "élevée",
    "Asset": { "id": 1, "name": "Serveur principal" }
  }
]
```

### POST /vulnerabilities
Associe une vulnérabilité à un actif.

**Body**
```json
{
  "assetId": 1,
  "name": "Mot de passe faible",
  "criticality": "élevée"
}
```

**rep 201** : la vulnérabilité créée.
**erreur 400** : si un champ requis manque.
**erreur 404** : si l'actif associé n'existe pas.

---

## Risque

### POST /risk/calculate
Calcule le score de risque cyber global, basé sur tous les actifs et vulnérabilités enregistrés.

**rep 200**
```json
{
  "score": 12.5,
  "level": "moyen",
  "totalAssets": 4,
  "totalVulns": 6,
  "exposedAssetsCount": 2,
  "recommendations": [
    "Renforcer la politique de mdp."
  ]
}
```