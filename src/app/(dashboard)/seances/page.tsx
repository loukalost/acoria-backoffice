import { SeancesView } from "@/components/seances/seances-view";
import { getPatients, getSeances, heureDeReference } from "@/lib/api/cabinet";

export default async function SeancesPage() {
  const [seances, patients] = await Promise.all([getSeances(), getPatients()]);

  return <SeancesView seances={seances} patients={patients} now={heureDeReference()} />;
}
