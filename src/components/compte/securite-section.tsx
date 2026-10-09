"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { motDePasseSchema, type MotDePasseFormValues } from "@/lib/cabinet/schema";

const CHAMPS: { name: keyof MotDePasseFormValues; label: string; autoComplete: string }[] = [
  { name: "actuel", label: "Mot de passe actuel", autoComplete: "current-password" },
  { name: "nouveau", label: "Nouveau mot de passe", autoComplete: "new-password" },
  { name: "confirmation", label: "Confirmer le nouveau mot de passe", autoComplete: "new-password" },
];

export function SecuriteSection() {
  const router = useRouter();
  const [deconnexion, setDeconnexion] = useState(false);
  const { control, handleSubmit, reset } = useForm<MotDePasseFormValues>({
    resolver: zodResolver(motDePasseSchema),
    defaultValues: { actuel: "", nouveau: "", confirmation: "" },
  });

  function onSubmit() {
    // TODO: POST /auth/change-password quand l'endpoint existera.
    reset();
    toast.success("Mot de passe modifié", {
      description: "Non persisté : l'API de changement de mot de passe n'existe pas encore.",
    });
  }

  async function seDeconnecter() {
    setDeconnexion(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Mot de passe</CardTitle>
            <CardDescription>8 caractères minimum, différent du mot de passe actuel.</CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup className="max-w-md gap-6">
              {CHAMPS.map(({ name, label, autoComplete }) => (
                <Controller
                  key={name}
                  name={name}
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={name}>{label}</FieldLabel>
                      <Input id={name} type="password" autoComplete={autoComplete} aria-invalid={fieldState.invalid} {...field} />
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />
              ))}
            </FieldGroup>
          </CardContent>
          <CardFooter className="justify-end border-t">
            <Button type="submit">Modifier le mot de passe</Button>
          </CardFooter>
        </Card>
      </form>

      <Card>
        <CardHeader>
          <CardTitle>Session</CardTitle>
          <CardDescription>Vous déconnecter de l&apos;espace thérapeute sur cet appareil.</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant="destructive" onClick={seDeconnecter} disabled={deconnexion}>
            {deconnexion ? <Spinner data-icon="inline-start" /> : <LogOut data-icon="inline-start" />}
            Se déconnecter
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
