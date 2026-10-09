import { Bell, Building2, Shield, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CabinetForm } from "@/components/compte/cabinet-form";
import { PreferencesSection } from "@/components/compte/preferences-section";
import { ProfilForm } from "@/components/compte/profil-form";
import { SecuriteSection } from "@/components/compte/securite-section";
import { PageHeader } from "@/components/shared/page-header";
import { getCurrentTherapeute } from "@/lib/auth/session";

export default async function ComptePage() {
  const therapeute = await getCurrentTherapeute();

  return (
    <div className="flex max-w-4xl flex-col gap-6">
      <PageHeader title="Compte" description="Votre profil, votre cabinet et vos préférences." />

      <Tabs defaultValue="profil">
        <div className="overflow-x-auto">
          <TabsList>
            <TabsTrigger value="profil"><User /> Profil</TabsTrigger>
            <TabsTrigger value="cabinet"><Building2 /> Cabinet et tarifs</TabsTrigger>
            <TabsTrigger value="securite"><Shield /> Sécurité</TabsTrigger>
            <TabsTrigger value="preferences"><Bell /> Préférences</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="profil" className="mt-4">
          <ProfilForm therapeute={therapeute} />
        </TabsContent>
        <TabsContent value="cabinet" className="mt-4">
          <CabinetForm />
        </TabsContent>
        <TabsContent value="securite" className="mt-4">
          <SecuriteSection />
        </TabsContent>
        <TabsContent value="preferences" className="mt-4">
          <PreferencesSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
