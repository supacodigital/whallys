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
      } ${produit.fusion ? styles.rowFusion : ''}`}
      style={{
        '--accent': produit.couleur,
        ...(produit.fond ? { '--fond': `url(${produit.fond})` } : {}),
      }}
    >
      <div className={styles.mediaCol}>
        {produit.fusion && produit.produitsDetoures ? (
          // Composition de produits détourés posés directement sur le fond de
          // section (pas de cadre), chacun avec son ombre au sol. Au-delà de 2
          // produits, on bascule sur la compo groupée à 4 (fusionStage4).
          <div
            className={`${styles.fusionStage} ${
              produit.produitsDetoures.length > 2 ? styles.fusionStage4 : ''
            }`}
          >
            {/* Compo à 4 (Cheddar) : couche de rayons rotatifs derrière les
                produits (effet promo/street-food, les produits restent fixes). */}
            {produit.produitsDetoures.length > 2 && (
              <div className={styles.fusionRays} aria-hidden="true" />
            )}
            {produit.produitsDetoures.map((media, i) => (
              <img
                key={media.src}
                src={media.src}
                alt={i === 0 ? media.alt : ''}
                aria-hidden={i === 0 ? undefined : 'true'}
                loading="lazy"
                className={`${styles.fusionItem} ${
                  styles[`fusionItem${i + 1}`] || ''
                }`}
              />
            ))}

            {/* Vapeur CSS « plat chaud » : deux sources (bowl + tacos), chacune
                composée de plusieurs volutes qui montent en ondulant et se
                dissipent. Purement décoratif. */}
            {produit.steam && (
              <>
                <div className={`${styles.steam} ${styles.steamBowl}`} aria-hidden="true">
                  <span className={styles.steamPuff} />
                  <span className={styles.steamPuff} />
                  <span className={styles.steamPuff} />
                </div>
                <div className={`${styles.steam} ${styles.steamTacos}`} aria-hidden="true">
                  <span className={styles.steamPuff} />
                  <span className={styles.steamPuff} />
                  <span className={styles.steamPuff} />
                </div>
              </>
            )}
          </div>
        ) : (
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
        )}
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
