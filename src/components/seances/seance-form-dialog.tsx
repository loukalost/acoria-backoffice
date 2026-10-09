"use client";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  nomComplet,
  SEANCE_MODALITE_LABEL,
  SEANCE_TYPE_LABEL,
} from "@/lib/cabinet/format";
import { seanceSchema, type SeanceFormValues } from "@/lib/cabinet/schema";
import type { Patient, Seance, SeanceType } from "@/types/cabinet";

const HEURES = Array.from({ length: 25 }, (_, i) => {
  const minutes = 8 * 60 + i * 30;
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
});

const DUREES = [30, 45, 50, 60, 75, 90];

export const TARIFS_PAR_DEFAUT: Record<SeanceType, number> = {
  premiere: 70,
  suivi: 60,
  couple: 90,
  famille: 100,
};

const VALEURS_VIDES: Partial<SeanceFormValues> = {
  patientId: "",
  heure: "",
  dureeMinutes: 50,
  type: "suivi",
  modalite: "cabinet",
};

export function SeanceFormDialog({
  open,
  onOpenChange,
  patients,
  defaultValues,
  onCreate,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patients: Patient[];
  defaultValues?: Partial<SeanceFormValues>;
  onCreate: (seance: Omit<Seance, "id">) => void;
}) {
  const { control, handleSubmit, reset } = useForm<SeanceFormValues>({
    resolver: zodResolver(seanceSchema),
    defaultValues: VALEURS_VIDES,
  });

  // Réinitialise le formulaire à chaque ouverture (avec un éventuel pré-remplissage).
  useEffect(() => {
    if (open) reset({ ...VALEURS_VIDES, ...defaultValues });
  }, [open, defaultValues, reset]);

  function onSubmit(values: SeanceFormValues) {
    const [h, m] = values.heure.split(":").map(Number);
    const debut = new Date(values.date);
    debut.setHours(h, m, 0, 0);

    onCreate({
      patientId: values.patientId,
      debut: debut.toISOString(),
      dureeMinutes: values.dureeMinutes,
      type: values.type,
      modalite: values.modalite,
      statut: "planifiee",
      tarif: TARIFS_PAR_DEFAUT[values.type],
    });
    onOpenChange(false);
  }

  const patientsActifs = patients.filter((p) => p.statut !== "archive");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Nouvelle séance</DialogTitle>
          <DialogDescription>
            La séance sera créée avec le statut « Planifiée ».
          </DialogDescription>
        </DialogHeader>

        <form id="seance-form" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup className="gap-6">
            <Controller
              name="patientId"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Patient</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full" aria-invalid={fieldState.invalid}>
                      <SelectValue placeholder="Choisir un patient" />
                    </SelectTrigger>
                    <SelectContent>
                      {patientsActifs.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {nomComplet(p)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />

            <div className="grid gap-6 sm:grid-cols-2">
              <Controller
                name="date"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Date</FieldLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          aria-invalid={fieldState.invalid}
                          className="w-full justify-between font-normal tracking-normal normal-case"
                        >
                          {field.value
                            ? field.value.toLocaleDateString("fr-FR", {
                                weekday: "short",
                                day: "numeric",
                                month: "short",
                              })
                            : "Choisir"}
                          <CalendarIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          weekStartsOn={1}
                        />
                      </PopoverContent>
                    </Popover>
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />

              <Controller
                name="heure"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Heure</FieldLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full" aria-invalid={fieldState.invalid}>
                        <SelectValue placeholder="Choisir" />
                      </SelectTrigger>
                      <SelectContent>
                        {HEURES.map((h) => (
                          <SelectItem key={h} value={h}>
                            {h}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Type</FieldLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(SEANCE_TYPE_LABEL).map(([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />

              <Controller
                name="dureeMinutes"
                control={control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Durée</FieldLabel>
                    <Select
                      value={String(field.value)}
                      onValueChange={(v) => field.onChange(Number(v))}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {DUREES.map((d) => (
                          <SelectItem key={d} value={String(d)}>
                            {d} min
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />
            </div>

            <Controller
              name="modalite"
              control={control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Modalité</FieldLabel>
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="flex gap-6"
                  >
                    {Object.entries(SEANCE_MODALITE_LABEL).map(([value, label]) => (
                      <label key={value} className="flex items-center gap-2 text-sm">
                        <RadioGroupItem value={value} />
                        {label}
                      </label>
                    ))}
                  </RadioGroup>
                </Field>
              )}
            />
          </FieldGroup>
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Annuler</Button>
          </DialogClose>
          <Button type="submit" form="seance-form">
            Créer la séance
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
