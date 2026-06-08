// Données produits — placeholders à remplacer par les vraies sauces Whally's
// Le client fournira : noms définitifs, descriptions, et visuels haute résolution

export const PRODUITS = [
  {
    id: 'barbecue',
    nom: 'Sauce Barbecue',
    accroche: 'Fumée, sucrée, irrésistible',
    description:
      "Notre sauce barbecue maison, mijotée lentement avec un mélange d'épices fumées et une touche de mélasse. Parfaite pour vos burgers signature et ribs.",
    format: 'Bouteille 1L',
    // Accent : brun rougeâtre dérivé du visuel
    couleur: '#7a3318',
    image: '/box.png',
    video: '/crouty.mp4',
  },
  {
    id: 'creme-poivree',
    nom: 'Crème Poivrée',
    accroche: 'Crémeuse, parsemée de poivre',
    description:
      "Notre sauce crémeuse parsemée de poivre noir concassé et d'herbes fraîches. Idéale pour vos viandes blanches, salades premium et wraps signature.",
    format: 'Bouteille 1L',
    // Accent : crème grisée
    couleur: '#b8a896',
    image: '/box.png',
    video: '/kebab.mp4',
  },
  {
    id: 'mister-onion',
    nom: 'Mister Onion',
    accroche: 'Oignons caramélisés, twist secret',
    description:
      "Notre signature : oignons confits longuement, agrémentés d'épices douces et d'une pointe d'acidité. Le condiment qui transforme un simple burger en expérience.",
    format: 'Bouteille 1L',
    // Accent : orange chaleureux
    couleur: '#e08938',
    image: '/box.png',
    // En attente d'une 3e vidéo dédiée — réutilise crouty.mp4 pour l'instant
    video: '/crouty.mp4',
  },
];
