import { UiShowcase } from "@/components/shared/ui-showcase";
import { UiShowcaseMore } from "@/components/shared/ui-showcase-more";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="text-2xl font-semibold">Tableau de bord</h1>
        <p className="text-muted-foreground mt-2">
          Aperçu des composants UI disponibles.
        </p>
      </div>
      <section className="flex flex-col gap-4">
        <h2 className="font-heading text-xl font-semibold tracking-wider uppercase">
          Bases
        </h2>
        <UiShowcase />
      </section>
      <UiShowcaseMore />
    </div>
  );
}
