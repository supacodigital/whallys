import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE, CONTACT_EMAIL } from '../../data/contact.js';
import styles from './Footer.module.css';

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

function Footer() {
  const year = new Date().getFullYear();
  const location = useLocation();
  // Ancre vers la section produits : simple sur la Home, sinon retour à la Home.
  const produitsHref = location.pathname === '/' ? '#produits' : '/#produits';

  return (
    <footer className={styles.footer} id="contact">
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logoLink} aria-label="Whally's — accueil">
          <img src={logo} alt="Whally's" className={styles.logo} />
        </Link>

        <nav className={styles.links} aria-label="Liens de pied de page">
          <a href={produitsHref} className={styles.link}>
            Nos produits
          </a>
          <Link to="/commande" className={styles.link}>
            Commander
          </Link>
          <a href={`mailto:${CONTACT_EMAIL}`} className={styles.link}>
            {CONTACT_EMAIL}
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            WhatsApp
          </a>
        </nav>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>© {year} Whally&apos;s</p>
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
