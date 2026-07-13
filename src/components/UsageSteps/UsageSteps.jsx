import { Fragment } from 'react';
import { ETAPES } from '../../data/etapes.js';
import styles from './UsageSteps.module.css';

/**
 * Connecteur : flèche courbe OR qui chevauche deux cards voisines (part du bas
 * de la card précédente, arrive en haut de la suivante). Style repris de la
 * section Fromagère (tracé SVG courbe + pointe), mais en or de la marque pour
 * ressortir sur le fond clair des cards.
 *
 * Le SVG est en position absolue, à cheval sur la jointure entre deux cards.
 * viewBox 0..100 + preserveAspectRatio="none" : le tracé épouse le rectangle du
 * connecteur, responsive. Les tracés desktop (horizontal) et mobile (vertical)
 * cohabitent, l'un ou l'autre étant masqué en CSS selon le breakpoint.
 */
function StepConnector({ index }) {
  return (
    <svg
      className={styles.connector}
      style={{ '--c': index }}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Tracé desktop : courbe horizontale de la card gauche vers la droite. */}
      <path d="M 8 34 C 34 12, 66 12, 92 34" className={styles.connectorPathH} />
      {/* Tracé mobile : courbe verticale de la card du haut vers celle du bas. */}
      <path d="M 34 8 C 12 34, 12 66, 34 92" className={styles.connectorPathV} />
    </svg>
  );
}

/**
 * Section « L'utilisation » : 3 cards d'étapes reliées par des flèches courbes
 * qui chevauchent les cards (progression). Horizontal sur desktop, vertical sur
 * mobile (géré en CSS).
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

        {/* Pointe de flèche or partagée par tous les connecteurs. */}
        <svg width="0" height="0" className={styles.defs} aria-hidden="true">
          <defs>
            <marker
              id="usageArrowHead"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path
                d="M 0 1 L 9 5 L 0 9"
                fill="none"
                stroke="var(--color-or-deep)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </marker>
          </defs>
        </svg>

        <ol className={styles.steps}>
          {ETAPES.map((etape, index) => (
            <Fragment key={etape.id}>
              <li className={styles.card} style={{ '--i': index }}>
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

              {/* Connecteur or à cheval sur la jointure : part de cette card et
                  arrive sur la suivante (pas après la dernière). */}
              {index < ETAPES.length - 1 && <StepConnector index={index} />}
            </Fragment>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default UsageSteps;
