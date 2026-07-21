import { ETAPES } from '../../data/etapes.js';
import styles from './UsageSteps.module.css';

/**
 * Section « L'utilisation » : 3 cards d'étapes. Horizontal sur desktop,
 * vertical sur mobile (géré en CSS).
 *
 * Le numéro d'étape est un badge sur la photo ; titre + texte sous l'image.
 * L'apparition en cascade au scroll est gérée en CSS (animation-delay par
 * index), neutralisée sous prefers-reduced-motion.
 */
function UsageSteps() {
  return (
    <section className={styles.section} aria-label="L'utilisation">
      <div className="container">
        <header className={styles.head}>
          <p className={styles.kicker}>L'utilisation</p>
          <h2 className={styles.title}>Utilisation simple en 3 étapes</h2>
        </header>

        <ol className={styles.steps}>
          {ETAPES.map((etape, index) => (
            <li key={etape.id} className={styles.card} style={{ '--i': index }}>
              <figure className={styles.media}>
                <span className={styles.badge} aria-hidden="true">
                  {etape.id}
                </span>
                {/* Pas de loading="lazy" : seulement quelques images, et le
                    lazy était mal déclenché à cause de l'empilement sticky des
                    produits au-dessus (le navigateur différait le chargement
                    indéfiniment → images vides sur mobile). */}
                {etape.images ? (
                  // Étape à visuels multiples : produits détourés empilés
                  // verticalement (ordre imposé par les données).
                  <div className={styles.stack}>
                    {etape.images.map((src, i) => (
                      <img
                        key={src}
                        src={src}
                        alt={i === 0 ? etape.titre : ''}
                        aria-hidden={i === 0 ? undefined : 'true'}
                        className={styles.stackImage}
                      />
                    ))}
                  </div>
                ) : (
                  <img
                    src={etape.image}
                    alt={etape.titre}
                    className={styles.image}
                  />
                )}
              </figure>
              <div className={styles.body}>
                <h3 className={styles.cardTitle}>{etape.titre}</h3>
                <p className={styles.cardText}>{etape.texte}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default UsageSteps;
