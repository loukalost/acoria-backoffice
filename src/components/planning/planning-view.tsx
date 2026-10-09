"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { PageHeader } from "@/components/shared/page-header";
import { SeanceStatutBadge } from "@/components/shared/status-badge";
import { SeanceDetailSheet } from "@/components/seances/seance-detail-sheet";
import { SeanceFormDialog } from "@/components/seances/seance-form-dialog";
import { useSeances } from "@/components/seances/use-seances";
import { formatEuros, formatHeure, nomComplet } from "@/lib/cabinet/format";
import type { SeanceFormValues } from "@/lib/cabinet/schema";
import { cn } from "@/lib/utils";
import type { Patient, Seance, SeanceStatut } from "@/types/cabinet";

const HEURE_DEBUT = 8;
const HEURE_FIN = 20;
const HAUTEUR_HEURE = 56; // px
const NB_JOURS_SEMAINE = 6; // lundi -> samedi
const HEURES = Array.from({ length: HEURE_FIN - HEURE_DEBUT }, (_, i) => HEURE_DEBUT + i);

const STYLE_STATUT: Record<SeanceStatut, string> = {
  confirmee: "bg-primary text-primary-foreground",
  planifiee: "bg-secondary text-secondary-foreground ring-1 ring-primary/30",
  realisee: "bg-muted text-muted-foreground",
  annulee: "bg-destructive/10 text-destructive line-through opacity-70",
  absence: "bg-highlight/25 text-foreground",
};

function debutDuJour(t: number | Date) {
  const d = new Date(t);
  d.setHours(0, 0, 0, 0);
  return d;
}

function lundi(t: number | Date) {
  const d = debutDuJour(t);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return d;
}

