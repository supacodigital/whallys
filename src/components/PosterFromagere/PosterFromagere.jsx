import logo from '../../assets/logo.png';
import styles from './PosterFromagere.module.css';

/**
 * Section Fromagère — refonte « poster » fidèle à la DA du client
 * (public/photoclients/1-pour-model.pdf : « Compose ton tacos / ton bowl's »).
 *
 * Format PAYSAGE : une seule bande horizontale scindée en deux moitiés côte à
 * côte, séparées par une diagonale centrale (ruban NOUVEAU dessus) :
 *  - Gauche  : COMPOSE TON TACOS  — fond chaud orange/or, tacos détouré + vapeur.
 *  - Droite  : COMPOSE TON BOWL'S — fond brun foncé, bowl détouré + vapeur.
 *
 * Chaque moitié annote son produit avec des labels reliés par des flèches
 * blanches courbes (SVG). Produits FIXES (demande client : pas d'animation) ;
 * seule la vapeur reste animée.
 *
 * Le repère des flèches/labels est LOCAL à chaque moitié (viewBox 0..100 sur la
 * moitié), ce qui garde l'ancrage au produit responsive.
 *
 * L'id (#fromagere) sert de cible d'ancre depuis la navbar / le hero.
 */

// Chaque moitié : titre bicolore + produit détouré + labels annotés.
// `arrow` = tracé SVG (repère 0..100 de la moitié) ; `pos` = ancrage du label.
const TACOS = {
  titrePetit: 'Compose',
  titreGros: 'ton tacos',
  produit: { src: '/produits/fromagere-tacos.webp', alt: "Tacos garni sauce fromagère Whally's" },
  // Produits remontés (top 54%). Labels remontés, flèches recalées sur grille.
  labels: [
    {
      key: 'base',
      lignes: ['Base sauce', 'fromagère'],
      fort: "Whally's",
      // label positionné par le client : (25, 35)
      pos: { top: '35%', left: '25%' },
      // cible client : (36, 53)
      arrow: 'M 30 40 C 32 45, 34 49, 36 53',
    },
    {
      key: 'viandes',
      lignes: ['viandes'],
      fort: 'au choix',
      pos: { top: '58%', left: '5%' },
      // cible client : (35, 55)
      arrow: 'M 18 58 C 24 57, 30 56, 35 55',
    },
    {
      key: 'sauces',
      lignes: ['sauces'],
      fort: 'au choix',
      pos: { top: '78%', left: '28%' },
      // cible client : (50, 60)
      arrow: 'M 42 75 C 45 71, 48 65, 50 60',
    },
    {
      key: 'frites',
      lignes: [],
      fort: 'Frites',
      // label positionné par le client : (70, 65)
      pos: { top: '65%', left: '70%' },
      // cible client : (60, 60)
      arrow: 'M 70 64 C 67 63, 63 61, 60 60',
    },
  ],
};

const BOWL = {
  titrePetit: 'Compose',
  titreGros: "ton bowl's",
  produit: { src: '/produits/fromagere-bowl.webp', alt: "Bowl garni sauce fromagère Whally's" },
  // Labels et cibles positionnés par le client (grille).
  labels: [
    {
      key: 'viandes',
      lignes: ['viandes'],
      fort: 'au choix',
      // label (10, 50) → cible (33, 52). Départ décalé (24) pour ne pas
      // chevaucher le label.
      pos: { top: '50%', left: '10%' },
      arrow: 'M 24 51 C 27 51, 30 52, 33 52',
    },
    {
      key: 'petits',
      lignes: ['1 ou plusieurs'],
      fort: 'petits +',
      // label (15, 70) → cible (40, 55)
      pos: { top: '70%', left: '15%' },
      arrow: 'M 26 68 C 31 64, 36 59, 40 55',
    },
    {
      key: 'oignons',
      lignes: [],
      fort: 'Crispy oignons',
      // label (50, 80) → cible (50, 60)
      pos: { top: '80%', left: '50%' },
      arrow: 'M 50 77 C 50 71, 50 65, 50 60',
    },
    {
      key: 'frites',
      lignes: [],
      fort: 'Frites',
      pos: { top: '48%', left: '84%' },
      // cible client : (70, 50)
      arrow: 'M 82 49 C 78 49, 74 50, 70 50',
    },
    {
      key: 'base',
      lignes: ['Base sauce', 'fromagère'],
      fort: "Whally's",
      pos: { top: '76%', left: '80%' },
      // cible client : (65, 55)
      arrow: 'M 78 73 C 74 67, 69 61, 65 55',
    },
  ],
};

// Une flèche : tracé courbe blanc + pointe, dans le viewBox 0..100 de la moitié
// (preserveAspectRatio="none" pour épouser le rectangle de la moitié).
function Arrow({ d }) {
  return (
    <svg
      className={styles.arrow}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d={d} className={styles.arrowPath} />
    </svg>
  );
}

// Un label annoté (petites lignes + mot fort) posé en absolu sur la moitié.
function Label({ label }) {
  return (
    <div className={styles.label} style={{ top: label.pos.top, left: label.pos.left }}>
      {label.lignes.map((l) => (
        <span key={l} className={styles.labelLigne}>
          {l}
        </span>
      ))}
      <span className={styles.labelFort}>{label.fort}</span>
    </div>
  );
}

// Une moitié (tacos ou bowl) : titre + produit détouré + vapeur + labels + flèches.
function Half({ data, variant }) {
  return (
    <div className={`${styles.half} ${styles[variant]}`}>
      <h3 className={styles.titre}>
        <span className={styles.titrePetit}>{data.titrePetit}</span>
        <span className={styles.titreGros}>{data.titreGros}</span>
      </h3>

      {/* Produit détouré + vapeur (fixe). */}
      <div className={styles.product}>
        <span className={styles.steam} aria-hidden="true">
          <span className={styles.steamPuff} />
          <span className={styles.steamPuff} />
          <span className={styles.steamPuff} />
        </span>
        <img
          src={data.produit.src}
          alt={data.produit.alt}
          loading="lazy"
          className={styles.productImg}
        />
      </div>

      {/* Couche flèches (SVG) + labels, superposées à la moitié. */}
      <div className={styles.annotations} aria-hidden="true">
        {data.labels.map((l) => (
          <Arrow key={l.key} d={l.arrow} />
        ))}
      </div>
      {data.labels.map((l) => (
        <Label key={l.key} label={l} />
      ))}
    </div>
  );
}

function PosterFromagere({ produit }) {
  return (
    <section id={produit.id} className={styles.poster} aria-label={produit.nom}>
      {/* Defs SVG partagées : pointe de flèche réutilisée par tous les tracés. */}
      <svg width="0" height="0" className={styles.defs} aria-hidden="true">
        <defs>
          <marker
            id="posterArrowHead"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path
              d="M 0 1 L 9 5 L 0 9"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </marker>
        </defs>
      </svg>

      <div className={styles.halves}>
        <Half data={TACOS} variant="halfTacos" />
        <Half data={BOWL} variant="halfBowl" />
      </div>

      {/* Bloc central (remplace la pastille) : nom + logo sur une ligne, puis
          accroche + description en dessous, posé au centre sur la couture. */}
      <div className={styles.intro}>
        <div className={styles.introHead}>
          <h3 className={styles.introTitre}>{produit.nom}</h3>
          <img src={logo} alt="Whally's" className={styles.introLogo} />
        </div>
        <p className={styles.introAccroche}>{produit.accroche}</p>
        <p className={styles.introDescription}>{produit.description}</p>
      </div>
    </section>
  );
}

export default PosterFromagere;
