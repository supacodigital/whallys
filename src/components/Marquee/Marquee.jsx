import styles from './Marquee.module.css';

// Accroches défilantes (bandeau entre le hero et les produits).
const ITEMS = [
  'Sauces signature',
  'Livraison 24/48h en Suisse romande',
  'Pensé pour les restaurateurs',
  'Recettes artisanales',
  'Le goût qui fidélise',
];

/**
 * Bandeau de texte défilant (marquee) — transition entre le hero et la section
 * produits. Défilement infini en CSS (linear, hors thread principal) : le
 * contenu est dupliqué deux fois et translaté de -50%, ce qui donne une boucle
 * sans couture. Pause au survol ; figé sous prefers-reduced-motion.
 */
function Marquee() {
  return (
    <section className={styles.banner} aria-label="Whally's en quelques mots">
      <div className={styles.track}>
        {/* Deux séquences identiques pour la boucle continue. La seconde est
            cachée aux lecteurs d'écran (contenu purement décoratif dupliqué). */}
        {[0, 1].map((seq) => (
          <ul
            className={styles.seq}
            key={seq}
            aria-hidden={seq === 1 ? 'true' : undefined}
          >
            {ITEMS.map((item, i) => (
              <li className={styles.item} key={i}>
                <span className={styles.text}>{item}</span>
                <span className={styles.dot} aria-hidden="true">
                  ✦
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}

export default Marquee;
