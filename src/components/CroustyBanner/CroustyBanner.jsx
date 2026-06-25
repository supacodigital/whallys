import { Crown } from 'lucide-react';
import styles from './CroustyBanner.module.css';

/**
 * Bannière Crousty — design "GTA / Vice City" pleine largeur, tranchant avec le
 * style éditorial des autres sauces (demande client, PDF page 4).
 *
 * Approche hybride :
 *  - fond d'ambiance synthwave généré (image), avec un fallback dégradé CSS si
 *    l'asset n'est pas encore fourni ;
 *  - bowl produit détouré (PNG transparent) posé par-dessus ;
 *  - lettering "SAUCE CROUSTY" codé en natif (Anton + contour + ombre néon).
 *
 * L'id sur la section sert de cible d'ancre (#crousty) depuis la navbar / le hero.
 */
function CroustyBanner({ produit }) {
  return (
    <section id={produit.id} className={styles.banner} aria-label={produit.nom}>
      {/* Fond d'ambiance GTA (image générée). Le fallback CSS sous l'image
          garantit un rendu correct même sans asset. */}
      <div
        className={styles.bg}
        style={{ backgroundImage: `url(${produit.banniere})` }}
        aria-hidden="true"
      />
      <div className={styles.bgFallback} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        {/* ───────── Colonne visuel : lettering + bowl ───────── */}
        <div className={styles.visual}>
          <Crown className={styles.crown} aria-hidden="true" />

          <h3 className={styles.lettering}>
            <span className={styles.letteringTop}>Sauce</span>
            <span className={styles.letteringMain}>Crousty</span>
          </h3>

          <div className={styles.product}>
            {/* Vapeur décorative derrière le bowl */}
            <span className={styles.steam} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <img
              src={produit.image}
              alt={produit.nom}
              loading="lazy"
              className={styles.bowl}
            />
          </div>
        </div>

        {/* ───────── Colonne texte ───────── */}
        <div className={styles.textCol}>
          <p className={styles.accroche}>{produit.accroche}</p>
          <p className={styles.description}>{produit.description}</p>
        </div>
      </div>
    </section>
  );
}

export default CroustyBanner;
