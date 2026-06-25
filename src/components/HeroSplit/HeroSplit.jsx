import { PRODUITS } from '../../data/produits.js';
import styles from './HeroSplit.module.css';

// Métadonnées d'affichage propres au hero split (titre court + accroche courte +
// image de fond d'ambiance). On garde les textes longs dans produits.js ; ici on
// veut du punch visuel à la manière du hero « VS » de référence (Sabaï).
const PANELS = [
  {
    id: 'fromagere',
    titre: 'Fromagère',
    sousTitre: "L'Onctueuse",
    fond: '/produits/fond-fromagere.webp',
    produit: '/produits/fromagere-produit.webp',
  },
  {
    id: 'cheddar',
    titre: 'Cheddar',
    sousTitre: 'La Généreuse',
    fond: '/produits/fond-cheddar.webp',
    produit: '/produits/cheddar-produit.webp',
  },
  {
    id: 'crousty',
    titre: 'Crousty',
    sousTitre: "L'Audacieuse",
    fond: '/gta.webp',
    produit: '/produits/crousty-bowl.webp',
  },
];

/**
 * Hero « split-screen » : 3 panneaux pleine hauteur (une sauce chacun),
 * inspiré du hero de référence Sabaï.
 *
 * Chaque panneau porte son image de fond d'ambiance + un voile sombre dégradé
 * du bas (lisibilité du titre), et la couleur d'accent de sa sauce. Au survol
 * (desktop) le panneau s'élargit et les autres se resserrent ; un clic ancre
 * vers la section détaillée du produit.
 *
 * Entrée en cascade au montage (stagger via --i) ; effet expand neutralisé
 * sous prefers-reduced-motion / sur mobile (CSS).
 */
function HeroSplit() {
  return (
    <section className={styles.hero} aria-label="Nos trois sauces signature">
      <div className={styles.panels}>
        {PANELS.map((panel, i) => {
          const produit = PRODUITS.find((p) => p.id === panel.id);
          const accent = produit?.couleur || '#c9a24b';
          return (
            <a
              key={panel.id}
              href={`#${panel.id}`}
              className={styles.panel}
              style={{ '--i': i, '--accent': accent, '--fond': `url(${panel.fond})` }}
            >
              {/* Image de fond + voile sombre (gérés en CSS via pseudo-éléments). */}
              <span className={styles.bg} aria-hidden="true" />
              <span className={styles.scrim} aria-hidden="true" />

              {/* Contenu ancré en bas du panneau : photo produit (packshot)
                  centrée au-dessus du titre. */}
              <div className={styles.content}>
                <img
                  src={panel.produit}
                  alt={`Sauce ${panel.titre} Whally's`}
                  className={styles.produit}
                  /* hero visible au chargement : priorité haute + décodage async */
                  fetchpriority="high"
                  decoding="async"
                />
                <span className={styles.eyebrow}>Sauce</span>
                <h2 className={styles.titre}>{panel.titre}</h2>
                <p className={styles.sousTitre}>{panel.sousTitre}</p>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}

export default HeroSplit;
