"use client";

import { useMemo, useState } from "react";
import {
  CalendarCheck,
  CalendarClock,
  CalendarX,
  CheckCircle2,
  Eye,
  MapPin,
  MoreHorizontal,
  Plus,
  Search,
  UserX,
  Video,
  XCircle,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { SeanceStatutBadge } from "@/components/shared/status-badge";
import { SeanceDetailSheet } from "@/components/seances/seance-detail-sheet";
import { SeanceFormDialog } from "@/components/seances/seance-form-dialog";
import { useSeances } from "@/components/seances/use-seances";
import {
  formatDate,
  formatDateLongue,
  formatEuros,
  formatHeure,
  initiales,
  nomComplet,
  SEANCE_MODALITE_LABEL,
  SEANCE_TYPE_LABEL,
} from "@/lib/cabinet/format";
import type { Patient, Seance, SeanceModalite } from "@/types/cabinet";

type Onglet = "a-venir" | "passees" | "annulees" | "toutes";
const PAR_PAGE = 10;
const JOUR = 86_400_000;

export function SeancesView({
  seances: seancesInitiales,
  patients,
  now,
}: {
  seances: Seance[];
  patients: Patient[];
  now: number;
}) {
  const { seances, creer, changerStatut, changerNotes } = useSeances(seancesInitiales);
  const [onglet, setOnglet] = useState<Onglet>("a-venir");
  const [recherche, setRecherche] = useState("");
  const [modalite, setModalite] = useState<SeanceModalite | "toutes">("toutes");
  const [page, setPage] = useState(1);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [creation, setCreation] = useState(false);

  const patientsParId = useMemo(
    () => new Map(patients.map((p) => [p.id, p])),
    [patients]
  );

  const stats = useMemo(() => {
    const debutSemaine = new Date(now);
    debutSemaine.setHours(0, 0, 0, 0);
    debutSemaine.setDate(debutSemaine.getDate() - ((debutSemaine.getDay() + 6) % 7));
    const finSemaine = debutSemaine.getTime() + 7 * JOUR;
    const debutMois = new Date(now);
    debutMois.setHours(0, 0, 0, 0);
    debutMois.setDate(1);

    const t = (s: Seance) => new Date(s.debut).getTime();
    const semaine = seances.filter(
      (s) => t(s) >= debutSemaine.getTime() && t(s) < finSemaine && s.statut !== "annulee"
    );
    const prochaine = seances.find((s) => t(s) > now && s.statut !== "annulee");
    const realiseesMois = seances.filter(
      (s) => s.statut === "realisee" && t(s) >= debutMois.getTime() && t(s) <= now
    );
    const trenteJours = seances.filter((s) => t(s) <= now && t(s) > now - 30 * JOUR);
    const annulees = trenteJours.filter((s) => s.statut === "annulee" || s.statut === "absence");

    return {
      semaine: semaine.length,
      prochaine,
      realiseesMois: realiseesMois.length,
      tauxAnnulation: trenteJours.length
        ? Math.round((annulees.length / trenteJours.length) * 100)
        : 0,
    };
  }, [seances, now]);

  const filtrees = useMemo(() => {
    const q = recherche.trim().toLowerCase();
    const liste = seances.filter((s) => {
      const t = new Date(s.debut).getTime();
      if (onglet === "a-venir" && (t <= now || s.statut === "annulee")) return false;
      if (onglet === "passees" && (t > now || s.statut === "annulee")) return false;
      if (onglet === "annulees" && s.statut !== "annulee") return false;
      if (modalite !== "toutes" && s.modalite !== modalite) return false;
      if (q && !nomComplet(patientsParId.get(s.patientId)).toLowerCase().includes(q)) return false;
      return true;
    });
    // À venir : la plus proche en premier. Sinon : la plus récente en premier.
    return onglet === "a-venir" ? liste : [...liste].reverse();
  }, [seances, onglet, modalite, recherche, now, patientsParId]);

  const nbPages = Math.max(1, Math.ceil(filtrees.length / PAR_PAGE));
  const pageCourante = Math.min(page, nbPages);
  const visibles = filtrees.slice((pageCourante - 1) * PAR_PAGE, pageCourante * PAR_PAGE);
  const detail = seances.find((s) => s.id === detailId) ?? null;

  function changerFiltre<T>(setter: (v: T) => void) {
    return (v: T) => {
      setter(v);
      setPage(1);
    };
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Séances"
        description="Toutes vos séances passées et à venir."
        actions={
          <Button onClick={() => setCreation(true)}>
            <Plus data-icon="inline-start" />
            Nouvelle séance
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Cette semaine" value={stats.semaine} hint="séances prévues" icon={<CalendarClock />} />
        <StatCard
          label="Prochaine séance"
          value={stats.prochaine ? formatHeure(stats.prochaine.debut) : "—"}
          hint={
            stats.prochaine
              ? `${formatDateLongue(stats.prochaine.debut)} · ${nomComplet(patientsParId.get(stats.prochaine.patientId))}`
              : "Aucune séance prévue"
          }
          icon={<CalendarCheck />}
        />
        <StatCard label="Réalisées ce mois" value={stats.realiseesMois} hint="séances" icon={<CheckCircle2 />} />
        <StatCard
          label="Annulations"
          value={`${stats.tauxAnnulation} %`}
          hint="annulations et absences sur 30 jours"
          icon={<CalendarX />}
        />
      </div>

      <Card size="sm">
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <Tabs value={onglet} onValueChange={(v) => changerFiltre(setOnglet)(v as Onglet)}>
              <TabsList>
                <TabsTrigger value="a-venir">À venir</TabsTrigger>
                <TabsTrigger value="passees">Passées</TabsTrigger>
                <TabsTrigger value="annulees">Annulées</TabsTrigger>
                <TabsTrigger value="toutes">Toutes</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex flex-col gap-3 sm:flex-row">
              <InputGroup className="sm:w-64">
                <InputGroupAddon>
                  <Search />
                </InputGroupAddon>
                <InputGroupInput
                  placeholder="Rechercher un patient"
                  value={recherche}
                  onChange={(e) => changerFiltre(setRecherche)(e.target.value)}
                />
              </InputGroup>
              <Select
                value={modalite}
                onValueChange={(v) => changerFiltre(setModalite)(v as SeanceModalite | "toutes")}
              >
                <SelectTrigger className="sm:w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="toutes">Toutes modalités</SelectItem>
                  <SelectItem value="cabinet">Au cabinet</SelectItem>
                  <SelectItem value="visio">Visio</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {visibles.length === 0 ? (
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <CalendarX />
                </EmptyMedia>
                <EmptyTitle>Aucune séance</EmptyTitle>
                <EmptyDescription>Aucune séance ne correspond à ces filtres.</EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead className="hidden md:table-cell">Type</TableHead>
                  <TableHead className="hidden lg:table-cell">Modalité</TableHead>
                  <TableHead className="hidden sm:table-cell text-right">Tarif</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {visibles.map((s) => {
                  const patient = patientsParId.get(s.patientId);
                  const aVenir = new Date(s.debut).getTime() > now;
                  return (
                    <TableRow
                      key={s.id}
                      className="cursor-pointer"
                      onClick={() => setDetailId(s.id)}
                    >
                      <TableCell>
                        <div className="font-medium">{formatDate(s.debut)}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatHeure(s.debut)} · {s.dureeMinutes} min
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar size="sm">
                            <AvatarFallback>{initiales(patient)}</AvatarFallback>
                          </Avatar>
                          {nomComplet(patient)}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{SEANCE_TYPE_LABEL[s.type]}</TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <span className="flex items-center gap-2 [&>svg]:size-3.5 [&>svg]:text-muted-foreground">
                          {s.modalite === "visio" ? <Video /> : <MapPin />}
                          {SEANCE_MODALITE_LABEL[s.modalite]}
                        </span>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-right tabular-nums">
                        {formatEuros(s.tarif)}
                      </TableCell>
                      <TableCell>
                        <SeanceStatutBadge statut={s.statut} />
                      </TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon-sm" aria-label="Actions">
                              <MoreHorizontal />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setDetailId(s.id)}>
                              <Eye /> Voir le détail
                            </DropdownMenuItem>
                            {aVenir && s.statut === "planifiee" && (
                              <DropdownMenuItem onClick={() => changerStatut(s.id, "confirmee")}>
                                <CalendarCheck /> Confirmer
                              </DropdownMenuItem>
                            )}
                            {!aVenir && s.statut !== "realisee" && s.statut !== "annulee" && (
                              <>
                                <DropdownMenuItem onClick={() => changerStatut(s.id, "realisee")}>
                                  <CheckCircle2 /> Marquer réalisée
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => changerStatut(s.id, "absence")}>
                                  <UserX /> Patient absent
                                </DropdownMenuItem>
                              </>
                            )}
                            {aVenir && s.statut !== "annulee" && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  variant="destructive"
                                  onClick={() => changerStatut(s.id, "annulee")}
                                >
                                  <XCircle /> Annuler
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}

          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <span className="text-xs text-muted-foreground">
              {filtrees.length} séance{filtrees.length > 1 ? "s" : ""}
            </span>
            {nbPages > 1 && (
              <Pagination className="mx-0 w-auto">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      text="Précédent"
                      aria-disabled={pageCourante === 1}
                      className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(pageCourante - 1);
                      }}
                    />
                  </PaginationItem>
                  {Array.from({ length: nbPages }, (_, i) => i + 1).map((n) => (
                    <PaginationItem key={n}>
                      <PaginationLink
                        href="#"
                        isActive={n === pageCourante}
                        onClick={(e) => {
                          e.preventDefault();
                          setPage(n);
                        }}
                      >
                        {n}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      text="Suivant"
                      aria-disabled={pageCourante === nbPages}
                      className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(pageCourante + 1);
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </CardContent>
      </Card>

      <SeanceDetailSheet
        seance={detail}
        patient={detail ? patientsParId.get(detail.patientId) : undefined}
        now={now}
        onOpenChange={(open) => !open && setDetailId(null)}
        onStatutChange={changerStatut}
        onNotesChange={changerNotes}
      />

      <SeanceFormDialog
        open={creation}
        onOpenChange={setCreation}
        patients={patients}
        onCreate={creer}
      />
    </div>
  );
}
