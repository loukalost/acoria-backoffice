import { cn } from "@/lib/utils";
import {
  FACTURE_STATUT_LABEL,
  SEANCE_STATUT_LABEL,
} from "@/lib/cabinet/format";
import type { FactureStatut, SeanceStatut } from "@/types/cabinet";

type Tone = "primary" | "neutral" | "muted" | "danger" | "warning";

const TONE_CLASSES: Record<Tone, string> = {
  primary: "bg-primary/10 text-primary before:bg-primary",
  neutral: "bg-secondary text-secondary-foreground before:bg-secondary-foreground/60",
  muted: "bg-muted text-muted-foreground before:bg-muted-foreground/60",
  danger: "bg-destructive/10 text-destructive before:bg-destructive",
  warning: "bg-highlight/20 text-foreground before:bg-highlight",
};

const SEANCE_TONE: Record<SeanceStatut, Tone> = {
  confirmee: "primary",
  planifiee: "neutral",
  realisee: "muted",
  annulee: "danger",
  absence: "warning",
};

const FACTURE_TONE: Record<FactureStatut, Tone> = {
  payee: "primary",
  envoyee: "neutral",
  brouillon: "muted",
  en_retard: "danger",
};

function Pill({ tone, children }: { tone: Tone; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap before:size-1.5 before:rounded-full",
        TONE_CLASSES[tone]
      )}
    >
      {children}
    </span>
  );
}

export function SeanceStatutBadge({ statut }: { statut: SeanceStatut }) {
  return <Pill tone={SEANCE_TONE[statut]}>{SEANCE_STATUT_LABEL[statut]}</Pill>;
}

export function FactureStatutBadge({ statut }: { statut: FactureStatut }) {
  return <Pill tone={FACTURE_TONE[statut]}>{FACTURE_STATUT_LABEL[statut]}</Pill>;
}
