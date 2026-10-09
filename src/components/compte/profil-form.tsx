"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { profilSchema, type ProfilFormValues } from "@/lib/cabinet/schema";
import type { Therapeute } from "@/types/auth";

const SPECIALITES = [
  "Psychologue clinicien·ne",
  "Psychothérapeute",
  "Psychiatre",
  "Psychanalyste",
  "Neuropsychologue",
  "Thérapeute de couple et familial",
];

export function ProfilForm({ therapeute }: { therapeute: Therapeute | null }) {
  const { control, handleSubmit, reset, formState } = useForm<ProfilFormValues>({
    resolver: zodResolver(profilSchema),
    defaultValues: {
      prenom: therapeute?.prenom ?? "",
      nom: therapeute?.nom ?? "",
      email: therapeute?.email ?? "",
      telephone: "",
      specialite: "",
      rpps: "",
    },
  });

  function onSubmit(values: ProfilFormValues) {
    // TODO: PATCH /therapeutes/me quand l'endpoint existera.
    reset(values);
    toast.success("Profil enregistré", {
      description: "Non persisté : l'API de profil n'existe pas encore.",
    });
  }

  const initiales = `${therapeute?.prenom?.[0] ?? ""}${therapeute?.nom?.[0] ?? ""}`.toUpperCase() || "?";

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Profil</CardTitle>
          <CardDescription>Ces informations apparaissent sur vos factures et pour vos patients.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <Avatar size="lg" className="size-16">
              <AvatarFallback className="text-lg">{initiales}</AvatarFallback>
            </Avatar>
            <div className="text-sm text-muted-foreground">
              La photo de profil sera disponible prochainement.
            </div>
          </div>

          <FieldGroup className="gap-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <Controller
                name="prenom"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="prenom">Prénom</FieldLabel>
                    <Input id="prenom" autoComplete="given-name" aria-invalid={fieldState.invalid} {...field} />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
              <Controller
                name="nom"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="nom">Nom</FieldLabel>
                    <Input id="nom" autoComplete="family-name" aria-invalid={fieldState.invalid} {...field} />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input id="email" type="email" autoComplete="email" aria-invalid={fieldState.invalid} {...field} />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
              <Controller
                name="telephone"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="telephone">Téléphone</FieldLabel>
                    <Input id="telephone" type="tel" autoComplete="tel" placeholder="06 12 34 56 78" aria-invalid={fieldState.invalid} {...field} />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <Controller
                name="specialite"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Spécialité</FieldLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full" aria-invalid={fieldState.invalid}>
                        <SelectValue placeholder="Choisir" />
                      </SelectTrigger>
                      <SelectContent>
                        {SPECIALITES.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
              <Controller
                name="rpps"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="rpps">N° RPPS</FieldLabel>
                    <Input id="rpps" inputMode="numeric" placeholder="11 chiffres" aria-invalid={fieldState.invalid} {...field} />
                    <FieldDescription>Remplace le numéro ADELI pour les psychologues.</FieldDescription>
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
            </div>
          </FieldGroup>
        </CardContent>
        <CardFooter className="justify-end gap-2 border-t">
          <Button type="button" variant="outline" disabled={!formState.isDirty} onClick={() => reset()}>
            Annuler
          </Button>
          <Button type="submit" disabled={!formState.isDirty}>
            Enregistrer
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
