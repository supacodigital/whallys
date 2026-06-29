import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import CroustyBanner from "../../components/CroustyBanner/CroustyBanner.jsx";
import Hero from "../../components/Hero/Hero.jsx";
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
        {/* ───────── Hero plein écran : image des 3 sauces signature ───────── */}
        <Hero />

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
