import { z } from "zod";

export const seanceSchema = z.object({
  patientId: z.string().min(1, "Choisissez un patient"),
  date: z.date({ error: "Choisissez une date" }),
  heure: z.string().regex(/^\d{2}:\d{2}$/, "Choisissez une heure"),
  dureeMinutes: z.number().int().min(15).max(180),
  type: z.enum(["premiere", "suivi", "couple", "famille"]),
  modalite: z.enum(["cabinet", "visio"]),
});

export type SeanceFormValues = z.infer<typeof seanceSchema>;

export const profilSchema = z.object({
  prenom: z.string().min(1, "Le prénom est requis"),
  nom: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Adresse email invalide"),
  telephone: z
    .string()
    .regex(/^(\+33\s?|0)[1-9](\s?\d{2}){4}$/, "Numéro de téléphone invalide")
    .or(z.literal("")),
  specialite: z.string().min(1, "Choisissez une spécialité"),
  rpps: z
    .string()
    .regex(/^\d{11}$/, "Le numéro RPPS comporte 11 chiffres")
    .or(z.literal("")),
});

export type ProfilFormValues = z.infer<typeof profilSchema>;

export const cabinetSchema = z.object({
  adresse: z.string().min(1, "L'adresse est requise"),
  codePostal: z.string().regex(/^\d{5}$/, "Code postal invalide"),
  ville: z.string().min(1, "La ville est requise"),
  siret: z
    .string()
    .regex(/^\d{14}$/, "Le SIRET comporte 14 chiffres")
    .or(z.literal("")),
  dureeDefaut: z.number().int().min(15).max(180),
  tarifDefaut: z.number().min(0, "Le tarif doit être positif"),
  tarifCouple: z.number().min(0, "Le tarif doit être positif"),
  cabinet: z.boolean(),
  visio: z.boolean(),
  mentionTva: z.string(),
});

export type CabinetFormValues = z.infer<typeof cabinetSchema>;

export const motDePasseSchema = z
  .object({
    actuel: z.string().min(1, "Saisissez votre mot de passe actuel"),
    nouveau: z.string().min(8, "8 caractères minimum"),
    confirmation: z.string().min(1, "Confirmez le nouveau mot de passe"),
  })
  .refine((v) => v.nouveau === v.confirmation, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmation"],
  })
  .refine((v) => v.nouveau !== v.actuel, {
    message: "Le nouveau mot de passe doit être différent de l'actuel",
    path: ["nouveau"],
  });

export type MotDePasseFormValues = z.infer<typeof motDePasseSchema>;
