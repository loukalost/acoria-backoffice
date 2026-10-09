"use client";

import { useState } from "react";
import { CalendarClock, Clock, Euro, Mail, MapPin, Phone, Video } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { SeanceStatutBadge } from "@/components/shared/status-badge";
import {
  finSeance,
  formatDateLongue,
  formatEuros,
  formatHeure,
  initiales,
  nomComplet,
  SEANCE_MODALITE_LABEL,
  SEANCE_TYPE_LABEL,
} from "@/lib/cabinet/format";
import type { Patient, Seance, SeanceStatut } from "@/types/cabinet";

function Ligne({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-sm [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-muted-foreground">
      {icon}
      <span>{children}</span>
    </div>
  );
}

export function SeanceDetailSheet({
  seance,
  patient,
  now,
  onOpenChange,
  onStatutChange,
  onNotesChange,
}: {
  seance: Seance | null;
  patient?: Patient;
  now: number;
  onOpenChange: (open: boolean) => void;
  onStatutChange: (id: string, statut: SeanceStatut) => void;
  onNotesChange: (id: string, notes: string) => void;
}) {
  return (
    <Sheet open={seance !== null} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-md">
        {seance && (
          <SeanceDetail
            // Remonte le contenu à chaque séance pour réinitialiser le brouillon de notes.
            key={seance.id}
            seance={seance}
            patient={patient}
            now={now}
            onStatutChange={onStatutChange}
            onNotesChange={onNotesChange}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}

function SeanceDetail({
  seance,
  patient,
  now,
  onStatutChange,
  onNotesChange,
}: {
  seance: Seance;
  patient?: Patient;
  now: number;
  onStatutChange: (id: string, statut: SeanceStatut) => void;
  onNotesChange: (id: string, notes: string) => void;
}) {
  const [notes, setNotes] = useState(seance.notes ?? "");
  const aVenir = new Date(seance.debut).getTime() > now;
  const terminee = seance.statut === "annulee" || seance.statut === "realisee" || seance.statut === "absence";

  return (
    <>
      <SheetHeader>
        <div className="flex items-center gap-3">
          <Avatar size="lg">
            <AvatarFallback>{initiales(patient)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <SheetTitle>{nomComplet(patient)}</SheetTitle>
            <SeanceStatutBadge statut={seance.statut} />
          </div>
        </div>
        <SheetDescription>{SEANCE_TYPE_LABEL[seance.type]}</SheetDescription>
      </SheetHeader>

      <div className="flex flex-col gap-6 px-8">
        <div className="flex flex-col gap-3">
          <Ligne icon={<CalendarClock />}>
            <span className="capitalize">{formatDateLongue(seance.debut)}</span>
          </Ligne>
          <Ligne icon={<Clock />}>
            {formatHeure(seance.debut)} – {formatHeure(finSeance(seance.debut, seance.dureeMinutes))} ({seance.dureeMinutes} min)
          </Ligne>
          <Ligne icon={seance.modalite === "visio" ? <Video /> : <MapPin />}>
            {SEANCE_MODALITE_LABEL[seance.modalite]}
          </Ligne>
          <Ligne icon={<Euro />}>{formatEuros(seance.tarif)}</Ligne>
        </div>

        {patient && (
          <>
            <Separator />
            <div className="flex flex-col gap-3">
              <Ligne icon={<Mail />}>
                <a href={`mailto:${patient.email}`} className="underline-offset-4 hover:underline">
                  {patient.email}
                </a>
              </Ligne>
              <Ligne icon={<Phone />}>
                <a href={`tel:${patient.telephone.replace(/\s/g, "")}`} className="underline-offset-4 hover:underline">
                  {patient.telephone}
                </a>
              </Ligne>
            </div>
          </>
        )}

        <Separator />

        <Field>
          <FieldLabel htmlFor="notes-seance">Notes de séance</FieldLabel>
          <Textarea
            id="notes-seance"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Observations, points abordés, exercices proposés..."
            className="min-h-32"
          />
          <Button
            size="sm"
            variant="outline"
            className="self-end"
            disabled={notes === (seance.notes ?? "")}
            onClick={() => onNotesChange(seance.id, notes)}
          >
            Enregistrer les notes
          </Button>
        </Field>
      </div>

      {!terminee && (
        <SheetFooter>
          {aVenir && seance.statut === "planifiee" && (
            <Button onClick={() => onStatutChange(seance.id, "confirmee")}>Confirmer</Button>
          )}
          {!aVenir && (
            <>
              <Button onClick={() => onStatutChange(seance.id, "realisee")}>Marquer réalisée</Button>
              <Button variant="outline" onClick={() => onStatutChange(seance.id, "absence")}>
                Patient absent
              </Button>
            </>
          )}
          {aVenir && (
            <Button variant="destructive" onClick={() => onStatutChange(seance.id, "annulee")}>
              Annuler la séance
            </Button>
          )}
        </SheetFooter>
      )}
    </>
  );
}
