import logo from '../../assets/logo.png';
import styles from './ProductCard.module.css';

/**
 * Ligne produit en 2 colonnes : photo d'un côté, description de l'autre.
 * L'ordre s'inverse une ligne sur deux (prop `reversed`) pour rythmer la section.
 * Si `produit.logo` est vrai, le logo Whally's s'affiche à droite du titre.
 * `produit.descriptionLongue` (optionnel) s'affiche sous la description courte.
 */
function ProductCard({ produit, reversed = false, dark = false }) {
  return (
    <article
      id={produit.id}
      className={`${styles.row} ${reversed ? styles.rowReversed : ''} ${
        dark ? styles.rowDark : ''
      } ${produit.fond ? styles.rowFond : ''} ${
        produit.texteLarge ? styles.rowLarge : ''
      }`}
      style={{
        '--accent': produit.couleur,
        ...(produit.fond ? { '--fond': `url(${produit.fond})` } : {}),
      }}
    >
      <div className={styles.mediaCol}>
        <div
          className={`${styles.media} ${
            produit.mediaCarre ? styles.mediaCarre : ''
          }`}
        >
          <img
            src={produit.image}
            alt={produit.nom}
            loading="lazy"
            className={styles.video}
          />
        </div>
      </div>

      <div className={styles.textCol}>
        <div className={styles.titleRow}>
          <h3 className={styles.nom}>{produit.nom}</h3>
          {produit.logo && (
            <img
              src={logo}
              alt="Whally's"
              className={styles.titleLogo}
              loading="lazy"
            />
          )}
        </div>
        <p className={styles.accroche}>{produit.accroche}</p>
        <p className={styles.description}>{produit.description}</p>
        {produit.descriptionLongue && (
          <p className={styles.description}>{produit.descriptionLongue}</p>
        )}
      </div>
    </article>
  );
}

export default ProductCard;
