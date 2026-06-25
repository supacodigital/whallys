import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import logo from '../../assets/logo.png';
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from '../../data/contact.js';
import { PRODUITS } from '../../data/produits.js';
import styles from './Navbar.module.css';

// Lien WhatsApp (numéro + message centralisés dans data/contact.js)
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Dropdown "Nos produits" (desktop) ouvert au survol / focus.
  const [productsOpen, setProductsOpen] = useState(false);
  const location = useLocation();

  // La navbar n'est transparente que sur la Home (hero vidéo sombre derrière).
  // Ailleurs, fond beige par défaut pour rester lisible.
  const isHome = location.pathname === '/';

  // Lien vers la section produits : ancre simple sur la Home, sinon on revient
  // à la Home avec l'ancre pour que le navigateur scrolle jusqu'à la section.
  const produitsHref = isHome ? '#produits' : '/#produits';

  // Lien vers une sauce précise : ancre sur la ligne produit (id = produit.id),
  // posée sur la Home. Les pages détail prendront le relais plus tard.
  const sauceHref = (id) => (isHome ? `#${id}` : `/#${id}`);

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
          {/* Menu déroulant "Nos produits" : ouvert au survol (souris) et au
              focus clavier. Le wrapper porte le survol pour couvrir le pont
              entre le déclencheur et le panneau (pas de trou qui referme). */}
          <div
            className={styles.dropdown}
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <a
              href={produitsHref}
              className={`${styles.navLink} ${styles.dropdownTrigger}`}
              aria-haspopup="true"
              aria-expanded={productsOpen}
              onFocus={() => setProductsOpen(true)}
            >
              Nos produits
              <ChevronDown
                size={15}
                className={styles.dropdownChevron}
                aria-hidden="true"
              />
            </a>

            {productsOpen && (
              <div className={styles.dropdownPanel} role="menu">
                {PRODUITS.map((p) => (
                  <a
                    key={p.id}
                    href={sauceHref(p.id)}
                    role="menuitem"
                    className={styles.dropdownItem}
                    style={{ '--accent': p.couleur }}
                    onClick={() => setProductsOpen(false)}
                  >
                    <span className={styles.dropdownDot} aria-hidden="true" />
                    <span className={styles.dropdownItemText}>
                      <span className={styles.dropdownItemName}>{p.nom}</span>
                      <span className={styles.dropdownItemAccroche}>
                        {p.accroche}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.navLink}
          >
            Nous contacter
          </a>
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
            {/* "Nos produits" : titre de groupe + sous-liste des 3 sauces. */}
            <div className={styles.mobileGroup}>
              <a
                href={produitsHref}
                className={styles.mobileLink}
                onClick={() => setOpen(false)}
              >
                Nos produits
              </a>
              <div className={styles.mobileSublist}>
                {PRODUITS.map((p) => (
                  <a
                    key={p.id}
                    href={sauceHref(p.id)}
                    className={styles.mobileSublink}
                    style={{ '--accent': p.couleur }}
                    onClick={() => setOpen(false)}
                  >
                    <span className={styles.dropdownDot} aria-hidden="true" />
                    {p.nom}
                  </a>
                ))}
              </div>
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mobileLink}
              onClick={() => setOpen(false)}
            >
              Nous contacter
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
