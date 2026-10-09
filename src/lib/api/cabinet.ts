// Point d'accès unique aux données du cabinet.
// TODO: remplacer les données fictives par des appels apiFetch() quand les
// endpoints existeront côté backend (les signatures n'ont pas à changer).

import { genererDonnees } from "@/lib/mock/cabinet";
import type { Facture, Patient, Seance } from "@/types/cabinet";

export async function getPatients(): Promise<Patient[]> {
  return genererDonnees().patients;
}

export async function getSeances(): Promise<Seance[]> {
  return genererDonnees().seances;
}

export async function getFactures(): Promise<Facture[]> {
  return genererDonnees().factures;
}

// Heure de référence de la requête, transmise aux composants clients pour que
// le rendu serveur et le rendu client classent les séances (passées / à venir)
// de la même façon.
export function heureDeReference(): number {
  return Date.now();
}
