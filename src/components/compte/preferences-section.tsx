"use client";

import { useState, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { Monitor, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldTitle } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const THEMES = [
  { value: "light", label: "Clair", icon: Sun },
  { value: "dark", label: "Sombre", icon: Moon },
  { value: "system", label: "Système", icon: Monitor },
];

const NOTIFICATIONS = [
  { id: "rappelEmail", titre: "Rappel par email", description: "Envoyé automatiquement au patient avant chaque séance." },
  { id: "rappelSms", titre: "Rappel par SMS", description: "Nécessite un numéro de mobile dans la fiche patient." },
  { id: "annulation", titre: "Annulations", description: "Être prévenu quand un patient annule une séance." },
  { id: "resume", titre: "Résumé hebdomadaire", description: "Un email chaque lundi avec le planning de la semaine." },
] as const;

type NotificationId = (typeof NOTIFICATIONS)[number]["id"];

// Vrai uniquement côté client : le thème n'est connu qu'après hydratation.
function useMonte() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export function PreferencesSection() {
  const { theme, setTheme } = useTheme();
  const monte = useMonte();
  const [delai, setDelai] = useState("24");
  const [notifs, setNotifs] = useState<Record<NotificationId, boolean>>({
    rappelEmail: true,
    rappelSms: false,
    annulation: true,
    resume: false,
  });

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Apparence</CardTitle>
          <CardDescription>Appliqué immédiatement et mémorisé sur cet appareil.</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={monte ? theme : undefined}
            onValueChange={setTheme}
            className="grid gap-3 sm:grid-cols-3"
          >
            {THEMES.map(({ value, label, icon: Icon }) => (
              <label
                key={value}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-lg border p-4 text-sm transition-colors hover:bg-muted/50",
                  monte && theme === value && "border-primary bg-primary/5"
                )}
              >
                <RadioGroupItem value={value} />
                <Icon className="size-4 text-muted-foreground" />
                {label}
              </label>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications et rappels</CardTitle>
          <CardDescription>Choisissez ce qui est envoyé automatiquement.</CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup className="gap-6">
            {NOTIFICATIONS.map((n) => (
              <Field key={n.id} orientation="horizontal">
                <FieldContent>
                  <FieldTitle>{n.titre}</FieldTitle>
                  <FieldDescription>{n.description}</FieldDescription>
                </FieldContent>
                <Switch
                  aria-label={n.titre}
                  checked={notifs[n.id]}
                  onCheckedChange={(v) => setNotifs((prev) => ({ ...prev, [n.id]: v }))}
                />
              </Field>
            ))}
            <Field orientation="horizontal">
              <FieldContent>
                <FieldLabel>Délai des rappels</FieldLabel>
                <FieldDescription>Combien de temps avant la séance.</FieldDescription>
              </FieldContent>
              <Select
                value={delai}
                onValueChange={setDelai}
                disabled={!notifs.rappelEmail && !notifs.rappelSms}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 heures</SelectItem>
                  <SelectItem value="24">24 heures</SelectItem>
                  <SelectItem value="48">48 heures</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>
        </CardContent>
        <CardFooter className="justify-end border-t">
          <Button
            onClick={() =>
              // TODO: PATCH /therapeutes/me/preferences quand l'endpoint existera.
              toast.success("Préférences enregistrées", {
                description: "Non persisté : l'API des préférences n'existe pas encore.",
              })
            }
          >
            Enregistrer
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
