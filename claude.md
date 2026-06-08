# CLAUDE.md — Projet Whally's

## Vue d'ensemble du projet

Site vitrine B2B pour **Whally's**, marque de sauces/condiments vendus aux restaurants.
Inspiration visuelle : https://nawhals.com/fr

**2 pages publiques :**

- `/` — Home (page vitrine)
- `/commande` — Formulaire de commande B2B (restaurateurs uniquement)

**Pas de backend** — envoi des commandes par email via EmailJS.

---

## Stack technique

- React + Vite
- React Router DOM (navigation entre pages)
- CSS Modules (pas de SCSS, pas de Tailwind, pas d'inline styles)
- Lucide React (icônes UI standard)
- EmailJS (`@emailjs/browser`) — envoi du formulaire de commande par email
- Composants fonctionnels uniquement — aucun class component

### Installation

```bash
npm create vite@latest whallys -- --template react
cd whallys
npm install react-router-dom @emailjs/browser lucide-react
```

---

## Identité visuelle Whally's

### Couleurs (extraites du PDF client — valeurs CMYK)

```css
/* variables dans src/styles/global.css */
--color-brun: #2c1a0e; /* fond logo : CMYK 51/70/83/66 */
--color-or: #f0c84a; /* liseré logo : CMYK 4/21/63/0 */
--color-blanc: #ffffff;
--color-bg: #faf7f2; /* blanc cassé chaud pour les fonds de section */
--color-texte: #1a1a1a;
```

### Logo

- Fichier : `src/assets/logo.webp`
- Forme ovale fond brun foncé, texte "Whally's" en blanc, liseré or

### Typographie

- À définir via Fontsource (npm) ou Fontshare
- S'inspirer de nawhals.com : mixte serif italique + sans-serif bold

### Ton visuel

- Chaleureux, artisanal, premium alimentaire
- Grandes images produits, sections aérées, typographie expressive
- Pas de dark mode — palette chaude brun/or/blanc cassé

---

## Page HOME `/`

### Structure des sections (ordre PDF)

1. **Navbar**

   - Desktop : logo gauche + liens "À propos de nous" | "Contact"
   - Mobile : logo centré + icône hamburger (menu burger)

2. **Hero**

   - Image pleine largeur ambiance sauce/food premium
   - Accroche + CTA → `/commande`

3. **Section "Les Produits"**

   - Grille de cards produits (image + nom + description courte)
   - Données produits : tableau statique dans `src/data/produits.js`

4. **Section "L'utilisation"**

   - Desktop : 3 vidéos côte à côte
   - Mobile : 1 vidéo unique
   - URLs vidéos : renseignées dans `src/data/videos.js`

5. **Footer**
   - Liens + mentions légales + email contact

---

## Page FORMULAIRE `/commande`

### Champs

```
- Nom du restaurant            [input text, obligatoire]
- Département CH               [select dropdown, obligatoire]
- Commande par produit         [boutons − 0 + par ligne produit]
- Date de livraison souhaitée  [date picker — dates filtrées selon CH]
```

### Départements disponibles (ordre numérique)

```js
// src/data/departements.js
export const DEPARTEMENTS = [
  "CH10",
  "CH11",
  "CH12",
  "CH14",
  "CH16",
  "CH18",
  "CH19",
  "CH23",
  "CH25",
  "CH39",
  "CH60",
  "CH62",
];
```

### Logique dates de livraison disponibles

Calculée côté frontend dans `src/utils/livraison.js` selon le département sélectionné.

```
Groupe 1 → CH12, CH10, CH11, CH62, CH25, CH60
  Jours de livraison : Lu / Ma / Me / Je / Ve
  Règle : commande avant 15h → livraison lendemain
          commande vendredi avant 15h → lundi (sinon mardi)

Groupe 2 → CH23, CH19, CH16
  Jours de livraison : Ma / Je / Ve
  Règle : commande mardi avant 15h → mercredi (sinon vendredi)
          traitement uniquement si commande passée avant 15h

Groupe 3 → CH39, CH18, CH14
  Jours de livraison : Je / Ve
  Même règle que groupe 2
  Livraison lendemain possible si commande avant 15h selon planning
```

Le date picker ne doit afficher **que les dates de livraison autorisées** pour le CH sélectionné.

---

## Envoi du formulaire — EmailJS

### Setup

```js
// src/utils/sendCommande.js
import emailjs from "@emailjs/browser";

// Clés à renseigner dans .env
// VITE_EMAILJS_SERVICE_ID
// VITE_EMAILJS_TEMPLATE_ID
// VITE_EMAILJS_PUBLIC_KEY

export const sendCommande = (formData) => {
  return emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    formData,
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  );
};
```

### Template EmailJS (variables à mapper)

```
{{nom_restaurant}}
{{departement}}
{{date_livraison}}
{{commande}}     ← string formatée ligne par ligne : "Produit X : 3 unités"
```

### Fichier .env (jamais commité)

```
VITE_EMAILJS_SERVICE_ID=xxxxx
VITE_EMAILJS_TEMPLATE_ID=xxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxx
```

---

## Structure des fichiers

```
whallys/
├── CLAUDE.md
├── .env                          ← clés EmailJS (gitignore)
├── .gitignore
├── index.html
├── vite.config.js
└── src/
    ├── assets/
    │   └── logo.webp
    ├── components/
    │   ├── Navbar/
    │   │   ├── Navbar.jsx
    │   │   └── Navbar.module.css
    │   ├── Footer/
    │   │   ├── Footer.jsx
    │   │   └── Footer.module.css
    │   ├── ProductCard/
    │   │   ├── ProductCard.jsx
    │   │   └── ProductCard.module.css
    │   └── QuantitySelector/
    │       ├── QuantitySelector.jsx
    │       └── QuantitySelector.module.css
    ├── pages/
    │   ├── Home/
    │   │   ├── Home.jsx
    │   │   └── Home.module.css
    │   └── Commande/
    │       ├── Commande.jsx
    │       └── Commande.module.css
    ├── data/
    │   ├── produits.js           ← tableau statique des produits
    │   ├── departements.js       ← liste des CH
    │   └── videos.js             ← URLs des 3 vidéos
    ├── utils/
    │   ├── livraison.js          ← calcul dates disponibles par groupe CH
    │   └── sendCommande.js       ← wrapper EmailJS
    ├── styles/
    │   └── global.css            ← variables CSS + reset
    ├── App.jsx                   ← React Router (routes)
    └── main.jsx
```

---

## Conventions de code

- **Commentaires** : toujours en français
- **Variables / fonctions / fichiers** : toujours en anglais
- **Composants** : fonctionnels uniquement
- **Styles** : CSS Modules uniquement — aucun inline style
- **Icônes** : Lucide React
- **Données statiques** : dans `src/data/` (pas de BDD)

---

## Ce qui reste à collecter auprès du client

- [ ] Noms, descriptions et visuels des produits (sauces Whally's)
- [ ] 3 vidéos pour la section "L'utilisation" (URLs ou fichiers MP4)
- [ ] Textes Hero (accroche, sous-titre, CTA)
- [ ] Texte "À propos de nous"
- [ ] Email de réception des commandes (pour EmailJS)
- [ ] Domaine d'hébergement cible (Vercel / Netlify / O2switch)
