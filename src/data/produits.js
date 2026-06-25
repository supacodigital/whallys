// Données produits — gamme Whally's (textes fournis par le client, PDF retour).
// Visuels : placeholders pour l'instant (étiquettes/bannières définitives à
// venir). Chaque produit a une bannière DA cohérente (couleur d'accent + image)
// et une description courte (carte) + description longue (page détail).

export const PRODUITS = [
  {
    id: 'fromagere',
    nom: 'Sauce Fromagère',
    // Logo Whally's affiché à droite du titre (demande client, PDF page 2).
    logo: true,
    // Sous-titre (texte en jaune / italique sous le titre).
    accroche:
      "La sauce fromagère Whally's spécialement conçue pour les tacos.",
    format: 'Bouteille 1L',
    // Description principale.
    description:
      "Originaire des montagnes du Jura, elle incarne la tradition du fromage de qualité. Elle peut accompagner les bowl's en apportant une onctuosité inégalée, une saveur gourmande aux frites, et bien d'autres délices.",
    descriptionLongue: null,
    // Accent DA : jaune fromage chaud
    couleur: '#e0a93a',
    // Photo produit fournie par le client (optimisée).
    image: '/produits/fromagere-produit.webp',
    // Cadre image carré (photo quasi carrée, cohérent avec le Cheddar).
    mediaCarre: true,
    // Textes + logo agrandis (cohérent avec le Cheddar).
    texteLarge: true,
    // Image de fond pleine largeur derrière la ligne produit (avec voile).
    fond: '/produits/fond-fromagere.webp',
  },
  {
    id: 'cheddar',
    nom: 'Sauce Cheddar',
    // Logo Whally's affiché à droite du titre (même mise en forme que la fromagère).
    logo: true,
    // Sous-titre (texte en jaune / italique sous le titre).
    accroche:
      "La sauce cheddar Whally's apporte une touche gourmande, fondante et généreuse à vos kebabs, galettes, frites, box et snacks chauds.",
    format: 'Bouteille 1L',
    // Description principale.
    description:
      "Grâce à sa texture onctueuse et son goût intense de cheddar, elle sublime vos recettes en quelques secondes et offre à vos clients une expérience encore plus savoureuse.",
    descriptionLongue: null,
    // Accent DA : orange cheddar intense
    couleur: '#d9701f',
    // Photo produit fournie par le client (optimisée).
    image: '/produits/cheddar-produit.webp',
    // Cadre image carré (photo carrée, comme la section Crousty).
    mediaCarre: true,
    // Image de fond pleine largeur derrière la ligne produit (avec voile).
    fond: '/produits/fond-cheddar.webp',
  },
  {
    id: 'crousty',
    nom: 'Sauce Crousty',
    // Design dédié "GTA / street-food" (composant CroustyBanner, pas ProductCard).
    layout: 'gta',
    // Sous-titre (italique rose dans la bannière GTA).
    accroche: "La sauce Crousty Whally's, c'est la tendance du moment pour vos crousty.",
    format: 'Bouteille 1L',
    description:
      "Avec son goût unique et sa texture onctueuse, elle sublime vos recettes et transforme une simple préparation en véritable expérience street-food. La sauce Crousty Whally's donne du caractère, du relief et une touche irrésistible qui fera de vos crousty un vrai délice.",
    descriptionLongue: null,
    // Accent DA : magenta street-food (rappel bannière Crousty du PDF)
    couleur: '#c0398b',
    // Bowl détouré fourni par le client (WebP transparent optimisé, 600px).
    image: '/produits/crousty-bowl.webp',
    // Fond GTA fourni par le client, upscalé en 4K puis optimisé (2560px webp).
    banniere: '/gta.webp',
  },
];

// Accès rapide par id (page détail produit).
export const getProduitById = (id) => PRODUITS.find((p) => p.id === id);
