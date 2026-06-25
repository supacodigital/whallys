import { useEffect } from 'react';

/**
 * Ajoute une balise <meta name="robots" content="noindex, nofollow"> dans le
 * <head> tant que le composant est monté, puis la retire au démontage.
 *
 * Utilisé sur les pages réservées (ex. /commande) pour qu'elles ne soient pas
 * indexées par les moteurs qui exécutent le JS. Complète le robots.txt
 * (lui, lu sans JS) en ceinture + bretelles.
 */
export function useNoindex() {
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(meta);
    };
  }, []);
}
