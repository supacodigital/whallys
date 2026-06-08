import { useVideoInView } from '../../utils/useVideoInView.js';

/**
 * Vidéo de la section « L'utilisation » — lue seulement quand visible.
 * `className` est fourni par la page parente (styles de la grille vidéos).
 */
function UtilisationVideo({ src, poster, className }) {
  const videoRef = useVideoInView();

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      className={className}
    />
  );
}

export default UtilisationVideo;
