import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../../assets/logo.png';
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from '../../data/contact.js';
import styles from './Navbar.module.css';

// Lien WhatsApp (numéro + message centralisés dans data/contact.js)
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // La navbar n'est transparente que sur la Home (hero vidéo sombre derrière).
  // Ailleurs, fond beige par défaut pour rester lisible.
  const isHome = location.pathname === '/';

  // Lien vers la section produits : ancre simple sur la Home, sinon on revient
  // à la Home avec l'ancre pour que le navigateur scrolle jusqu'à la section.
  const produitsHref = isHome ? '#produits' : '/#produits';

  // Fermer le menu mobile lors d'un changement de route
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Bascule l'état "scrolled" pour passer la navbar de transparent à beige.
  // Sur les pages sans hero, on force d'emblée l'état beige.
  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll(); // état initial au montage / changement de route
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  // Verrouiller le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // La barre prend son fond beige opaque dès qu'on a scrollé OU que le menu
  // mobile est ouvert (sinon la barre resterait transparente par-dessus le menu).
  const solid = scrolled || open;

  return (
    <header
      className={`${styles.header} ${solid ? styles.headerScrolled : ''} ${
        open ? styles.headerMenuOpen : ''
      }`}
    >
      <div className={styles.inner}>
        <Link to="/" className={styles.logoLink} aria-label="Whally's — accueil">
          <img src={logo} alt="Whally's" className={styles.logo} />
        </Link>

        <nav className={styles.desktopNav} aria-label="Navigation principale">
          <a href={produitsHref} className={styles.navLink}>
            Nos produits
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.navLink}
          >
            Nous contacter
          </a>
          <Link to="/commande" className={styles.ctaLink}>
            Commander
          </Link>
        </nav>

        <button
          type="button"
          className={styles.burger}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Menu mobile en overlay — animé via @starting-style */}
      {open && (
        <div className={styles.mobileMenu} role="dialog" aria-label="Menu mobile">
          <nav className={styles.mobileNav}>
            <a href={produitsHref} className={styles.mobileLink} onClick={() => setOpen(false)}>
              Nos produits
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mobileLink}
              onClick={() => setOpen(false)}
            >
              Nous contacter
            </a>
            <Link to="/commande" className={styles.mobileCta} onClick={() => setOpen(false)}>
              Commander
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
