import { useEffect, useRef } from 'react';

/**
 * Ne lit une vidéo que lorsqu'elle est visible à l'écran, et la met en pause
 * dès qu'elle en sort. Évite que plusieurs vidéos décodent en même temps
 * (cause principale de lag quand la page en contient beaucoup).
 *
 * Utilisation :
 *   const videoRef = useVideoInView();
 *   <video ref={videoRef} src="..." muted loop playsInline preload="none" />
 *
 * La vidéo NE doit PAS avoir l'attribut autoPlay : c'est le hook qui déclenche
 * la lecture au bon moment.
 */
export function useVideoInView({ rootMargin = '200px' } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    // Respect de prefers-reduced-motion : on n'anime pas, on garde le poster.
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          // play() peut rejeter (ex. onglet en arrière-plan) → on ignore.
          const p = video.play();
          if (p && typeof p.catch === 'function') p.catch(() => {});
        } else {
          video.pause();
        }
      },
      // rootMargin : on précharge/lance un peu avant l'entrée réelle pour
      // éviter un démarrage visible.
      { rootMargin, threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [rootMargin]);

  return ref;
}