function ajouterJours(d: Date, n: number) {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

function memeJour(a: Date, b: Date) {
  return a.toDateString() === b.toDateString();
}

export function PlanningView({
  seances: seancesInitiales,
  patients,
  now,
}: {
  seances: Seance[];
  patients: Patient[];
  now: number;
}) {
  const { seances, creer, changerStatut, changerNotes } = useSeances(seancesInitiales);
  const [reference, setReference] = useState(() => debutDuJour(now));
  const [vue, setVue] = useState<"semaine" | "jour">("semaine");
  const [detailId, setDetailId] = useState<string | null>(null);
  const [creation, setCreation] = useState<Partial<SeanceFormValues> | null>(null);

  const patientsParId = useMemo(() => new Map(patients.map((p) => [p.id, p])), [patients]);
  const aujourdhui = debutDuJour(now);

  const jours = useMemo(() => {
    if (vue === "jour") return [reference];
    const l = lundi(reference);
    return Array.from({ length: NB_JOURS_SEMAINE }, (_, i) => ajouterJours(l, i));
  }, [vue, reference]);

  const debutPeriode = jours[0];

  const seancesPeriode = useMemo(() => {
    const fin = ajouterJours(jours[jours.length - 1], 1);
    return seances.filter((s) => {
      const d = new Date(s.debut);
      return d >= jours[0] && d < fin;
    });
  }, [seances, jours]);

  const seancesDuJourSelectionne = seances.filter((s) => memeJour(new Date(s.debut), reference));
  const joursAvecSeance = useMemo(
    () => seances.filter((s) => s.statut !== "annulee").map((s) => debutDuJour(new Date(s.debut))),
    [seances]
  );

  const actives = seancesPeriode.filter((s) => s.statut !== "annulee");
  const resume = {
    nombre: actives.length,
    heures: Math.round((actives.reduce((t, s) => t + s.dureeMinutes, 0) / 60) * 10) / 10,
    montant: actives.reduce((t, s) => t + s.tarif, 0),
  };

  function naviguer(sens: -1 | 1) {
    setReference((r) => ajouterJours(r, sens * (vue === "jour" ? 1 : 7)));
  }

  const libellePeriode =
    vue === "jour"
      ? reference.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
      : `${debutPeriode.toLocaleDateString("fr-FR", { day: "numeric", month: "long" })} – ${jours[jours.length - 1].toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}`;

  const detail = seances.find((s) => s.id === detailId) ?? null;
  const minutesMaintenant = (now - aujourdhui.getTime()) / 60_000 - HEURE_DEBUT * 60;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Planning"
        description="Vos séances de la semaine. Cliquez sur un créneau libre pour planifier une séance."
        actions={
          <Button onClick={() => setCreation({ date: reference })}>
            <Plus data-icon="inline-start" />
            Nouvelle séance
          </Button>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_300px]">
        <Card size="sm" className="min-w-0">
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <ButtonGroup>
                  <Button variant="outline" size="icon-sm" aria-label="Précédent" onClick={() => naviguer(-1)}>
                    <ChevronLeft />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setReference(aujourdhui)}>
                    Aujourd&apos;hui
                  </Button>
                  <Button variant="outline" size="icon-sm" aria-label="Suivant" onClick={() => naviguer(1)}>
                    <ChevronRight />
                  </Button>
                </ButtonGroup>
                <span className="text-sm font-medium first-letter:uppercase">{libellePeriode}</span>
              </div>
              <ToggleGroup
                type="single"
                variant="outline"
                spacing={0}
                size="sm"
                value={vue}
                onValueChange={(v) => v && setVue(v as "semaine" | "jour")}
              >
                <ToggleGroupItem value="semaine">Semaine</ToggleGroupItem>
                <ToggleGroupItem value="jour">Jour</ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className="overflow-x-auto">
              <div
                className="grid"
                style={{
                  gridTemplateColumns: `3.5rem repeat(${jours.length}, minmax(${vue === "jour" ? "12rem" : "8rem"}, 1fr))`,
                }}
              >
                {/* En-têtes des jours */}
                <div />
                {jours.map((j) => {
                  const estAujourdhui = memeJour(j, aujourdhui);
                  return (
                    <button
                      key={j.toISOString()}
                      type="button"
                      onClick={() => {
                        setReference(j);
                        setVue("jour");
                      }}
                      className="flex flex-col items-center gap-1 border-b pb-2 text-xs tracking-wider text-muted-foreground uppercase hover:text-foreground"
                    >
                      {j.toLocaleDateString("fr-FR", { weekday: "short" })}
                      <span
                        className={cn(
                          "flex size-8 items-center justify-center rounded-full text-base font-semibold text-foreground",
                          estAujourdhui && "bg-highlight text-highlight-foreground"
                        )}
                      >
                        {j.getDate()}
                      </span>
                    </button>
                  );
                })}

                {/* Colonne des heures */}
                <div className="relative">
                  {HEURES.map((h) => (
                    <div
                      key={h}
                      className="-translate-y-2 pr-2 text-right text-xs text-muted-foreground tabular-nums"
                      style={{ height: HAUTEUR_HEURE }}
                    >
                      {h}h
                    </div>
                  ))}
                </div>

                {/* Colonnes des jours */}
                {jours.map((j) => {
                  const duJour = seancesPeriode.filter((s) => memeJour(new Date(s.debut), j));
                  const estAujourdhui = memeJour(j, aujourdhui);
                  return (
                    <div key={j.toISOString()} className={cn("relative border-l", estAujourdhui && "bg-highlight/5")}>
                      {HEURES.map((h) => (
                        <button
                          key={h}
                          type="button"
                          aria-label={`Planifier le ${j.toLocaleDateString("fr-FR")} à ${h}h`}
                          className="group/slot block w-full border-b border-dashed border-border/70 hover:bg-accent/50"
                          style={{ height: HAUTEUR_HEURE }}
                          onClick={() =>
                            setCreation({ date: j, heure: `${String(h).padStart(2, "0")}:00` })
                          }
                        >
                          <Plus className="mx-auto hidden size-4 text-muted-foreground group-hover/slot:block" />
                        </button>
                      ))}

                      {estAujourdhui && minutesMaintenant > 0 && minutesMaintenant < HEURES.length * 60 && (
                        <div
                          className="pointer-events-none absolute inset-x-0 z-20 h-0.5 bg-highlight before:absolute before:-top-1 before:-left-1 before:size-2.5 before:rounded-full before:bg-highlight"
                          style={{ top: (minutesMaintenant / 60) * HAUTEUR_HEURE }}
                        />
                      )}

                      {duJour.map((s) => {
                        const d = new Date(s.debut);
                        const minutes = (d.getHours() - HEURE_DEBUT) * 60 + d.getMinutes();
                        const patient = patientsParId.get(s.patientId);
                        return (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => setDetailId(s.id)}
                            className={cn(
                              "absolute inset-x-1 z-10 flex flex-col overflow-hidden rounded-md px-2 py-1 text-left text-xs shadow-sm transition-transform outline-none hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-ring",
                              STYLE_STATUT[s.statut]
                            )}
                            style={{
                              top: (minutes / 60) * HAUTEUR_HEURE + 1,
                              height: (s.dureeMinutes / 60) * HAUTEUR_HEURE - 2,
                            }}
                          >
                            <span className="flex items-center gap-1 font-semibold">
                              {formatHeure(s.debut)}
                              {s.modalite === "visio" && <Video className="size-3" />}
                            </span>
                            <span className="truncate">{nomComplet(patient)}</span>
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-6">
          <Card size="sm">
            <CardContent className="flex justify-center px-2">
              <Calendar
                mode="single"
                selected={reference}
                onSelect={(d) => d && setReference(debutDuJour(d))}
                month={reference}
                onMonthChange={(m) => setReference(debutDuJour(m))}
                weekStartsOn={1}
                modifiers={{ seance: joursAvecSeance }}
                modifiersClassNames={{ seance: "font-bold text-primary" }}
              />
            </CardContent>
          </Card>

          <Card size="sm">
            <CardHeader>
              <CardTitle className="text-sm first-letter:uppercase">
                {memeJour(reference, aujourdhui)
                  ? "Aujourd'hui"
                  : reference.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {seancesDuJourSelectionne.length === 0 ? (
                <p className="text-sm text-muted-foreground">Aucune séance.</p>
              ) : (
                seancesDuJourSelectionne.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setDetailId(s.id)}
                    className="flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-accent"
                  >
                    <span className="flex flex-col">
                      <span className="font-medium tabular-nums">{formatHeure(s.debut)}</span>
                      <span className="text-xs text-muted-foreground">
                        {nomComplet(patientsParId.get(s.patientId))}
                      </span>
                    </span>
                    <SeanceStatutBadge statut={s.statut} />
                  </button>
                ))
              )}
            </CardContent>
          </Card>

          <Card size="sm">
            <CardHeader>
              <CardTitle className="text-sm">{vue === "jour" ? "Ce jour" : "Cette semaine"}</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="font-heading text-xl font-semibold">{resume.nombre}</div>
                <div className="text-xs text-muted-foreground">séances</div>
              </div>
              <div>
                <div className="font-heading text-xl font-semibold">{resume.heures} h</div>
                <div className="text-xs text-muted-foreground">de séance</div>
              </div>
              <div>
                <div className="font-heading text-xl font-semibold">{formatEuros(resume.montant)}</div>
                <div className="text-xs text-muted-foreground">prévus</div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-wrap gap-x-4 gap-y-2 px-1 text-xs text-muted-foreground">
            {(Object.keys(STYLE_STATUT) as SeanceStatut[]).map((statut) => (
              <SeanceStatutBadge key={statut} statut={statut} />
            ))}
          </div>
        </div>
      </div>

      <SeanceDetailSheet
        seance={detail}
        patient={detail ? patientsParId.get(detail.patientId) : undefined}
        now={now}
        onOpenChange={(open) => !open && setDetailId(null)}
        onStatutChange={changerStatut}
        onNotesChange={changerNotes}
      />

      <SeanceFormDialog
        open={creation !== null}
        onOpenChange={(open) => !open && setCreation(null)}
        patients={patients}
        defaultValues={creation ?? undefined}
        onCreate={creer}
      />
    </div>
  );
}
