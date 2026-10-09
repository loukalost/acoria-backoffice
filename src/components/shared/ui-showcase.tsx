"use client";

import { useState } from "react";
import {
  Bell,
  Calendar,
  ChevronDown,
  Inbox,
  LayoutDashboard,
  LogOut,
  Plus,
  Settings,
  Trash2,
  User,
  Users,
} from "lucide-react";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export function UiShowcase() {
  const [notifications, setNotifications] = useState(true);
  const [sort, setSort] = useState("nom");

  return (
    <TooltipProvider>
      <div className="grid gap-6 lg:grid-cols-2">
        <Section title="Button" description="Variantes et tailles.">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              <Button>Default</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="highlight">Highlight</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button size="xs">XS</Button>
              <Button size="sm">SM</Button>
              <Button>Default</Button>
              <Button size="lg">LG</Button>
              <Button size="icon-xs" variant="outline"><Plus /></Button>
              <Button size="icon-sm" variant="outline"><Plus /></Button>
              <Button size="icon" variant="outline"><Plus /></Button>
              <Button size="icon-lg" variant="outline"><Plus /></Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button>
                <Plus data-icon="inline-start" />
                Nouveau patient
              </Button>
              <Button disabled>Disabled</Button>
            </div>
          </div>
        </Section>

        <Section title="Avatar" description="Tailles, image, badge et groupe.">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <Avatar size="sm"><AvatarFallback>SM</AvatarFallback></Avatar>
              <Avatar><AvatarFallback>MD</AvatarFallback></Avatar>
              <Avatar size="lg"><AvatarFallback>LG</AvatarFallback></Avatar>
              <Avatar size="lg">
                <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar size="lg">
                <AvatarFallback>JD</AvatarFallback>
                <AvatarBadge />
              </Avatar>
            </div>
            <AvatarGroup>
              <Avatar><AvatarFallback>AB</AvatarFallback></Avatar>
              <Avatar><AvatarFallback>CD</AvatarFallback></Avatar>
              <Avatar><AvatarFallback>EF</AvatarFallback></Avatar>
              <AvatarGroupCount>+4</AvatarGroupCount>
            </AvatarGroup>
          </div>
        </Section>

        <Card>
          <CardHeader className="border-b">
            <CardTitle>Card</CardTitle>
            <CardDescription>Header, action, content et footer.</CardDescription>
            <CardAction>
              <Button size="icon-sm" variant="ghost"><Settings /></Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p>Contenu principal de la carte.</p>
          </CardContent>
          <CardFooter className="justify-end gap-2 border-t">
            <Button variant="outline" size="sm">Annuler</Button>
            <Button size="sm">Valider</Button>
          </CardFooter>
        </Card>

        <Card size="sm">
          <CardHeader>
            <CardTitle>Card size=sm</CardTitle>
            <CardDescription>Espacement réduit.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Une carte plus compacte.</p>
          </CardContent>
        </Card>

        <Section title="Input, Label, Field" description="Éléments de formulaire.">
          <FieldSet>
            <FieldLegend>Informations patient</FieldLegend>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="demo-nom">Nom</FieldLabel>
                <Input id="demo-nom" placeholder="Dupont" />
                <FieldDescription>Le nom de famille du patient.</FieldDescription>
              </Field>
              <Field data-invalid="true">
                <FieldLabel htmlFor="demo-email">Email</FieldLabel>
                <Input id="demo-email" aria-invalid defaultValue="pas-un-email" />
                <FieldError errors={[{ message: "Adresse email invalide." }]} />
              </Field>
              <FieldSeparator>ou</FieldSeparator>
              <Field orientation="horizontal">
                <Label htmlFor="demo-disabled">Désactivé</Label>
                <Input id="demo-disabled" disabled placeholder="Non modifiable" />
              </Field>
            </FieldGroup>
          </FieldSet>
        </Section>

        <Section title="Dropdown Menu" description="Items, checkbox, radio et sous-menu.">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Ouvrir le menu
                <ChevronDown data-icon="inline-end" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User /> Profil <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings /> Paramètres <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={notifications}
                onCheckedChange={setNotifications}
              >
                Notifications
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Trier par</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
                <DropdownMenuRadioItem value="nom">Nom</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="date">Date</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Plus</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Exporter</DropdownMenuItem>
                  <DropdownMenuItem>Archiver</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <Trash2 /> Supprimer
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <LogOut /> Désactivé
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Section>

        <Section title="Sheet" description="Panneau latéral sur chaque côté.">
          <div className="flex flex-wrap gap-2">
            {(["top", "right", "bottom", "left"] as const).map((side) => (
              <Sheet key={side}>
                <SheetTrigger asChild>
                  <Button variant="outline">{side}</Button>
                </SheetTrigger>
                <SheetContent side={side}>
                  <SheetHeader>
                    <SheetTitle>Sheet ({side})</SheetTitle>
                    <SheetDescription>
                      Un panneau qui glisse depuis le côté {side}.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="px-8">
                    <Field>
                      <FieldLabel htmlFor={`sheet-${side}`}>Nom</FieldLabel>
                      <Input id={`sheet-${side}`} placeholder="Dupont" />
                    </Field>
                  </div>
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button>Enregistrer</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            ))}
          </div>
        </Section>

        <Section title="Tooltip" description="Infobulle sur chaque côté.">
          <div className="flex flex-wrap gap-2">
            {(["top", "right", "bottom", "left"] as const).map((side) => (
              <Tooltip key={side}>
                <TooltipTrigger asChild>
                  <Button variant="outline">{side}</Button>
                </TooltipTrigger>
                <TooltipContent side={side}>Tooltip {side}</TooltipContent>
              </Tooltip>
            ))}
          </div>
        </Section>

        <Section title="Separator" description="Horizontal et vertical.">
          <div className="flex flex-col gap-4">
            <div>
              <p className="font-medium">Acoria</p>
              <p className="text-muted-foreground">Espace thérapeute</p>
            </div>
            <Separator />
            <div className="flex h-5 items-center gap-4">
              <span>Patients</span>
              <Separator orientation="vertical" />
              <span>Séances</span>
              <Separator orientation="vertical" />
              <span>Paramètres</span>
            </div>
          </div>
        </Section>

        <Section title="Skeleton" description="Placeholders de chargement.">
          <div className="flex items-center gap-4">
            <Skeleton className="size-12 rounded-full" />
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        </Section>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sidebar</CardTitle>
            <CardDescription>
              Version statique (collapsible=&quot;none&quot;) avec tous les sous-composants.
              La vraie sidebar est à gauche — ⌘/Ctrl+B pour la replier.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[28rem] w-fit overflow-hidden rounded-lg border">
              <Sidebar collapsible="none">
                <SidebarHeader>
                  <span className="px-2 text-sm font-semibold">Acoria</span>
                  <SidebarInput placeholder="Rechercher..." />
                </SidebarHeader>
                <SidebarSeparator />
                <SidebarContent>
                  <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        <SidebarMenuItem>
                          <SidebarMenuButton isActive tooltip="Tableau de bord">
                            <LayoutDashboard />
                            <span>Tableau de bord</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton>
                            <Users />
                            <span>Patients</span>
                          </SidebarMenuButton>
                          <SidebarMenuSub>
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton href="#" isActive>
                                <span>Actifs</span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton href="#">
                                <span>Archivés</span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          </SidebarMenuSub>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton>
                            <Inbox />
                            <span>Messages</span>
                          </SidebarMenuButton>
                          <SidebarMenuBadge>12</SidebarMenuBadge>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton variant="outline" size="sm">
                            <Calendar />
                            <span>Agenda (outline, sm)</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                  <SidebarGroup>
                    <SidebarGroupLabel>Chargement</SidebarGroupLabel>
                    <SidebarMenu>
                      <SidebarMenuItem><SidebarMenuSkeleton showIcon /></SidebarMenuItem>
                      <SidebarMenuItem><SidebarMenuSkeleton showIcon /></SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton size="lg">
                        <Avatar size="sm"><AvatarFallback>JD</AvatarFallback></Avatar>
                        <span>Jean Dupont</span>
                        <Bell className="ml-auto" />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarFooter>
              </Sidebar>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}
