import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from '../../data/contact.js';
import styles from './Hero.module.css';

// Les 3 sauces signature : nom + accent DA (utilisés par le titre empilé
// cliquable). Le fond (poster fourni par le client) contient déjà les
// produits et leurs labels — plus de scène/annotations codées ici.
const SAUCES = [
  { id: 'cheddar', nom: 'Cheddar', accent: '#d9701f' },
  { id: 'fromagere', nom: 'Fromagère', accent: '#e0a93a' },
  { id: 'crousty', nom: 'Crousty', accent: '#c0398b' },
];

// CTA principal : « Commander » ouvre WhatsApp (demande client).
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

/**
 * Hero plein écran immersif : fond = poster fourni par le client (produits +
 * labels déjà intégrés dans l'image). Titre + sous-titre + CTA en overlay,
 * ancrés à gauche.
 */
function Hero() {
  return (
    <section className={styles.hero} aria-label="Les trois sauces signature Whally's">
      {/* Décor de fond : poster client (produits + labels déjà intégrés). */}
      <div className={styles.bg} aria-hidden="true" />

      {/* Voile dégradé pour la lisibilité du texte (côté gauche/bas). */}
      <div className={styles.scrim} aria-hidden="true" />

      {/* Contenu en surimpression. */}
      <div className={styles.content}>
        <p className={styles.eyebrow}>Sauces Whally's</p>

        {/* Titre = les 3 sauces empilées, chacune cliquable vers sa section. */}
        <h1 className={styles.headline} aria-label="Fromagère, Crousty, Cheddar">
          {SAUCES.map((s) => (
            <span key={s.id} className={styles.headlineItem} style={{ '--accent': s.accent }}>
              <a href={`#${s.id}`} className={styles.headlineLink}>
                {s.nom}
              </a>
            </span>
          ))}
        </h1>

        <p className={styles.subline}>
          Trois sauces. <em>Un goût qui fidélise.</em>
        </p>

        <div className={styles.actions}>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cta}
          >
            <svg
              className={styles.ctaWa}
              viewBox="0 0 32 32"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M16.003 5.333c-5.887 0-10.667 4.78-10.667 10.667 0 1.88.49 3.71 1.423 5.327l-1.51 5.514 5.64-1.48a10.62 10.62 0 005.114 1.302h.004c5.886 0 10.666-4.78 10.666-10.667 0-2.85-1.11-5.53-3.126-7.546a10.6 10.6 0 00-7.544-3.117zm0 19.36h-.003a8.85 8.85 0 01-4.51-1.235l-.323-.192-3.347.878.893-3.263-.21-.335a8.82 8.82 0 01-1.353-4.72c0-4.89 3.98-8.87 8.87-8.87a8.81 8.81 0 016.27 2.6 8.81 8.81 0 012.597 6.276c0 4.89-3.98 8.87-8.87 8.87zm4.864-6.642c-.267-.134-1.577-.778-1.822-.867-.244-.089-.422-.133-.6.134-.178.266-.689.866-.845 1.044-.155.178-.31.2-.578.067-.267-.134-1.126-.415-2.144-1.323-.793-.707-1.328-1.58-1.484-1.847-.155-.267-.017-.41.117-.544.12-.12.267-.31.4-.466.134-.156.178-.267.267-.445.089-.178.044-.334-.022-.467-.067-.134-.6-1.447-.823-1.98-.216-.52-.436-.45-.6-.458l-.51-.009a.98.98 0 00-.71.334c-.245.266-.934.911-.934 2.224 0 1.313.956 2.58 1.09 2.758.133.178 1.88 2.87 4.556 4.025.637.275 1.134.439 1.521.561.64.204 1.222.175 1.682.106.513-.077 1.578-.645 1.8-1.268.223-.623.223-1.157.156-1.268-.067-.111-.245-.178-.512-.311z" />
            </svg>
            Commander
          </a>

          <a href="#fromagere" className={styles.ctaSecondary}>
            Voir les sauces
            <svg
              className={styles.ctaArrow}
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
