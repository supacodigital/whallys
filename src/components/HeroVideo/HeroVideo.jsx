import { HERO_MEDIA } from '../../data/heroVideo.js';
import styles from './HeroVideo.module.css';

/**
 * Hero plein écran : image premium en fond et bloc de contenu (titre,
 * sous-titre, CTA) aligné à gauche. Le contenu est passé en children.
 */
function HeroVideo({ children }) {
  return (
    <section className={styles.hero}>
      <img
        className={styles.video}
        src={HERO_MEDIA.image}
        alt=""
        aria-hidden="true"
        fetchpriority="high"
      />
      {/* Dégradé latéral pour assombrir la gauche et garder le texte lisible */}
      <div className={styles.scrim} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>{children}</div>
    </section>
  );
}

export default HeroVideo;
