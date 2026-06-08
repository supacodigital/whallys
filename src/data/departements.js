// Liste des départements CH desservis (ordre numérique)
export const DEPARTEMENTS = [
  'CH10',
  'CH11',
  'CH12',
  'CH14',
  'CH16',
  'CH18',
  'CH19',
  'CH23',
  'CH25',
  'CH39',
  'CH60',
  'CH62',
];

// Groupes de livraison — règles définitives validées par le client
// Convention : 0 = dimanche, 1 = lundi, ..., 6 = samedi
export const LIVRAISON_GROUPES = {
  groupe1: {
    departements: ['CH10', 'CH11', 'CH12', 'CH25', 'CH60', 'CH62'],
    joursLivraison: [1, 2, 3, 4, 5], // Lu, Ma, Me, Je, Ve
  },
  groupe2: {
    departements: ['CH16', 'CH19', 'CH23'],
    joursLivraison: [1, 3, 5], // Lu, Me, Ve
  },
  groupe3: {
    departements: ['CH14', 'CH18', 'CH39'],
    joursLivraison: [2, 4], // Ma, Je
  },
};

// Retourne la clé du groupe pour un département donné
export function getGroupeForDepartement(dept) {
  for (const [key, group] of Object.entries(LIVRAISON_GROUPES)) {
    if (group.departements.includes(dept)) return key;
  }
  return null;
}
