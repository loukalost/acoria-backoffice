"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";
import { formatDateLongue, formatHeure, SEANCE_STATUT_LABEL } from "@/lib/cabinet/format";
import type { Seance, SeanceStatut } from "@/types/cabinet";

// État local des séances. Les modifications ne sont pas persistées tant que
// l'API n'existe pas : elles sont perdues au rechargement de la page.
export function useSeances(initiales: Seance[]) {
  const [seances, setSeances] = useState(initiales);

  const creer = useCallback((data: Omit<Seance, "id">) => {
    const seance: Seance = { ...data, id: `local-${crypto.randomUUID()}` };
    setSeances((prev) => [...prev, seance].sort((a, b) => a.debut.localeCompare(b.debut)));
    toast.success("Séance créée", {
      description: `${formatDateLongue(seance.debut)} à ${formatHeure(seance.debut)}`,
    });
  }, []);

  const changerStatut = useCallback((id: string, statut: SeanceStatut) => {
    let precedent: SeanceStatut | undefined;
    setSeances((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        precedent = s.statut;
        return { ...s, statut };
      })
    );
    toast(`Séance : ${SEANCE_STATUT_LABEL[statut].toLowerCase()}`, {
      action: {
        label: "Rétablir",
        onClick: () => {
          if (!precedent) return;
          const ancien = precedent;
          setSeances((prev) => prev.map((s) => (s.id === id ? { ...s, statut: ancien } : s)));
        },
      },
    });
  }, []);

  const changerNotes = useCallback((id: string, notes: string) => {
    setSeances((prev) => prev.map((s) => (s.id === id ? { ...s, notes } : s)));
    toast.success("Notes enregistrées");
  }, []);

  return { seances, creer, changerStatut, changerNotes };
}
