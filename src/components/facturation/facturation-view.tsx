"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  AlertTriangle,
  BellRing,
  CheckCircle2,
  Download,
  FileDown,
  FilePen,
  FileText,
  MoreHorizontal,
  Search,
  Send,
  Trash2,
  Wallet,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Field, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader, StatCard } from "@/components/shared/page-header";
import { FactureStatutBadge } from "@/components/shared/status-badge";
import {
  FACTURE_STATUT_LABEL,
  formatDate,
  formatEuros,
  MOYEN_PAIEMENT_LABEL,
  nomComplet,
} from "@/lib/cabinet/format";
import type { Facture, FactureStatut, MoyenPaiement, Patient } from "@/types/cabinet";

type Onglet = "toutes" | "a-encaisser" | "payees" | "brouillons";

const ONGLETS: Record<Onglet, FactureStatut[] | null> = {
  toutes: null,
  "a-encaisser": ["envoyee", "en_retard"],
  payees: ["payee"],
  brouillons: ["brouillon"],
};

const chartConfig = {
  encaisse: { label: "Encaissé", color: "var(--chart-1)" },
  attente: { label: "En attente", color: "var(--chart-2)" },
} satisfies ChartConfig;

function telechargerCsv(factures: Facture[], patients: Map<string, Patient>) {
  const lignes = [
    ["Numéro", "Patient", "Émission", "Échéance", "Montant", "Statut", "Paiement"],
    ...factures.map((f) => [
      f.numero,
      nomComplet(patients.get(f.patientId)),
      formatDate(f.dateEmission),
      formatDate(f.dateEcheance),
      f.montant.toFixed(2).replace(".", ","),
      FACTURE_STATUT_LABEL[f.statut],
      f.moyenPaiement ? MOYEN_PAIEMENT_LABEL[f.moyenPaiement] : "",
    ]),
  ];
  // Séparateur « ; » et BOM UTF-8 pour une ouverture correcte dans Excel (FR).
  const csv = "﻿" + lignes.map((l) => l.map((c) => `"${c.replace(/"/g, '""')}"`).join(";")).join("\r\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = `factures-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function FacturationView({
  factures: facturesInitiales,
  patients,
  now,
}: {
  factures: Facture[];
  patients: Patient[];
  now: number;
}) {
  const [factures, setFactures] = useState(facturesInitiales);
  const [onglet, setOnglet] = useState<Onglet>("toutes");
  const [recherche, setRecherche] = useState("");
  const [aEncaisser, setAEncaisser] = useState<Facture | null>(null);
  const [moyen, setMoyen] = useState<MoyenPaiement>("carte");
  const [aSupprimer, setASupprimer] = useState<Facture | null>(null);

  const patientsParId = useMemo(() => new Map(patients.map((p) => [p.id, p])), [patients]);

  function maj(id: string, patch: Partial<Facture>) {
    setFactures((prev) => prev.map((f) => (f.id === id ? { ...f, ...patch } : f)));
  }

  const stats = useMemo(() => {
    const debutMois = new Date(now);
    debutMois.setHours(0, 0, 0, 0);
    debutMois.setDate(1);
    const somme = (l: Facture[]) => l.reduce((t, f) => t + f.montant, 0);
    const encaisseMois = factures.filter(
      (f) => f.statut === "payee" && new Date(f.dateEmission) >= debutMois
    );
    const enAttente = factures.filter((f) => f.statut === "envoyee");
    const enRetard = factures.filter((f) => f.statut === "en_retard");
    const brouillons = factures.filter((f) => f.statut === "brouillon");
    return {
      encaisseMois: somme(encaisseMois),
      enAttente: somme(enAttente),
      nbEnAttente: enAttente.length,
      enRetard: somme(enRetard),
      nbEnRetard: enRetard.length,
      nbBrouillons: brouillons.length,
      montantBrouillons: somme(brouillons),
    };
  }, [factures, now]);

  const donneesGraphique = useMemo(() => {
    const mois = Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now);
      d.setDate(1);
      d.setMonth(d.getMonth() - 5 + i);
      return d;
    });
    return mois.map((m) => {
      const duMois = factures.filter((f) => {
        const d = new Date(f.dateEmission);
        return d.getMonth() === m.getMonth() && d.getFullYear() === m.getFullYear();
      });
      return {
        mois: m.toLocaleDateString("fr-FR", { month: "short" }),
        encaisse: duMois.filter((f) => f.statut === "payee").reduce((t, f) => t + f.montant, 0),
        attente: duMois.filter((f) => f.statut !== "payee").reduce((t, f) => t + f.montant, 0),
      };
    });
  }, [factures, now]);

  const filtrees = useMemo(() => {
    const statuts = ONGLETS[onglet];
    const q = recherche.trim().toLowerCase();
    return factures
      .filter((f) => !statuts || statuts.includes(f.statut))
      .filter(
        (f) =>
          !q ||
          f.numero.toLowerCase().includes(q) ||
          nomComplet(patientsParId.get(f.patientId)).toLowerCase().includes(q)
      )
      .sort((a, b) => b.dateEmission.localeCompare(a.dateEmission));
  }, [factures, onglet, recherche, patientsParId]);

  const total = filtrees.reduce((t, f) => t + f.montant, 0);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Facturation"
        description="Suivi des factures et des encaissements."
        actions={
          <Button variant="outline" onClick={() => telechargerCsv(filtrees, patientsParId)}>
            <Download data-icon="inline-start" />
            Exporter en CSV
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Encaissé ce mois" value={formatEuros(stats.encaisseMois)} icon={<Wallet />} />
        <StatCard
          label="En attente"
          value={formatEuros(stats.enAttente)}
          hint={`${stats.nbEnAttente} facture${stats.nbEnAttente > 1 ? "s" : ""} envoyée${stats.nbEnAttente > 1 ? "s" : ""}`}
          icon={<Send />}
        />
        <StatCard
          label="En retard"
          value={formatEuros(stats.enRetard)}
          hint={`${stats.nbEnRetard} facture${stats.nbEnRetard > 1 ? "s" : ""} échue${stats.nbEnRetard > 1 ? "s" : ""}`}
          icon={<AlertTriangle />}
        />
        <StatCard
          label="Brouillons"
          value={stats.nbBrouillons}
          hint={`${formatEuros(stats.montantBrouillons)} à émettre`}
          icon={<FilePen />}
        />
      </div>

      <Card size="sm">
        <CardHeader>
          <CardTitle>Chiffre d&apos;affaires</CardTitle>
          <CardDescription>6 derniers mois, par date d&apos;émission</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-64 w-full">
            <BarChart accessibilityLayer data={donneesGraphique}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="mois" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis tickLine={false} axisLine={false} width={48} tickFormatter={(v: number) => `${v} €`} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="encaisse" stackId="ca" fill="var(--color-encaisse)" />
              <Bar dataKey="attente" stackId="ca" fill="var(--color-attente)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card size="sm">
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <Tabs value={onglet} onValueChange={(v) => setOnglet(v as Onglet)}>
              <TabsList>
                <TabsTrigger value="toutes">Toutes</TabsTrigger>
                <TabsTrigger value="a-encaisser">À encaisser</TabsTrigger>
                <TabsTrigger value="payees">Payées</TabsTrigger>
                <TabsTrigger value="brouillons">Brouillons</TabsTrigger>
              </TabsList>
            </Tabs>
            <InputGroup className="sm:w-72">
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
              <InputGroupInput
                placeholder="N° de facture ou patient"
                value={recherche}
                onChange={(e) => setRecherche(e.target.value)}
              />
            </InputGroup>
          </div>

          {filtrees.length === 0 ? (
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <FileText />
                </EmptyMedia>
                <EmptyTitle>Aucune facture</EmptyTitle>
                <EmptyDescription>Aucune facture ne correspond à ces filtres.</EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            <div className="max-h-[32rem] overflow-y-auto">
              <Table>
                <TableHeader className="sticky top-0 z-10 bg-card">
                  <TableRow>
                    <TableHead>N°</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead className="hidden md:table-cell">Émission</TableHead>
                    <TableHead className="hidden lg:table-cell">Échéance</TableHead>
                    <TableHead className="text-right">Montant</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="hidden lg:table-cell">Paiement</TableHead>
                    <TableHead className="w-10" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtrees.map((f) => (
                    <TableRow key={f.id}>
                      <TableCell className="font-mono text-xs">{f.numero}</TableCell>
                      <TableCell>{nomComplet(patientsParId.get(f.patientId))}</TableCell>
                      <TableCell className="hidden md:table-cell">{formatDate(f.dateEmission)}</TableCell>
                      <TableCell className="hidden lg:table-cell">{formatDate(f.dateEcheance)}</TableCell>
                      <TableCell className="text-right tabular-nums">{formatEuros(f.montant)}</TableCell>
                      <TableCell>
                        <FactureStatutBadge statut={f.statut} />
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-muted-foreground">
                        {f.moyenPaiement ? MOYEN_PAIEMENT_LABEL[f.moyenPaiement] : "—"}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon-sm" aria-label="Actions">
                              <MoreHorizontal />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() =>
                                toast.info("Génération PDF", {
                                  description: "Disponible une fois le backend de facturation branché.",
                                })
                              }
                            >
                              <FileDown /> Télécharger le PDF
                            </DropdownMenuItem>
                            {f.statut === "brouillon" && (
                              <DropdownMenuItem
                                onClick={() => {
                                  maj(f.id, { statut: "envoyee" });
                                  toast.success(`Facture ${f.numero} envoyée`);
                                }}
                              >
                                <Send /> Envoyer au patient
                              </DropdownMenuItem>
                            )}
                            {(f.statut === "envoyee" || f.statut === "en_retard") && (
                              <>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setMoyen("carte");
                                    setAEncaisser(f);
                                  }}
                                >
                                  <CheckCircle2 /> Marquer comme payée
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => toast.success(`Relance envoyée pour ${f.numero}`)}
                                >
                                  <BellRing /> Relancer
                                </DropdownMenuItem>
                              </>
                            )}
                            {f.statut === "brouillon" && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem variant="destructive" onClick={() => setASupprimer(f)}>
                                  <Trash2 /> Supprimer
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          <div className="flex justify-between text-xs text-muted-foreground">
            <span>
              {filtrees.length} facture{filtrees.length > 1 ? "s" : ""}
            </span>
            <span>
              Total : <span className="font-semibold text-foreground tabular-nums">{formatEuros(total)}</span>
            </span>
          </div>
        </CardContent>
      </Card>

      <Dialog open={aEncaisser !== null} onOpenChange={(open) => !open && setAEncaisser(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Enregistrer le paiement</DialogTitle>
            <DialogDescription>
              Facture {aEncaisser?.numero} · {aEncaisser && formatEuros(aEncaisser.montant)}
            </DialogDescription>
          </DialogHeader>
          <Field>
            <FieldLabel>Moyen de paiement</FieldLabel>
            <RadioGroup value={moyen} onValueChange={(v) => setMoyen(v as MoyenPaiement)} className="grid grid-cols-2 gap-3">
              {Object.entries(MOYEN_PAIEMENT_LABEL).map(([value, label]) => (
                <label key={value} className="flex items-center gap-2 text-sm">
                  <RadioGroupItem value={value} />
                  {label}
                </label>
              ))}
            </RadioGroup>
          </Field>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Annuler</Button>
            </DialogClose>
            <Button
              onClick={() => {
                if (!aEncaisser) return;
                maj(aEncaisser.id, { statut: "payee", moyenPaiement: moyen });
                toast.success(`Facture ${aEncaisser.numero} marquée comme payée`);
                setAEncaisser(null);
              }}
            >
              Confirmer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={aSupprimer !== null} onOpenChange={(open) => !open && setASupprimer(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer le brouillon {aSupprimer?.numero} ?</AlertDialogTitle>
            <AlertDialogDescription>
              Le brouillon sera supprimé. La séance associée pourra être refacturée.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (!aSupprimer) return;
                setFactures((prev) => prev.filter((f) => f.id !== aSupprimer.id));
                toast.success("Brouillon supprimé");
              }}
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
