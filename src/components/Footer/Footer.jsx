import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Mail, Truck } from 'lucide-react';
import logo from '../../assets/logo.png';
import {
  WHATSAPP_NUMBER,
  WHATSAPP_MESSAGE,
  CONTACT_EMAIL,
} from '../../data/contact.js';
import { PRODUITS } from '../../data/produits.js';
import styles from './Footer.module.css';

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

// Icône WhatsApp (Lucide n'inclut pas le logo officiel).
function WhatsAppIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M16.003 5.333c-5.887 0-10.667 4.78-10.667 10.667 0 1.88.49 3.71 1.423 5.327l-1.51 5.514 5.64-1.48a10.62 10.62 0 005.114 1.302h.004c5.886 0 10.666-4.78 10.666-10.667 0-2.85-1.11-5.53-3.126-7.546a10.6 10.6 0 00-7.544-3.117zm0 19.36h-.003a8.85 8.85 0 01-4.51-1.235l-.323-.192-3.347.878.893-3.263-.21-.335a8.82 8.82 0 01-1.353-4.72c0-4.89 3.98-8.87 8.87-8.87a8.81 8.81 0 016.27 2.6 8.81 8.81 0 012.597 6.276c0 4.89-3.98 8.87-8.87 8.87zm4.864-6.642c-.267-.134-1.577-.778-1.822-.867-.244-.089-.422-.133-.6.134-.178.266-.689.866-.845 1.044-.155.178-.31.2-.578.067-.267-.134-1.126-.415-2.144-1.323-.793-.707-1.328-1.58-1.484-1.847-.155-.267-.017-.41.117-.544.12-.12.267-.31.4-.466.134-.156.178-.267.267-.445.089-.178.044-.334-.022-.467-.067-.134-.6-1.447-.823-1.98-.216-.52-.436-.45-.6-.458l-.51-.009a.98.98 0 00-.71.334c-.245.266-.934.911-.934 2.224 0 1.313.956 2.58 1.09 2.758.133.178 1.88 2.87 4.556 4.025.637.275 1.134.439 1.521.561.64.204 1.222.175 1.682.106.513-.077 1.578-.645 1.8-1.268.223-.623.223-1.157.156-1.268-.067-.111-.245-.178-.512-.311z" />
    </svg>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const produitsHref = isHome ? '#produits' : '/#produits';
  const sauceHref = (id) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <footer className={styles.footer} id="contact">
      {/* ───────── Bloc CTA éditorial ───────── */}
      <div className={`container ${styles.cta}`}>
        <div className={styles.ctaText}>
          <p className={styles.ctaEyebrow}>On vous régale</p>
          <h2 className={styles.ctaTitle}>
            Prêt à <em>fidéliser</em>
            <br />
            vos clients ?
          </h2>
        </div>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ctaButton}
        >
          <WhatsAppIcon className={styles.ctaButtonIcon} />
          <span>Commander sur WhatsApp</span>
          <ArrowRight size={18} aria-hidden="true" />
        </a>
      </div>

      {/* ───────── Colonnes ───────── */}
      <div className={`container ${styles.columns}`}>
        {/* Marque */}
        <div className={styles.brand}>
          <Link to="/" className={styles.logoLink} aria-label="Whally's — accueil">
            <img src={logo} alt="Whally's" className={styles.logo} />
          </Link>
          <p className={styles.tagline}>
            Des sauces signature pensées pour les restaurateurs.
          </p>
          <p className={styles.delivery}>
            <Truck size={15} aria-hidden="true" />
            Livraison 24/48h en Suisse romande
          </p>
        </div>

        {/* Navigation : les sauces */}
        <nav className={styles.col} aria-label="Nos sauces">
          <p className={styles.colTitle}>Nos sauces</p>
          {PRODUITS.map((p) => (
            <a key={p.id} href={sauceHref(p.id)} className={styles.link}>
              {p.nom}
            </a>
          ))}
        </nav>

        {/* Contact */}
        <nav className={styles.col} aria-label="Contact">
          <p className={styles.colTitle}>Contact</p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            WhatsApp
          </a>
          <a href={`mailto:${CONTACT_EMAIL}`} className={styles.linkWithIcon}>
            <Mail size={15} aria-hidden="true" />
            {CONTACT_EMAIL}
          </a>
          <a href={produitsHref} className={styles.link}>
            Nos produits
          </a>
        </nav>
      </div>

      {/* ───────── Barre du bas ───────── */}
      <div className={`container ${styles.bottom}`}>
        <p>© {year} Whally&apos;s — Tous droits réservés</p>
        <p className={styles.credit}>
          Site créé par{' '}
          <a
            href="https://supaco.digital"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.creditLink}
          >
            SupacoDigital
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
