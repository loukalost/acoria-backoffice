// Données fictives en attendant les endpoints du backend.
// Les séances sont générées autour de la semaine courante pour que le planning
// ne soit jamais vide. Tout est déterministe (pas de Math.random()).

import type {
  Facture,
  FactureStatut,
  MoyenPaiement,
  Patient,
  Seance,
  SeanceStatut,
  SeanceType,
} from "@/types/cabinet";

export const mockPatients: Patient[] = [
  { id: "p1", prenom: "Camille", nom: "Martin", email: "camille.martin@mail.fr", telephone: "06 12 34 56 78", statut: "actif" },
  { id: "p2", prenom: "Lucas", nom: "Bernard", email: "lucas.bernard@mail.fr", telephone: "06 23 45 67 89", statut: "actif" },
  { id: "p3", prenom: "Inès", nom: "Dubois", email: "ines.dubois@mail.fr", telephone: "06 34 56 78 90", statut: "en_pause" },
  { id: "p4", prenom: "Hugo", nom: "Laurent", email: "hugo.laurent@mail.fr", telephone: "06 45 67 89 01", statut: "actif" },
  { id: "p5", prenom: "Léa", nom: "Moreau", email: "lea.moreau@mail.fr", telephone: "06 56 78 90 12", statut: "actif" },
  { id: "p6", prenom: "Nathan", nom: "Petit", email: "nathan.petit@mail.fr", telephone: "06 67 89 01 23", statut: "actif" },
  { id: "p7", prenom: "Chloé", nom: "Roux", email: "chloe.roux@mail.fr", telephone: "06 78 90 12 34", statut: "actif" },
  { id: "p8", prenom: "Julien", nom: "Fournier", email: "julien.fournier@mail.fr", telephone: "06 89 01 23 45", statut: "actif" },
];

// Créneau hebdomadaire récurrent de chaque patient.
// jour : 0 = lundi ... 5 = samedi
const creneaux: {
  patientId: string;
  jour: number;
  heure: number;
  minute: number;
  duree: number;
  type: SeanceType;
  visio: boolean;
  depuisSemaine: number;
}[] = [
  { patientId: "p1", jour: 0, heure: 9, minute: 0, duree: 50, type: "suivi", visio: false, depuisSemaine: -8 },
  { patientId: "p2", jour: 0, heure: 14, minute: 0, duree: 50, type: "suivi", visio: true, depuisSemaine: -6 },
  { patientId: "p4", jour: 1, heure: 10, minute: 30, duree: 50, type: "suivi", visio: false, depuisSemaine: -1 },
  { patientId: "p5", jour: 1, heure: 17, minute: 0, duree: 75, type: "couple", visio: false, depuisSemaine: -8 },
  { patientId: "p6", jour: 2, heure: 9, minute: 30, duree: 50, type: "suivi", visio: true, depuisSemaine: -5 },
  { patientId: "p7", jour: 2, heure: 15, minute: 0, duree: 90, type: "famille", visio: false, depuisSemaine: -4 },
  { patientId: "p8", jour: 3, heure: 11, minute: 0, duree: 50, type: "suivi", visio: false, depuisSemaine: -7 },
  { patientId: "p3", jour: 3, heure: 18, minute: 0, duree: 50, type: "suivi", visio: true, depuisSemaine: -8 },
  { patientId: "p1", jour: 4, heure: 10, minute: 0, duree: 50, type: "suivi", visio: true, depuisSemaine: -3 },
  { patientId: "p2", jour: 4, heure: 16, minute: 30, duree: 50, type: "suivi", visio: false, depuisSemaine: -2 },
  { patientId: "p6", jour: 5, heure: 10, minute: 0, duree: 50, type: "suivi", visio: false, depuisSemaine: -1 },
];

const TARIFS: Record<SeanceType, number> = {
  premiere: 70,
  suivi: 60,
  couple: 90,
  famille: 100,
};

const NOTES = [
  "Travail sur la gestion de l'anxiété au travail. Exercices de respiration proposés.",
  "Retour sur la semaine écoulée, sommeil en amélioration.",
  "Exploration des schémas relationnels familiaux.",
  "Mise en place d'un journal des pensées automatiques.",
];

function lundiDeLaSemaine(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const jour = (d.getDay() + 6) % 7; // 0 = lundi
  d.setDate(d.getDate() - jour);
  return d;
}

function genererSeances(): Seance[] {
  const maintenant = new Date();
  const lundi = lundiDeLaSemaine(maintenant);
  const seances: Seance[] = [];
  let n = 0;

  for (let semaine = -8; semaine <= 3; semaine++) {
    for (const c of creneaux) {
      if (semaine < c.depuisSemaine) continue;
      // Inès est en pause depuis 2 semaines.
      if (c.patientId === "p3" && semaine > -2) continue;

      const debut = new Date(lundi);
      debut.setDate(lundi.getDate() + semaine * 7 + c.jour);
      debut.setHours(c.heure, c.minute, 0, 0);

      const type: SeanceType = semaine === c.depuisSemaine ? "premiere" : c.type;
      const passee = debut.getTime() + c.duree * 60_000 < maintenant.getTime();
      n++;

      let statut: SeanceStatut;
      if (passee) {
        statut = n % 17 === 0 ? "annulee" : n % 23 === 0 ? "absence" : "realisee";
      } else {
        statut = n % 13 === 0 ? "annulee" : semaine === 0 || n % 3 !== 0 ? "confirmee" : "planifiee";
      }

      seances.push({
        id: `s${n}`,
        patientId: c.patientId,
        debut: debut.toISOString(),
        dureeMinutes: c.duree,
        type,
        modalite: c.visio ? "visio" : "cabinet",
        statut,
        tarif: TARIFS[type],
        notes: statut === "realisee" ? NOTES[n % NOTES.length] : undefined,
      });
    }
  }

  return seances.sort((a, b) => a.debut.localeCompare(b.debut));
}

function genererFactures(seances: Seance[]): Facture[] {
  const maintenant = Date.now();
  const moyens: MoyenPaiement[] = ["carte", "virement", "especes", "cheque"];
  const facturables = seances.filter(
    (s) => s.statut === "realisee" || s.statut === "absence"
  );

  return facturables.map((s, i) => {
    const emission = new Date(s.debut);
    const echeance = new Date(emission);
    echeance.setDate(echeance.getDate() + 30);
    const age = (maintenant - emission.getTime()) / 86_400_000;

    let statut: FactureStatut;
    if (age < 2) statut = "brouillon";
    else if (i % 11 === 0 && age > 30) statut = "en_retard";
    else if (age > 14 || i % 4 !== 0) statut = "payee";
    else statut = "envoyee";

    return {
      id: `f${i + 1}`,
      numero: `${emission.getFullYear()}-${String(i + 1).padStart(4, "0")}`,
      patientId: s.patientId,
      seanceId: s.id,
      dateEmission: emission.toISOString(),
      dateEcheance: echeance.toISOString(),
      montant: s.tarif,
      statut,
      moyenPaiement: statut === "payee" ? moyens[i % moyens.length] : undefined,
    };
  });
}

// Régénéré à chaque appel pour rester calé sur la date du jour, même si le
// serveur tourne depuis plusieurs jours.
export function genererDonnees() {
  const seances = genererSeances();
  return { patients: mockPatients, seances, factures: genererFactures(seances) };
}
