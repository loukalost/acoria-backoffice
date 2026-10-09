import { PlanningView } from "@/components/planning/planning-view";
import { getPatients, getSeances, heureDeReference } from "@/lib/api/cabinet";

export default async function PlanningPage() {
  const [seances, patients] = await Promise.all([getSeances(), getPatients()]);

  return <PlanningView seances={seances} patients={patients} now={heureDeReference()} />;
}
