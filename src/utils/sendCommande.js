import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Formate la liste des produits commandés en string lisible pour l'email.
// Conditionnement B2B : 1 carton = poidsKg (10 kg).
// Exemple : "Sauce Cheddar : 3 cartons (30 kg)\nSauce Crousty : 2 cartons (20 kg)"
function formatCommande(items, produits) {
  const lignes = produits
    .filter((p) => (items[p.id] ?? 0) > 0)
    .map((p) => {
      const qty = items[p.id];
      const kg = qty * (p.poidsKg ?? 0);
      return `${p.nom} : ${qty} carton${qty > 1 ? 's' : ''} (${kg} kg)`;
    });

  // Ligne de total en bas (nombre de cartons + poids cumulé)
  const totalCartons = produits.reduce((sum, p) => sum + (items[p.id] ?? 0), 0);
  const totalKg = produits.reduce(
    (sum, p) => sum + (items[p.id] ?? 0) * (p.poidsKg ?? 0),
    0
  );
  lignes.push(
    `\nTotal : ${totalCartons} carton${totalCartons > 1 ? 's' : ''} (${totalKg} kg)`
  );

  return lignes.join('\n');
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
