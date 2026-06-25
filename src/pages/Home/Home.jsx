import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import CroustyBanner from "../../components/CroustyBanner/CroustyBanner.jsx";
import HeroSplit from "../../components/HeroSplit/HeroSplit.jsx";
import Marquee from "../../components/Marquee/Marquee.jsx";
import UsageSteps from "../../components/UsageSteps/UsageSteps.jsx";
import WhatsAppButton from "../../components/WhatsAppButton/WhatsAppButton.jsx";
import { PRODUITS } from "../../data/produits.js";
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from "../../data/contact.js";
import styles from "./Home.module.css";

// Lien WhatsApp pour le CTA principal du hero (demande client : "Commander" →
// ouvre WhatsApp). Numéro et message centralisés dans data/contact.js.
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

function Home() {
  return (
    <>
      <Navbar />

      <main>
        {/* ───────── Hero split-screen : 3 sauces « VS » pleine hauteur ───────── */}
        <HeroSplit />

        {/* Bande CTA sous le hero : titre + appel à l'action WhatsApp + livraison.
            (Le titre/CTA de l'ancien hero a migré ici puisque le split occupe tout
            le hero — on garde l'accroche et l'action principale.) */}
        <div className={styles.heroCtaBar}>
          <h1 className={styles.heroBarTitle}>
            Des sauces signature pensées pour les{" "}
            <em>restaurateurs</em>. Livraison rapide partout en Suisse en 24/48h.
          </h1>
          <p className={styles.heroBarSubtitle}>
            Le goût qui <em>fidélise</em> vos clients
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.heroCta}
          >
            <svg
              className={styles.heroCtaWa}
              viewBox="0 0 32 32"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M16.003 5.333c-5.887 0-10.667 4.78-10.667 10.667 0 1.88.49 3.71 1.423 5.327l-1.51 5.514 5.64-1.48a10.62 10.62 0 005.114 1.302h.004c5.886 0 10.666-4.78 10.666-10.667 0-2.85-1.11-5.53-3.126-7.546a10.6 10.6 0 00-7.544-3.117zm0 19.36h-.003a8.85 8.85 0 01-4.51-1.235l-.323-.192-3.347.878.893-3.263-.21-.335a8.82 8.82 0 01-1.353-4.72c0-4.89 3.98-8.87 8.87-8.87a8.81 8.81 0 016.27 2.6 8.81 8.81 0 012.597 6.276c0 4.89-3.98 8.87-8.87 8.87zm4.864-6.642c-.267-.134-1.577-.778-1.822-.867-.244-.089-.422-.133-.6.134-.178.266-.689.866-.845 1.044-.155.178-.31.2-.578.067-.267-.134-1.126-.415-2.144-1.323-.793-.707-1.328-1.58-1.484-1.847-.155-.267-.017-.41.117-.544.12-.12.267-.31.4-.466.134-.156.178-.267.267-.445.089-.178.044-.334-.022-.467-.067-.134-.6-1.447-.823-1.98-.216-.52-.436-.45-.6-.458l-.51-.009a.98.98 0 00-.71.334c-.245.266-.934.911-.934 2.224 0 1.313.956 2.58 1.09 2.758.133.178 1.88 2.87 4.556 4.025.637.275 1.134.439 1.521.561.64.204 1.222.175 1.682.106.513-.077 1.578-.645 1.8-1.268.223-.623.223-1.157.156-1.268-.067-.111-.245-.178-.512-.311z" />
            </svg>
            <span>Commander maintenant</span>
          </a>
        </div>

        {/* Bandeau d'accroches défilantes : transition entre le hero et les produits. */}
        <Marquee />

        {/* Volet : enveloppe tout le contenu sous le hero (fond opaque). */}
        <div className={styles.sheet}>
          {/* ───────── Produits (sans en-tête de section) ───────── */}
          <section className={styles.sectionProduits} id="produits">
            {/* Stack pleine largeur : chaque produit est une carte plein écran
                qui colle, la suivante glisse par-dessus la précédente au scroll. */}
            <div className={styles.productsStack}>
              {PRODUITS.map((p, index) => (
                <div key={p.id} className={styles.stackItem}>
                  {p.layout === "gta" ? (
                    <CroustyBanner produit={p} />
                  ) : (
                    <ProductCard
                      produit={p}
                      reversed={index % 2 === 1}
                      dark={index === 1}
                    />
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ───────── L'utilisation : 3 étapes reliées par des flèches ───────── */}
          <UsageSteps />
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default Home;
