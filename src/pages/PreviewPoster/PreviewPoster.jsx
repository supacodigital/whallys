import PosterFromagere from '../../components/PosterFromagere/PosterFromagere.jsx';
import { getProduitById } from '../../data/produits.js';
import styles from './PreviewPoster.module.css';

// Page de preview isolée du composant PosterFromagere (dev uniquement) :
// rend la section seule + une GRILLE de coordonnées (repère 0→100 par moitié,
// celui des flèches) pour caler précisément les cibles. Non liée en public.
// La hauteur est forcée à 100vh pour être fidèle au rendu réel de la Home.
//
// Utilisation : /preview-poster?grid pour afficher la grille.
function PreviewPoster() {
  const produit = getProduitById('fromagere');
  const showGrid = typeof window !== 'undefined' && window.location.search.includes('grid');

  // Lignes 0,10,20…100 sur chaque moitié.
  const ticks = Array.from({ length: 11 }, (_, i) => i * 10);

  return (
    <div className={styles.wrap}>
      <PosterFromagere produit={produit} />

      {showGrid && (
        <div className={styles.gridLayer} aria-hidden="true">
          {['gauche', 'droite'].map((cote) => (
            <div key={cote} className={`${styles.gridHalf} ${styles[cote]}`}>
              {ticks.map((t) => (
                <div key={`v${t}`} className={styles.vline} style={{ left: `${t}%` }}>
                  <span className={styles.vlabel}>{t}</span>
                </div>
              ))}
              {ticks.map((t) => (
                <div key={`h${t}`} className={styles.hline} style={{ top: `${t}%` }}>
                  <span className={styles.hlabel}>{t}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PreviewPoster;
