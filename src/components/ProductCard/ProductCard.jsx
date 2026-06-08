import { useVideoInView } from '../../utils/useVideoInView.js';
import styles from './ProductCard.module.css';

/**
 * Ligne produit en 2 colonnes : vidéo d'un côté, description de l'autre.
 * L'ordre s'inverse une ligne sur deux (prop `reversed`) pour rythmer la section.
 */
function ProductCard({ produit, reversed = false, dark = false }) {
  const videoRef = useVideoInView();

  return (
    <article
      className={`${styles.row} ${reversed ? styles.rowReversed : ''} ${
        dark ? styles.rowDark : ''
      }`}
      style={{ '--accent': produit.couleur }}
    >
      <div className={styles.mediaCol}>
        <div className={styles.media}>
          <video
            ref={videoRef}
            src={produit.video}
            poster={produit.image}
            muted
            loop
            playsInline
            preload="none"
            className={styles.video}
          />
        </div>
      </div>

      <div className={styles.textCol}>
        <p className={styles.format}>{produit.format}</p>
        <h3 className={styles.nom}>{produit.nom}</h3>
        <p className={styles.accroche}>{produit.accroche}</p>
        <p className={styles.description}>{produit.description}</p>
      </div>
    </article>
  );
}

export default ProductCard;
