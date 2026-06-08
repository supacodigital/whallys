import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import HeroVideo from "../../components/HeroVideo/HeroVideo.jsx";
import UtilisationVideo from "../../components/UtilisationVideo/UtilisationVideo.jsx";
import WhatsAppButton from "../../components/WhatsAppButton/WhatsAppButton.jsx";
import { PRODUITS } from "../../data/produits.js";
import { VIDEOS } from "../../data/videos.js";
import styles from "./Home.module.css";

function Home() {
  return (
    <>
      <Navbar />

      <main>
        {/* ───────── Hero (vidéo de fond + contenu à gauche) ───────── */}
        <HeroVideo>
          <h1 className={styles.heroTitle}>
            Le goût qui <br />
            <em>fidélise</em>
            <br />
            vos clients
          </h1>
          <p className={styles.heroSubtitle}>
            Des sauces signature pensées pour les restaurateurs. Livraison
            rapide partout en Suisse romande.
          </p>
          <Link to="/commande" className={styles.heroCta}>
            <span>Commander maintenant</span>
            <span className={styles.heroCtaIcon} aria-hidden="true">
              <ArrowRight size={18} />
            </span>
          </Link>
        </HeroVideo>

        {/* Volet : tout le contenu sous le hero remonte par-dessus celui-ci
            (hero sticky en fond) avec des coins supérieurs arrondis. */}
        <div className={styles.sheet}>
          {/* ───────── Produits ───────── */}
          <section
            className={`${styles.section} ${styles.sectionProduits}`}
            id="produits"
          >
            <div className="container">
              <header className={styles.sectionHeader}>
                <p className={styles.sectionEyebrow}>Notre gamme</p>
                <h2 className={styles.sectionTitle}>
                  Les <em>produits</em>
                </h2>
                <p className={styles.sectionLede}>
                  Trois sauces signature, élaborées en petites séries pour les
                  cuisines qui veulent surprendre.
                </p>
              </header>

              <div className={styles.productsRows}>
                {PRODUITS.map((p, index) => (
                  <ProductCard
                    key={p.id}
                    produit={p}
                    reversed={index % 2 === 1}
                    dark={index === 1}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* ───────── L'utilisation (vidéos) ───────── */}
          <section className={`${styles.section} ${styles.sectionUtilisation}`}>
            <div className="container">
              <header className={styles.sectionHeader}>
                <p className={styles.sectionEyebrow}>En cuisine</p>
                <h2 className={styles.sectionTitle}>
                  L'<em>utilisation</em>
                </h2>
                <p className={styles.sectionLede}>
                  Découvrez comment nos sauces s'intègrent à vos créations.
                </p>
              </header>

              {/* Desktop : 3 vidéos côte à côte. Mobile : 1 seule vidéo (la première) */}
              <div className={styles.videosGrid}>
                {VIDEOS.map((video, index) => (
                  <figure
                    key={video.id}
                    className={`${styles.videoCard} ${
                      index > 0 ? styles.videoDesktopOnly : ""
                    }`}
                  >
                    <UtilisationVideo
                      src={video.src}
                      poster={video.poster}
                      className={styles.video}
                    />
                    <figcaption className={styles.videoCaption}>
                      {video.titre}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default Home;
