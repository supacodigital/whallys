// Calcul des dates de livraison disponibles selon le département CH.
//
// Règles consolidées (validées client) :
//
// Groupe 1 (CH10, CH11, CH12, CH25, CH60, CH62) → Lu/Ma/Me/Je/Ve
//   • Commande avant 12h  → livraison J+1 (lendemain ouvré)
//   • Commande après 12h  → livraison J+2 (ouvré)
//   • Vendredi avant 12h  → livraison lundi
//   • Week-end exclu (saute au lundi)
//
// Groupe 2 (CH16, CH19, CH23) → Lu/Me/Ve
//   • Pour livrer un Lu, Me ou Ve, il faut avoir commandé avant la veille 12h.
//   • Ex : commande avant vendredi 12h → lundi ;
//          commande avant mardi 12h → mercredi ;
//          commande avant jeudi 12h → vendredi.
//
// Groupe 3 (CH14, CH18, CH39) → Ma/Je
//   • Pour livrer un Ma ou Je, il faut avoir commandé avant la veille 12h.
//   • Ex : commande avant lundi 12h → mardi ;
//          commande avant mercredi 12h → jeudi.
//
// Principe générique : pour chaque date de livraison candidate, on calcule sa
// "deadline de commande" (la veille à 12h00). Si maintenant <= deadline, la
// date est proposée. Pour le groupe 1, on applique en plus la règle J+1/J+2.

import { getGroupeForDepartement, LIVRAISON_GROUPES } from '../data/departements.js';

const CUTOFF_HOUR = 12;
const HORIZON_DAYS = 60; // fenêtre de calcul des prochains créneaux

// Renvoie une nouvelle Date à minuit, sans muter l'originale
function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

// Ajoute n jours (immutable)
function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

// Renvoie la deadline de commande (veille du jour de livraison à 12h00)
function getOrderDeadline(deliveryDate) {
  const deadline = addDays(deliveryDate, -1);
  deadline.setHours(CUTOFF_HOUR, 0, 0, 0);
  return deadline;
}

// Renvoie true si on est avant 12h aujourd'hui
function isBeforeCutoffToday(now) {
  return now.getHours() < CUTOFF_HOUR;
}

// Trouve la prochaine date qui correspond à un des jours autorisés du groupe
function nextAllowedDay(fromDate, joursLivraison) {
  let d = startOfDay(fromDate);
  for (let i = 0; i < HORIZON_DAYS; i++) {
    if (joursLivraison.includes(d.getDay())) return d;
    d = addDays(d, 1);
  }
  return null;
}

/**
 * Retourne la liste des dates de livraison disponibles pour un département donné.
 *
 * @param {string} departement — code CH (ex. "CH12")
 * @param {Date} [now=new Date()] — date/heure de référence (pour les tests)
 * @returns {Date[]} dates à minuit, triées croissantes
 */
export function getAvailableDeliveryDates(departement, now = new Date()) {
  const groupeKey = getGroupeForDepartement(departement);
  if (!groupeKey) return [];

  const { joursLivraison } = LIVRAISON_GROUPES[groupeKey];

  // Calcul de la première date livrable selon le groupe.
  let earliest;
  if (groupeKey === 'groupe1') {
    // Groupe 1 : règle J+1 si avant 15h, sinon J+2, en sautant le week-end.
    const offset = isBeforeCutoffToday(now) ? 1 : 2;
    earliest = nextAllowedDay(addDays(startOfDay(now), offset), joursLivraison);
  } else {
    // Groupes 2 et 3 : on parcourt les jours du groupe et on garde ceux dont
    // la deadline (veille 15h) n'est pas dépassée.
    earliest = startOfDay(addDays(now, 1));
  }

  if (!earliest) return [];

  const dates = [];
  let current = startOfDay(earliest);
  const horizonEnd = addDays(startOfDay(now), HORIZON_DAYS);

  while (current <= horizonEnd) {
    if (joursLivraison.includes(current.getDay())) {
      if (groupeKey === 'groupe1') {
        // Pour le groupe 1, "earliest" garantit déjà la conformité au cutoff
        dates.push(new Date(current));
      } else {
        // Groupes 2 et 3 : on vérifie strictement la deadline veille 15h
        const deadline = getOrderDeadline(current);
        if (now <= deadline) {
          dates.push(new Date(current));
        }
      }
    }
    current = addDays(current, 1);
  }

  return dates;
}

/**
 * Première date de livraison disponible — utile pour pré-remplir le select.
 */
export function getDefaultDeliveryDate(departement, now = new Date()) {
  const dates = getAvailableDeliveryDates(departement, now);
  return dates[0] ?? null;
}

/**
 * Vérifie qu'une date est bien une date de livraison valide.
 */
export function isDeliveryDateValid(departement, date, now = new Date()) {
  const dates = getAvailableDeliveryDates(departement, now);
  const target = startOfDay(date).getTime();
  return dates.some((d) => d.getTime() === target);
}

// Format ISO YYYY-MM-DD (locale-safe, pour <input type="date"> et clés React)
export function formatDateISO(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// Format affichage humain FR (ex : "lundi 28 mai 2026")
const DATE_FORMATTER = new Intl.DateTimeFormat('fr-CH', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export function formatDateHuman(date) {
  return DATE_FORMATTER.format(date);
}
