// Types métier du cabinet. Les dates sont des chaînes ISO 8601, comme elles
// arriveront de l'API.

export type PatientStatut = "actif" | "en_pause" | "archive";

export interface Patient {
  id: string;
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  statut: PatientStatut;
}

export type SeanceType = "premiere" | "suivi" | "couple" | "famille";
export type SeanceModalite = "cabinet" | "visio";
export type SeanceStatut =
  | "planifiee"
  | "confirmee"
  | "realisee"
  | "annulee"
  | "absence";

export interface Seance {
  id: string;
  patientId: string;
  debut: string;
  dureeMinutes: number;
  type: SeanceType;
  modalite: SeanceModalite;
  statut: SeanceStatut;
  tarif: number;
  notes?: string;
}

export type FactureStatut = "brouillon" | "envoyee" | "payee" | "en_retard";
export type MoyenPaiement = "carte" | "virement" | "especes" | "cheque";

export interface Facture {
  id: string;
  numero: string;
  patientId: string;
  seanceId: string;
  dateEmission: string;
  dateEcheance: string;
  montant: number;
  statut: FactureStatut;
  moyenPaiement?: MoyenPaiement;
}
