import { HERO_VIDEO } from '../../data/heroVideo.js';
import { useVideoInView } from '../../utils/useVideoInView.js';
import styles from './HeroVideo.module.css';

/**
 * Hero plein écran : vidéo en fond (lue seulement quand visible) et bloc de
 * contenu (titre, sous-titre, CTA) aligné à gauche. Le contenu est en children.
 */
function HeroVideo({ children }) {
  const videoRef = useVideoInView();

  return (
    <section className={styles.hero}>
      <video
        ref={videoRef}
        className={styles.video}
        src={HERO_VIDEO.src}
        poster={HERO_VIDEO.poster}
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      {/* Dégradé latéral pour assombrir la gauche et garder le texte lisible */}
      <div className={styles.scrim} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>{children}</div>
    </section>
  );
}

export default HeroVideo;
