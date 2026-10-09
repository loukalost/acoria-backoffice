"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cabinetSchema, type CabinetFormValues } from "@/lib/cabinet/schema";

const MENTIONS_TVA = [
  "TVA non applicable, art. 261-4-1° du CGI",
  "TVA non applicable, art. 293 B du CGI",
];

export function CabinetForm() {
  const { control, handleSubmit, reset, formState } = useForm<CabinetFormValues>({
    resolver: zodResolver(cabinetSchema),
    defaultValues: {
      adresse: "",
      codePostal: "",
      ville: "",
      siret: "",
      dureeDefaut: 50,
      tarifDefaut: 60,
      tarifCouple: 90,
      cabinet: true,
      visio: true,
      mentionTva: MENTIONS_TVA[0],
    },
  });

  function onSubmit(values: CabinetFormValues) {
    if (!values.cabinet && !values.visio) {
      toast.error("Choisissez au moins une modalité de consultation");
      return;
    }
    // TODO: PATCH /cabinet quand l'endpoint existera.
    reset(values);
    toast.success("Cabinet enregistré", {
      description: "Non persisté : l'API du cabinet n'existe pas encore.",
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Cabinet et tarifs</CardTitle>
          <CardDescription>Adresse, informations légales et tarifs appliqués par défaut aux nouvelles séances.</CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup className="gap-8">
            <FieldSet>
              <FieldLegend>Adresse du cabinet</FieldLegend>
              <FieldGroup className="gap-6">
                <Controller
                  name="adresse"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="adresse">Adresse</FieldLabel>
                      <Input id="adresse" autoComplete="street-address" placeholder="12 rue de la Paix" aria-invalid={fieldState.invalid} {...field} />
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />
                <div className="grid gap-6 sm:grid-cols-[10rem_1fr]">
                  <Controller
                    name="codePostal"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="cp">Code postal</FieldLabel>
                        <Input id="cp" inputMode="numeric" autoComplete="postal-code" aria-invalid={fieldState.invalid} {...field} />
                        <FieldError errors={[fieldState.error]} />
                      </Field>
                    )}
                  />
                  <Controller
                    name="ville"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="ville">Ville</FieldLabel>
                        <Input id="ville" autoComplete="address-level2" aria-invalid={fieldState.invalid} {...field} />
                        <FieldError errors={[fieldState.error]} />
                      </Field>
                    )}
                  />
                </div>
              </FieldGroup>
            </FieldSet>

            <FieldSeparator />

            <FieldSet>
              <FieldLegend>Facturation</FieldLegend>
              <FieldGroup className="gap-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <Controller
                    name="siret"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="siret">SIRET</FieldLabel>
                        <Input id="siret" inputMode="numeric" placeholder="14 chiffres" aria-invalid={fieldState.invalid} {...field} />
                        <FieldError errors={[fieldState.error]} />
                      </Field>
                    )}
                  />
                  <Controller
                    name="mentionTva"
                    control={control}
                    render={({ field }) => (
                      <Field>
                        <FieldLabel>Mention TVA</FieldLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {MENTIONS_TVA.map((m) => (
                              <SelectItem key={m} value={m}>
                                {m}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FieldDescription>Affichée en bas de chaque facture.</FieldDescription>
                      </Field>
                    )}
                  />
                </div>
              </FieldGroup>
            </FieldSet>

            <FieldSeparator />

            <FieldSet>
              <FieldLegend>Séances par défaut</FieldLegend>
              <FieldGroup className="gap-6">
                <div className="grid gap-6 sm:grid-cols-3">
                  <Controller
                    name="dureeDefaut"
                    control={control}
                    render={({ field }) => (
                      <Field>
                        <FieldLabel>Durée</FieldLabel>
                        <Select value={String(field.value)} onValueChange={(v) => field.onChange(Number(v))}>
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[30, 45, 50, 60, 75, 90].map((d) => (
                              <SelectItem key={d} value={String(d)}>
                                {d} min
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </Field>
                    )}
                  />
                  {(["tarifDefaut", "tarifCouple"] as const).map((name) => (
                    <Controller
                      key={name}
                      name={name}
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={name}>
                            {name === "tarifDefaut" ? "Tarif individuel" : "Tarif couple / famille"}
                          </FieldLabel>
                          <InputGroup>
                            <InputGroupInput
                              id={name}
                              type="number"
                              min={0}
                              step={5}
                              aria-invalid={fieldState.invalid}
                              value={Number.isNaN(field.value) ? "" : field.value}
                              onChange={(e) => field.onChange(e.target.valueAsNumber)}
                              onBlur={field.onBlur}
                            />
                            <InputGroupAddon align="inline-end">
                              <InputGroupText>€</InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                          <FieldError errors={[fieldState.error]} />
                        </Field>
                      )}
                    />
                  ))}
                </div>

                <Field>
                  <FieldLabel>Modalités proposées</FieldLabel>
                  <div className="flex gap-6">
                    {(["cabinet", "visio"] as const).map((name) => (
                      <Controller
                        key={name}
                        name={name}
                        control={control}
                        render={({ field }) => (
                          <label className="flex items-center gap-2 text-sm">
                            <Checkbox checked={field.value} onCheckedChange={(v) => field.onChange(v === true)} />
                            {name === "cabinet" ? "Au cabinet" : "En visio"}
                          </label>
                        )}
                      />
                    ))}
                  </div>
                </Field>
              </FieldGroup>
            </FieldSet>
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
