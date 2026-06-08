import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Formate la liste des produits commandés en string lisible pour l'email
// Exemple : "Sauce Barbecue : 3 unités\nHoney Mustard : 2 unités"
function formatCommande(items, produits) {
  return produits
    .filter((p) => (items[p.id] ?? 0) > 0)
    .map((p) => `${p.nom} : ${items[p.id]} unité${items[p.id] > 1 ? 's' : ''}`)
    .join('\n');
}

/**
 * Envoie la commande au client via EmailJS.
 *
 * @param {object} params
 * @param {string} params.nomRestaurant
 * @param {string} params.departement
 * @param {string} params.dateLivraison — déjà formatée (ex. "lundi 28 mai 2026")
 * @param {object} params.items — map { [produitId]: quantité }
 * @param {Array} params.produits — liste PRODUITS pour le formatage
 */
export function sendCommande({ nomRestaurant, departement, dateLivraison, items, produits }) {
  const payload = {
    nom_restaurant: nomRestaurant,
    departement,
    date_livraison: dateLivraison,
    commande: formatCommande(items, produits),
  };

  // Mode démo : si les clés EmailJS ne sont pas configurées, on simule l'envoi
  // (délai réaliste + succès) au lieu de rejeter. Permet de valider tout le
  // parcours visuellement avant de brancher le vrai service.
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ status: 200, text: 'OK (démo)' }), 1100);
    });
  }

  return emailjs.send(SERVICE_ID, TEMPLATE_ID, payload, PUBLIC_KEY);
}
