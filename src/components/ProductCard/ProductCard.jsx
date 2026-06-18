import styles from './ProductCard.module.css';

/**
 * Ligne produit en 2 colonnes : photo d'un côté, description de l'autre.
 * L'ordre s'inverse une ligne sur deux (prop `reversed`) pour rythmer la section.
 */
function ProductCard({ produit, reversed = false, dark = false }) {
  return (
    <article
      className={`${styles.row} ${reversed ? styles.rowReversed : ''} ${
        dark ? styles.rowDark : ''
      }`}
      style={{ '--accent': produit.couleur }}
    >
      <div className={styles.mediaCol}>
        <div className={styles.media}>
          <img
            src={produit.image}
            alt={produit.nom}
            loading="lazy"
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
