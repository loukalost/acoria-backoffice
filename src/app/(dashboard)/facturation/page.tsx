import { FacturationView } from "@/components/facturation/facturation-view";
import { getFactures, getPatients, heureDeReference } from "@/lib/api/cabinet";

export default async function FacturationPage() {
  const [factures, patients] = await Promise.all([getFactures(), getPatients()]);

  return <FacturationView factures={factures} patients={patients} now={heureDeReference()} />;
}
