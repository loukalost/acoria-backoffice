import { AppSidebar } from "@/components/shared/app-sidebar";
import { UserMenu } from "@/components/shared/user-menu";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { getCurrentTherapeute } from "@/lib/auth/session";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const therapeute = await getCurrentTherapeute();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 items-center justify-between border-b px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-5" />
          </div>
          <UserMenu nom={therapeute?.nom} prenom={therapeute?.prenom} />
        </header>
        <main className="flex-1 p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}