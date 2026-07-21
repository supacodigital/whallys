import logo from '../../assets/logo.png';
import styles from './PosterSection.module.css';

// Section produit = poster fourni par le client (image finie : fond, produits
// et prix déjà intégrés), avec le texte de présentation (nom, accroche,
// description) superposé dans la zone vide à gauche de chaque poster.
function PosterSection({ produit }) {
  return (
    <section id={produit.id} className={styles.poster} aria-label={produit.nom}>
      <picture>
        {produit.posterMobile && (
          <source media="(max-width: 767px)" srcSet={produit.posterMobile} />
        )}
        <img
          src={produit.poster}
          alt={produit.nom}
          loading="lazy"
          className={styles.image}
        />
      </picture>

      <div
        className={`${styles.textBlock} ${
          produit.texteAlign === 'right' ? styles.textBlockRight : ''
        }`}
        style={{
          '--texte-top': produit.texteTop,
          '--texte-top-mobile': produit.texteTopMobile,
        }}
      >
        <div className={styles.textHead}>
          <h3 className={styles.titre}>{produit.nom}</h3>
          {produit.logo && (
            <img src={logo} alt="Whally's" className={styles.logo} />
          )}
        </div>
        <p className={styles.accroche}>{produit.accroche}</p>
        <p
          className={styles.description}
          style={produit.descriptionWidth ? { maxWidth: produit.descriptionWidth } : undefined}
        >
          {produit.description}
        </p>
      </div>
    </section>
  );
}

export default PosterSection;
