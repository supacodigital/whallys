import { ArrowRight } from 'lucide-react';
import { Fragment } from 'react';
import { ETAPES } from '../../data/etapes.js';
import styles from './UsageSteps.module.css';

/**
 * Séparateur de progression : pastille ronde or/brun avec une flèche blanche.
 * Horizontale sur desktop, pivotée vers le bas sur mobile (géré en CSS).
 * Apparition en « pop » au scroll, synchronisée avec le stagger des cards.
 */
function StepArrow({ delay = 0 }) {
  return (
    <li className={styles.arrow} aria-hidden="true" style={{ '--pop-delay': `${delay}ms` }}>
      <span className={styles.pill}>
        <ArrowRight className={styles.pillIcon} aria-hidden="true" />
      </span>
    </li>
  );
}

/**
 * Section « L'utilisation » : 3 cards d'étapes reliées par des flèches qui
 * indiquent la progression (horizontal sur desktop, vertical sur mobile).
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
          <h2 className={styles.title}>Simple comme 1, 2, 3</h2>
        </header>

        <ol className={styles.steps}>
          {ETAPES.map((etape, index) => (
            <Fragment key={etape.id}>
              <li
                className={styles.card}
                style={{ '--i': index }}
              >
                <figure className={styles.media}>
                  <span className={styles.badge} aria-hidden="true">
                    {etape.id}
                  </span>
                  {/* Pas de loading="lazy" : seulement 3 petites images, et le
                      lazy était mal déclenché à cause de l'empilement sticky des
                      produits au-dessus (le navigateur différait le chargement
                      indéfiniment → images vides sur mobile). */}
                  <img
                    src={etape.image}
                    alt={etape.titre}
                    className={styles.image}
                  />
                </figure>
                <div className={styles.body}>
                  <h3 className={styles.cardTitle}>{etape.titre}</h3>
                  <p className={styles.cardText}>{etape.texte}</p>
                </div>
              </li>

              {/* Pastille flèche entre deux étapes (pas après la dernière). Le
                  délai cale le pop juste après l'apparition de la card. */}
              {index < ETAPES.length - 1 && (
                <StepArrow delay={index * 90 + 160} />
              )}
            </Fragment>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default UsageSteps;
