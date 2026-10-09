import type {
  FactureStatut,
  MoyenPaiement,
  Patient,
  SeanceModalite,
  SeanceStatut,
  SeanceType,
} from "@/types/cabinet";

const LOCALE = "fr-FR";

export function formatDate(iso: string, options?: Intl.DateTimeFormatOptions) {
  return new Date(iso).toLocaleDateString(
    LOCALE,
    options ?? { day: "2-digit", month: "2-digit", year: "numeric" }
  );
}

export function formatDateLongue(iso: string) {
  return formatDate(iso, { weekday: "long", day: "numeric", month: "long" });
}

export function formatHeure(iso: string) {
  return new Date(iso).toLocaleTimeString(LOCALE, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function finSeance(debut: string, dureeMinutes: number) {
  return new Date(new Date(debut).getTime() + dureeMinutes * 60_000).toISOString();
}

export function formatEuros(montant: number) {
  return montant.toLocaleString(LOCALE, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: montant % 1 === 0 ? 0 : 2,
  });
}

export function nomComplet(patient?: Pick<Patient, "prenom" | "nom">) {
  return patient ? `${patient.prenom} ${patient.nom}` : "Patient inconnu";
}

export function initiales(patient?: Pick<Patient, "prenom" | "nom">) {
  return patient ? `${patient.prenom[0]}${patient.nom[0]}`.toUpperCase() : "?";
}

export const SEANCE_TYPE_LABEL: Record<SeanceType, string> = {
  premiere: "Première consultation",
  suivi: "Suivi",
  couple: "Couple",
  famille: "Famille",
};

export const SEANCE_MODALITE_LABEL: Record<SeanceModalite, string> = {
  cabinet: "Au cabinet",
  visio: "Visio",
};

export const SEANCE_STATUT_LABEL: Record<SeanceStatut, string> = {
  planifiee: "Planifiée",
  confirmee: "Confirmée",
  realisee: "Réalisée",
  annulee: "Annulée",
  absence: "Absence",
};

export const FACTURE_STATUT_LABEL: Record<FactureStatut, string> = {
  brouillon: "Brouillon",
  envoyee: "Envoyée",
  payee: "Payée",
  en_retard: "En retard",
};

export const MOYEN_PAIEMENT_LABEL: Record<MoyenPaiement, string> = {
  carte: "Carte",
  virement: "Virement",
  especes: "Espèces",
  cheque: "Chèque",
};
