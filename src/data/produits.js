// Données produits — gamme Whally's (textes fournis par le client, PDF retour).
// Visuels : placeholders pour l'instant (étiquettes/bannières définitives à
// venir). Chaque produit a une bannière DA cohérente (couleur d'accent + image)
// et une description courte (carte) + description longue (page détail).

export const PRODUITS = [
  {
    id: 'fromagere',
    nom: 'Sauce Fromagère',
    // Section = poster fini fourni par le client (composant PosterSection).
    layout: 'poster',
    poster: '/sections/fromagere-poster.webp',
    // Poster mobile dédié (format portrait) : produit + titre en bas de
    // l'image, zone vide en haut → le texte de présentation passe en haut.
    posterMobile: '/sections/fromagere-poster-mobile.webp',
    // Texte remonté sur mobile : sur ce poster, la zone vide au-dessus du
    // lettering "FROMAGERE" est plus courte que sur les autres produits.
    texteTopMobile: '4%',
    // Zone vide plus étroite à gauche sur ce poster (le lettering "FROMAGERE"
    // démarre tôt) : bloc texte resserré pour ne pas chevaucher l'image.
    texteWidth: '46ch',
    // Description plus large (aligné avec le style Crousty) : lignes plus
    // longues plutôt que du texte compact.
    descriptionWidth: '46ch',
    // Logo Whally's affiché à droite du titre (demande client, PDF page 2).
    logo: true,
    // Sous-titre (texte en jaune / italique sous le titre).
    accroche:
      "La sauce fromagère Whally's spécialement conçue pour les tacos.",
    // Conditionnement de commande B2B : carton de 10 kg (1 carton = 10 kg).
    format: 'Carton de 10 kg',
    poidsKg: 10,
    // Description principale.
    description:
      "Originaire des montagnes du Jura, elle incarne la tradition du fromage de qualité. Elle peut accompagner les bowl's en apportant une onctuosité inégalée, une saveur gourmande aux frites, et bien d'autres délices.",
    descriptionLongue: null,
    // Accent DA : jaune fromage chaud
    couleur: '#e0a93a',
    // Photo produit fournie par le client (optimisée).
    image: '/produits/fromagere-produit.webp',
    // Rendu « fusion » : produits détourés posés directement sur le fond de
    // section (sans cadre), avec ombre au sol en CSS. Plusieurs produits =
    // composition duo (le bowl devant, le tacos qui chevauche derrière).
    fusion: true,
    // Vapeur CSS « plat chaud » qui s'élève des produits (bowl + tacos).
    steam: true,
    produitsDetoures: [
      { src: '/produits/fromagere-bowl.webp', alt: 'Bowl Whally\'s sauce fromagère' },
      { src: '/produits/fromagere-tacos.webp', alt: 'Tacos Whally\'s sauce fromagère' },
    ],
    // Textes + logo agrandis (cohérent avec le Cheddar).
    texteLarge: true,
    // Image de fond pleine largeur derrière la ligne produit (avec voile).
    // Fonds échangés Fromagère/Cheddar (demande client).
    fond: '/produits/fond-cheddar.webp',
  },
  {
    id: 'crousty',
    nom: 'Sauce Crousty',
    // Section = poster fini fourni par le client (composant PosterSection).
    layout: 'poster',
    poster: '/sections/crousty-poster.webp',
    // Poster mobile dédié (format portrait) : produit + titre en bas de
    // l'image, zone vide en haut → le texte de présentation passe en haut.
    posterMobile: '/sections/crousty-poster-mobile.webp',
    // Texte descendu sur mobile (demande client).
    texteTopMobile: '12%',
    // Le lettering + bowl du poster occupent la gauche : texte de présentation
    // à droite pour ne pas se superposer.
    texteAlign: 'right',
    // Zone vide plus large à droite sur ce poster : description moins contrainte.
    descriptionWidth: '52ch',
    // Logo Whally's affiché à côté du titre (même mise en forme que la fromagère).
    logo: true,
    // Sous-titre (italique rose dans la bannière GTA).
    accroche: "La sauce Crousty Whally's, c'est la tendance du moment pour vos crousty.",
    // Conditionnement de commande B2B : carton de 10 kg (1 carton = 10 kg).
    format: 'Carton de 10 kg',
    poidsKg: 10,
    description:
      "Avec son goût unique et sa texture onctueuse, elle sublime vos recettes et transforme une simple préparation en véritable expérience street-food. La sauce Crousty Whally's donne du caractère, du relief et une touche irrésistible qui fera de vos crousty un vrai délice.",
    descriptionLongue: null,
    // Accent DA : magenta street-food (rappel bannière Crousty du PDF)
    couleur: '#c0398b',
    // Bowl produit détouré fourni par le client (CROUSTY.png, fond transparent) :
    // le produit seul se pose proprement sur le fond GTA du composant
    // CroustyBanner.
    image: '/produits/CROUSTY.png',
    // Fond GTA fourni par le client, upscalé en 4K puis optimisé (2560px webp).
    banniere: '/gta.webp',
  },
  {
    id: 'cheddar',
    nom: 'Sauce Cheddar',
    // Section = poster fini fourni par le client (composant PosterSection).
    layout: 'poster',
    poster: '/sections/cheddar-poster.webp',
    // Poster mobile dédié (format portrait) : produit + titre en bas de
    // l'image, zone vide en haut → le texte de présentation passe en haut.
    posterMobile: '/sections/cheddar-poster-mobile.webp',
    // Disposition inversée : texte à gauche, images (grille produits) à droite
    // (demande client). Override l'alternance auto basée sur l'index.
    reversed: true,
    // Textes + logo agrandis (demande client, cohérent avec Crousty/Fromagère).
    texteLarge: true,
    // Logo Whally's affiché à droite du titre (même mise en forme que la fromagère).
    logo: true,
    // Sous-titre (texte en jaune / italique sous le titre).
    accroche:
      "La sauce cheddar Whally's apporte une touche gourmande, fondante et généreuse à vos kebabs, galettes, frites, box et snacks chauds.",
    // Conditionnement de commande B2B : carton de 10 kg (1 carton = 10 kg).
    format: 'Carton de 10 kg',
    poidsKg: 10,
    // Description principale.
    description:
      "Grâce à sa texture onctueuse et son goût intense de cheddar, elle sublime vos recettes en quelques secondes et offre à vos clients une expérience encore plus savoureuse.",
    descriptionLongue: null,
    // Accent DA : orange cheddar intense
    couleur: '#d9701f',
    // Photo produit fournie par le client (optimisée).
    image: '/produits/cheddar-produit.webp',
    // Rendu « fusion » : 4 produits détourés (vraies photos client) groupés côté
    // image, chacun annoté par une flèche + son nom (label). Produits fixes
    // (pas d'animation, demande client).
    fusion: true,
    produitsDetoures: [
      { src: '/produits/cheddar-kebab.webp', alt: 'Kebab cheddar Whally\'s', label: 'Kebab' },
      { src: '/produits/cheddar-frites.webp', alt: 'Frites cheddar Whally\'s', label: 'Frites' },
      { src: '/produits/cheddar-galette.webp', alt: 'Galette cheddar Whally\'s', label: 'Galette' },
      { src: '/produits/cheddar-box.webp', alt: 'Box cheddar Whally\'s', label: 'Box' },
    ],
    // Image de fond pleine largeur derrière la ligne produit (avec voile).
    // Fonds échangés Fromagère/Cheddar (demande client).
    fond: '/produits/fond-fromagere.webp',
  },
];

// Accès rapide par id (page détail produit).
export const getProduitById = (id) => PRODUITS.find((p) => p.id === id);
