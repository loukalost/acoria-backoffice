"use client";

import { Fragment, useState } from "react";
import { toast } from "sonner";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  AlertCircle,
  Bold,
  Calendar as CalendarIcon,
  ChevronsUpDown,
  CircleCheck,
  Copy,
  FileText,
  Inbox,
  Italic,
  Mail,
  Search,
  Send,
  Underline,
  User,
  Users,
} from "lucide-react";

import { Section } from "@/components/shared/ui-showcase";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "@/components/ui/bubble";
import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DirectionProvider } from "@/components/ui/direction";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Label } from "@/components/ui/label";
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@/components/ui/message";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const patients = [
  { nom: "Camille Martin", seances: 12, statut: "Actif", prochaine: "06/10" },
  { nom: "Lucas Bernard", seances: 4, statut: "Actif", prochaine: "08/10" },
  { nom: "Inès Dubois", seances: 21, statut: "En pause", prochaine: "—" },
  { nom: "Hugo Laurent", seances: 1, statut: "Nouveau", prochaine: "09/10" },
];

const approches = ["TCC", "EMDR", "Psychanalyse", "Systémique", "Hypnose"];

const chartData = [
  { mois: "Mai", seances: 42, annulations: 4 },
  { mois: "Juin", seances: 51, annulations: 6 },
  { mois: "Juil.", seances: 38, annulations: 3 },
  { mois: "Août", seances: 22, annulations: 2 },
  { mois: "Sept.", seances: 57, annulations: 5 },
  { mois: "Oct.", seances: 61, annulations: 7 },
];

const chartConfig = {
  seances: { label: "Séances", color: "var(--chart-1)" },
  annulations: { label: "Annulations", color: "var(--chart-2)" },
} satisfies ChartConfig;

const conversation = [
  { id: "1", auteur: "Camille", moi: false, texte: "Bonjour, est-il possible de décaler ma séance de jeudi ?" },
  { id: "2", auteur: "Moi", moi: true, texte: "Bonjour Camille, oui bien sûr. Vendredi 10h vous conviendrait ?" },
  { id: "3", auteur: "Camille", moi: false, texte: "Parfait, merci beaucoup !" },
  { id: "4", auteur: "Moi", moi: true, texte: "C'est noté. À vendredi." },
  { id: "5", auteur: "Camille", moi: false, texte: "J'ai rempli le questionnaire d'humeur de la semaine." },
  { id: "6", auteur: "Moi", moi: true, texte: "Merci, je le regarde avant notre séance." },
];

function Category({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-heading text-xl font-semibold tracking-wider uppercase">
        {title}
      </h2>
      <div className="grid gap-6 lg:grid-cols-2">{children}</div>
    </section>
  );
}

function ComboboxMultipleDemo() {
  const anchor = useComboboxAnchor();

  return (
    <Combobox multiple autoHighlight items={approches} defaultValue={["TCC"]}>
      <ComboboxChips ref={anchor}>
        <ComboboxValue>
          {(values: string[]) => (
            <Fragment>
              {values.map((value) => (
                <ComboboxChip key={value}>{value}</ComboboxChip>
              ))}
              <ComboboxChipsInput placeholder="Ajouter..." />
            </Fragment>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>Aucun résultat.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

export function UiShowcaseMore() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [rappels, setRappels] = useState(true);
  const [duree, setDuree] = useState([50]);
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-10">
      {/* ------------------------------------------------------------ */}
      <Category title="Formulaires">
        <Section title="Checkbox, Radio Group, Switch" description="Choix simples.">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Label className="normal-case tracking-normal font-normal text-sm">
                <Checkbox defaultChecked /> Envoyer un rappel par email
              </Label>
              <Label className="normal-case tracking-normal font-normal text-sm">
                <Checkbox /> Envoyer un rappel par SMS
              </Label>
              <Label className="normal-case tracking-normal font-normal text-sm">
                <Checkbox disabled /> Désactivé
              </Label>
            </div>
            <RadioGroup defaultValue="cabinet">
              <Label className="normal-case tracking-normal font-normal text-sm">
                <RadioGroupItem value="cabinet" /> Au cabinet
              </Label>
              <Label className="normal-case tracking-normal font-normal text-sm">
                <RadioGroupItem value="visio" /> En visio
              </Label>
            </RadioGroup>
            <div className="flex items-center gap-6">
              <Label className="normal-case tracking-normal font-normal text-sm">
                <Switch checked={rappels} onCheckedChange={setRappels} />
                Rappels {rappels ? "activés" : "désactivés"}
              </Label>
              <Switch size="sm" />
            </div>
          </div>
        </Section>

        <Section title="Select, Native Select" description="Listes déroulantes.">
          <div className="flex flex-col gap-6">
            <Field>
              <FieldLabel>Type de séance (Select)</FieldLabel>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choisir..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Individuel</SelectLabel>
                    <SelectItem value="premiere">Première consultation</SelectItem>
                    <SelectItem value="suivi">Suivi</SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Groupe</SelectLabel>
                    <SelectItem value="couple">Couple</SelectItem>
                    <SelectItem value="famille">Famille</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="native-freq">Fréquence (Native Select)</FieldLabel>
              <NativeSelect id="native-freq" defaultValue="hebdo">
                <NativeSelectOption value="hebdo">Hebdomadaire</NativeSelectOption>
                <NativeSelectOption value="bimensuel">Toutes les 2 semaines</NativeSelectOption>
                <NativeSelectOption value="mensuel">Mensuelle</NativeSelectOption>
              </NativeSelect>
            </Field>
          </div>
        </Section>

        <Section title="Combobox" description="Recherche dans une liste, simple ou multiple.">
          <div className="flex flex-col gap-6">
            <Field>
              <FieldLabel>Patient</FieldLabel>
              <Combobox items={patients.map((p) => p.nom)}>
                <ComboboxInput placeholder="Rechercher un patient" />
                <ComboboxContent>
                  <ComboboxEmpty>Aucun patient trouvé.</ComboboxEmpty>
                  <ComboboxList>
                    {(item: string) => (
                      <ComboboxItem key={item} value={item}>
                        {item}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </Field>
            <Field>
              <FieldLabel>Approches thérapeutiques</FieldLabel>
              <ComboboxMultipleDemo />
            </Field>
          </div>
        </Section>

        <Section title="Textarea, Slider" description="Texte long et valeur numérique.">
          <div className="flex flex-col gap-6">
            <Field>
              <FieldLabel htmlFor="notes">Notes de séance</FieldLabel>
              <Textarea id="notes" placeholder="Observations, points abordés..." />
            </Field>
            <Field>
              <FieldLabel>Durée de séance : {duree[0]} min</FieldLabel>
              <Slider value={duree} onValueChange={setDuree} min={30} max={90} step={5} />
            </Field>
          </div>
        </Section>

        <Section title="Input Group" description="Champ avec icône, texte ou bouton accolé.">
          <div className="flex flex-col gap-6">
            <InputGroup>
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
              <InputGroupInput placeholder="Rechercher..." />
              <InputGroupAddon align="inline-end">
                <Kbd>⌘K</Kbd>
              </InputGroupAddon>
            </InputGroup>
            <InputGroup>
              <InputGroupAddon>
                <InputGroupText>https://</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput placeholder="acoria.fr/mon-cabinet" />
              <InputGroupAddon align="inline-end">
                <InputGroupButton size="icon-xs" onClick={() => toast("Lien copié")}>
                  <Copy />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            <InputGroup>
              <InputGroupTextarea placeholder="Écrire un message..." />
              <InputGroupAddon align="block-end">
                <InputGroupText className="text-xs">0/500</InputGroupText>
                <InputGroupButton size="xs" className="ml-auto">
                  Envoyer <Send />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </Section>

        <Section title="Input OTP" description="Code de vérification à usage unique.">
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </Section>

        <Section title="Button Group, Toggle, Toggle Group" description="Boutons groupés et interrupteurs.">
          <div className="flex flex-col gap-6">
            <ButtonGroup>
              <Button variant="outline">Jour</Button>
              <Button variant="outline">Semaine</Button>
              <Button variant="outline">Mois</Button>
            </ButtonGroup>
            <ButtonGroup>
              <ButtonGroupText>Export</ButtonGroupText>
              <Button variant="outline">PDF</Button>
              <ButtonGroupSeparator />
              <Button variant="outline">CSV</Button>
            </ButtonGroup>
            <div className="flex flex-wrap items-center gap-4">
              <Toggle aria-label="Gras"><Bold /></Toggle>
              <Toggle variant="outline" aria-label="Italique"><Italic /></Toggle>
              <ToggleGroup type="multiple" variant="outline" spacing={0}>
                <ToggleGroupItem value="bold" aria-label="Gras"><Bold /></ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Italique"><Italic /></ToggleGroupItem>
                <ToggleGroupItem value="underline" aria-label="Souligné"><Underline /></ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </Section>

        <Section title="Calendar (+ Date Picker)" description="Calendrier seul, ou dans un Popover pour faire un sélecteur de date.">
          <div className="flex flex-col items-start gap-6">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-60 justify-between normal-case tracking-normal font-normal">
                  {date ? date.toLocaleDateString("fr-FR") : "Choisir une date"}
                  <CalendarIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={setDate} />
              </PopoverContent>
            </Popover>
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-lg border" />
          </div>
        </Section>
      </Category>

      {/* ------------------------------------------------------------ */}
      <Category title="Affichage">
        <Section title="Badge" description="Étiquettes de statut.">
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="ghost">Ghost</Badge>
            <Badge variant="link">Link</Badge>
            <Badge className="bg-highlight text-highlight-foreground">Nouveau</Badge>
          </div>
        </Section>

        <Section title="Alert" description="Messages d'information ou d'erreur.">
          <div className="flex flex-col gap-4">
            <Alert>
              <CircleCheck />
              <AlertTitle>Séance enregistrée</AlertTitle>
              <AlertDescription>Les notes ont bien été sauvegardées.</AlertDescription>
              <AlertAction>
                <Button size="xs" variant="outline">Voir</Button>
              </AlertAction>
            </Alert>
            <Alert variant="destructive">
              <AlertCircle />
              <AlertTitle>Échec de l&apos;envoi</AlertTitle>
              <AlertDescription>Le rappel n&apos;a pas pu être envoyé au patient.</AlertDescription>
            </Alert>
          </div>
        </Section>

        <Section title="Table" description="Tableau de données (base du Data Table).">
          <Table>
            <TableCaption>Patients suivis</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Séances</TableHead>
                <TableHead className="text-right">Prochaine</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((p) => (
                <TableRow key={p.nom}>
                  <TableCell className="font-medium">{p.nom}</TableCell>
                  <TableCell>
                    <Badge variant={p.statut === "En pause" ? "secondary" : "outline"}>{p.statut}</Badge>
                  </TableCell>
                  <TableCell className="text-right">{p.seances}</TableCell>
                  <TableCell className="text-right">{p.prochaine}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Section>

        <Section title="Chart" description="Graphique (Recharts) aux couleurs du thème.">
          <ChartContainer config={chartConfig} className="h-64 w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="mois" tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="seances" fill="var(--color-seances)" radius={4} />
              <Bar dataKey="annulations" fill="var(--color-annulations)" radius={4} />
            </BarChart>
          </ChartContainer>
        </Section>

        <Section title="Item" description="Ligne de liste avec média, contenu et actions.">
          <ItemGroup>
            {patients.slice(0, 3).map((p, i) => (
              <Fragment key={p.nom}>
                {i > 0 && <ItemSeparator />}
                <Item>
                  <ItemMedia>
                    <Avatar>
                      <AvatarFallback>
                        {p.nom.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>{p.nom}</ItemTitle>
                    <ItemDescription>{p.seances} séances</ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <Button size="sm" variant="outline">Ouvrir</Button>
                  </ItemActions>
                </Item>
              </Fragment>
            ))}
          </ItemGroup>
          <Item variant="outline" className="mt-4">
            <ItemMedia variant="icon"><FileText /></ItemMedia>
            <ItemContent>
              <ItemTitle>Variante outline</ItemTitle>
              <ItemDescription>Avec bordure.</ItemDescription>
            </ItemContent>
          </Item>
          <Item variant="muted" className="mt-2">
            <ItemContent>
              <ItemTitle>Variante muted</ItemTitle>
            </ItemContent>
          </Item>
        </Section>

        <Section title="Empty" description="État vide.">
          <Empty className="border border-dashed">
            <EmptyHeader>
              <EmptyMedia variant="icon"><Inbox /></EmptyMedia>
              <EmptyTitle>Aucun patient</EmptyTitle>
              <EmptyDescription>Ajoutez votre premier patient pour commencer.</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button size="sm">Ajouter un patient</Button>
            </EmptyContent>
          </Empty>
        </Section>

        <Section title="Progress, Spinner, Kbd" description="Avancement, chargement et raccourcis clavier.">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-sm text-muted-foreground">Programme : 8 / 12 séances</span>
              <Progress value={66} />
            </div>
            <div className="flex items-center gap-4">
              <Spinner />
              <Spinner className="size-6" />
              <Button disabled size="sm"><Spinner /> Chargement</Button>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <Kbd>Esc</Kbd>
              <KbdGroup>
                <Kbd>Ctrl</Kbd>
                <span>+</span>
                <Kbd>B</Kbd>
              </KbdGroup>
            </div>
          </div>
        </Section>

        <Section title="Aspect Ratio, Carousel" description="Ratio fixe et défilement de contenus.">
          <div className="flex flex-col gap-6">
            <div className="w-full max-w-xs">
              <AspectRatio ratio={16 / 9} className="flex items-center justify-center rounded-lg bg-[image:var(--gradient-bottom-right)]">
                <span className="rounded-md bg-card px-2 py-1 text-xs">16 / 9</span>
              </AspectRatio>
            </div>
            <Carousel className="mx-12 max-w-xs">
              <CarouselContent>
                {["Bienvenue", "Vos patients", "Votre agenda", "Vos messages"].map((t, i) => (
                  <CarouselItem key={t}>
                    <div className="flex aspect-video items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                      <span className="font-heading text-lg">{i + 1}. {t}</span>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </Section>
      </Category>

      {/* ------------------------------------------------------------ */}
      <Category title="Fenêtres et menus">
        <Section title="Dialog, Alert Dialog, Drawer" description="Fenêtres modales et panneau du bas.">
          <div className="flex flex-wrap gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Modifier le patient</DialogTitle>
                  <DialogDescription>Mettez à jour les informations puis enregistrez.</DialogDescription>
                </DialogHeader>
                <Field>
                  <FieldLabel htmlFor="dlg-nom">Nom</FieldLabel>
                  <Input id="dlg-nom" defaultValue="Camille Martin" />
                </Field>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Annuler</Button>
                  </DialogClose>
                  <Button onClick={() => toast.success("Patient mis à jour")}>Enregistrer</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Alert Dialog</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Supprimer ce patient ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Cette action est définitive. Le dossier et l&apos;historique des séances seront supprimés.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction onClick={() => toast.error("Patient supprimé")}>Supprimer</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline">Drawer</Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader>
                    <DrawerTitle>Nouvelle séance</DrawerTitle>
                    <DrawerDescription>Panneau qui glisse depuis le bas, pratique sur mobile.</DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter>
                    <Button>Créer</Button>
                    <DrawerClose asChild>
                      <Button variant="outline">Fermer</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </Section>

        <Section title="Popover, Hover Card" description="Bulle au clic et carte au survol.">
          <div className="flex flex-wrap items-center gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Popover</Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverHeader>
                  <PopoverTitle>Rappel</PopoverTitle>
                  <PopoverDescription>Envoyer un rappel 24h avant la séance.</PopoverDescription>
                </PopoverHeader>
              </PopoverContent>
            </Popover>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="link">@camille.martin</Button>
              </HoverCardTrigger>
              <HoverCardContent>
                <div className="flex gap-3">
                  <Avatar><AvatarFallback>CM</AvatarFallback></Avatar>
                  <div className="flex flex-col gap-1 text-sm">
                    <span className="font-semibold">Camille Martin</span>
                    <span className="text-muted-foreground">Suivie depuis mars 2026 · 12 séances</span>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </Section>

        <Section title="Context Menu" description="Menu au clic droit.">
          <ContextMenu>
            <ContextMenuTrigger className="flex h-32 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
              Clic droit ici
            </ContextMenuTrigger>
            <ContextMenuContent className="w-56">
              <ContextMenuItem>Ouvrir le dossier <ContextMenuShortcut>⌘O</ContextMenuShortcut></ContextMenuItem>
              <ContextMenuItem>Planifier une séance</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem variant="destructive">Archiver</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </Section>

        <Section title="Command" description="Palette de commandes avec recherche.">
          <Command className="border">
            <CommandInput placeholder="Tapez une commande..." />
            <CommandList>
              <CommandEmpty>Aucun résultat.</CommandEmpty>
              <CommandGroup heading="Navigation">
                <CommandItem><Users /> Patients <CommandShortcut>⌘P</CommandShortcut></CommandItem>
                <CommandItem><CalendarIcon /> Agenda <CommandShortcut>⌘A</CommandShortcut></CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Compte">
                <CommandItem><User /> Profil</CommandItem>
                <CommandItem><Mail /> Messages</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </Section>

        <Section title="Menubar" description="Barre de menus façon application.">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>Fichier</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Nouveau patient <MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>
                <MenubarItem>Exporter</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Imprimer <MenubarShortcut>⌘P</MenubarShortcut></MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Affichage</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Jour</MenubarItem>
                <MenubarItem>Semaine</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </Section>

        <Section title="Sonner (Toast)" description="Notifications temporaires.">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => toast("Séance planifiée", { description: "Vendredi 10 octobre à 10h" })}>Default</Button>
            <Button variant="outline" onClick={() => toast.success("Enregistré")}>Success</Button>
            <Button variant="outline" onClick={() => toast.info("Nouveau message")}>Info</Button>
            <Button variant="outline" onClick={() => toast.warning("Séance dans 15 min")}>Warning</Button>
            <Button variant="outline" onClick={() => toast.error("Erreur réseau")}>Error</Button>
          </div>
        </Section>
      </Category>

      {/* ------------------------------------------------------------ */}
      <Category title="Navigation et mise en page">
        <Section title="Breadcrumb, Pagination" description="Fil d'Ariane et pages.">
          <div className="flex flex-col gap-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink href="#">Accueil</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbEllipsis /></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbLink href="#">Patients</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbPage>Camille Martin</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <Pagination>
              <PaginationContent>
                <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
                <PaginationItem><PaginationEllipsis /></PaginationItem>
                <PaginationItem><PaginationNext href="#" /></PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </Section>

        <Section title="Tabs" description="Onglets, variantes default et line.">
          <div className="flex flex-col gap-6">
            <Tabs defaultValue="infos">
              <TabsList>
                <TabsTrigger value="infos">Infos</TabsTrigger>
                <TabsTrigger value="seances">Séances</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>
              <TabsContent value="infos" className="text-sm text-muted-foreground">Coordonnées et antécédents.</TabsContent>
              <TabsContent value="seances" className="text-sm text-muted-foreground">Historique des séances.</TabsContent>
              <TabsContent value="documents" className="text-sm text-muted-foreground">Fichiers partagés.</TabsContent>
            </Tabs>
            <Tabs defaultValue="semaine">
              <TabsList variant="line">
                <TabsTrigger value="jour">Jour</TabsTrigger>
                <TabsTrigger value="semaine">Semaine</TabsTrigger>
                <TabsTrigger value="mois">Mois</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </Section>

        <Section title="Accordion, Collapsible" description="Contenus repliables.">
          <div className="flex flex-col gap-6">
            <Accordion type="single" collapsible defaultValue="a1">
              <AccordionItem value="a1">
                <AccordionTrigger>Comment annuler une séance ?</AccordionTrigger>
                <AccordionContent>Depuis l&apos;agenda, ouvrez la séance puis cliquez sur « Annuler ».</AccordionContent>
              </AccordionItem>
              <AccordionItem value="a2">
                <AccordionTrigger>Les données sont-elles chiffrées ?</AccordionTrigger>
                <AccordionContent>Oui, toutes les notes de séance sont chiffrées.</AccordionContent>
              </AccordionItem>
            </Accordion>
            <Collapsible open={open} onOpenChange={setOpen} className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">3 séances à venir</span>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="icon-sm"><ChevronsUpDown /></Button>
                </CollapsibleTrigger>
              </div>
              <div className="rounded-md border px-4 py-2 text-sm">Lundi 06/10 · Camille Martin</div>
              <CollapsibleContent className="flex flex-col gap-2">
                <div className="rounded-md border px-4 py-2 text-sm">Mercredi 08/10 · Lucas Bernard</div>
                <div className="rounded-md border px-4 py-2 text-sm">Jeudi 09/10 · Hugo Laurent</div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </Section>

        <Section title="Navigation Menu" description="Menu de navigation avec sous-menus.">
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Patients</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-64 gap-1">
                    <li><NavigationMenuLink href="#">Tous les patients</NavigationMenuLink></li>
                    <li><NavigationMenuLink href="#">Nouveaux</NavigationMenuLink></li>
                    <li><NavigationMenuLink href="#">Archivés</NavigationMenuLink></li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#">Agenda</NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </Section>

        <Section title="Resizable, Scroll Area" description="Panneaux redimensionnables et zone défilante.">
          <div className="flex flex-col gap-6">
            <ResizablePanelGroup orientation="horizontal" className="min-h-32 rounded-lg border">
              <ResizablePanel defaultSize="35%">
                <div className="flex h-full items-center justify-center p-4 text-sm">Liste</div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize="65%">
                <div className="flex h-full items-center justify-center p-4 text-sm">Détail</div>
              </ResizablePanel>
            </ResizablePanelGroup>
            <ScrollArea className="h-40 rounded-lg border">
              <div className="p-4">
                {Array.from({ length: 20 }, (_, i) => (
                  <div key={i} className="border-b py-2 text-sm last:border-0">Séance n°{20 - i}</div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </Section>

        <Section title="Direction" description="Inverse le sens de lecture (RTL) pour les composants à l'intérieur.">
          <DirectionProvider dir="rtl">
            <div dir="rtl" className="flex flex-col gap-4">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem><BreadcrumbLink href="#">الرئيسية</BreadcrumbLink></BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem><BreadcrumbPage>المرضى</BreadcrumbPage></BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <ToggleGroup type="single" variant="outline" spacing={0} defaultValue="a">
                <ToggleGroupItem value="a">أ</ToggleGroupItem>
                <ToggleGroupItem value="b">ب</ToggleGroupItem>
                <ToggleGroupItem value="c">ج</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </DirectionProvider>
        </Section>
      </Category>

      {/* ------------------------------------------------------------ */}
      <Category title="Messagerie">
        <Section title="Message, Bubble, Marker" description="Fil de discussion avec bulles et séparateurs.">
          <MessageGroup>
            <Marker variant="separator">
              <MarkerContent>Aujourd&apos;hui</MarkerContent>
            </Marker>
            <Message>
              <MessageAvatar>
                <Avatar size="sm"><AvatarFallback>CM</AvatarFallback></Avatar>
              </MessageAvatar>
              <MessageContent>
                <MessageHeader>Camille · 09:12</MessageHeader>
                <BubbleGroup>
                  <Bubble variant="muted">
                    <BubbleContent>Bonjour, est-il possible de décaler ma séance ?</BubbleContent>
                  </Bubble>
                  <Bubble variant="muted">
                    <BubbleContent>Jeudi ne m&apos;arrange plus.</BubbleContent>
                    <BubbleReactions>🙏</BubbleReactions>
                  </Bubble>
                </BubbleGroup>
              </MessageContent>
            </Message>
            <Message align="end">
              <MessageContent>
                <Bubble align="end">
                  <BubbleContent>Bien sûr, vendredi 10h vous convient ?</BubbleContent>
                </Bubble>
                <MessageFooter>Lu</MessageFooter>
              </MessageContent>
            </Message>
            <Marker>
              <MarkerIcon><CircleCheck /></MarkerIcon>
              <MarkerContent>Séance déplacée au vendredi 10 octobre</MarkerContent>
            </Marker>
            <Marker variant="border">
              <MarkerContent>Marker variant=&quot;border&quot;</MarkerContent>
            </Marker>
          </MessageGroup>
          <div className="mt-6 flex flex-wrap gap-3">
            {(["default", "secondary", "tinted", "outline", "destructive"] as const).map((v) => (
              <Bubble key={v} variant={v}>
                <BubbleContent>{v}</BubbleContent>
              </Bubble>
            ))}
          </div>
        </Section>

        <Section title="Message Scroller" description="Zone de conversation qui reste collée au dernier message.">
          <MessageScrollerProvider>
            <MessageScroller className="relative h-72 rounded-lg border">
              <MessageScrollerViewport>
                <MessageScrollerContent className="flex flex-col gap-3 p-4">
                  {conversation.map((m) => (
                    <MessageScrollerItem key={m.id} messageId={m.id}>
                      <Message align={m.moi ? "end" : "start"}>
                        <MessageContent>
                          <Bubble align={m.moi ? "end" : "start"} variant={m.moi ? "default" : "muted"}>
                            <BubbleContent>{m.texte}</BubbleContent>
                          </Bubble>
                        </MessageContent>
                      </Message>
                    </MessageScrollerItem>
                  ))}
                </MessageScrollerContent>
              </MessageScrollerViewport>
              <MessageScrollerButton />
            </MessageScroller>
          </MessageScrollerProvider>
        </Section>

        <Section title="Attachment" description="Pièces jointes et état d'envoi.">
          <AttachmentGroup>
            <Attachment>
              <AttachmentMedia><FileText /></AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>bilan-initial.pdf</AttachmentTitle>
                <AttachmentDescription>240 Ko</AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions>
                <AttachmentAction aria-label="Copier"><Copy /></AttachmentAction>
              </AttachmentActions>
            </Attachment>
            <Attachment state="uploading">
              <AttachmentMedia><Spinner /></AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>questionnaire.pdf</AttachmentTitle>
                <AttachmentDescription>Envoi en cours...</AttachmentDescription>
              </AttachmentContent>
            </Attachment>
            <Attachment state="error">
              <AttachmentMedia><AlertCircle /></AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>scan.jpg</AttachmentTitle>
                <AttachmentDescription>Échec de l&apos;envoi</AttachmentDescription>
              </AttachmentContent>
            </Attachment>
            <Attachment state="idle" size="sm">
              <AttachmentContent>
                <AttachmentTitle>Déposer un fichier</AttachmentTitle>
              </AttachmentContent>
            </Attachment>
          </AttachmentGroup>
        </Section>

        <Section title="Questionnaire" description="Formulaire pas à pas (raccourcis clavier A, B, C...).">
          <Questionnaire
            shortcuts="letters"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Questionnaire envoyé");
            }}
          >
            <QuestionnaireProgress />
            <QuestionnaireItem name="humeur" required>
              <QuestionnaireTitle>Comment vous sentez-vous cette semaine ?</QuestionnaireTitle>
              <QuestionnaireDescription>Une seule réponse possible.</QuestionnaireDescription>
              <QuestionnaireChoices>
                <QuestionnaireChoice value="bien">Plutôt bien</QuestionnaireChoice>
                <QuestionnaireChoice value="moyen">Moyennement</QuestionnaireChoice>
                <QuestionnaireChoice value="difficile">
                  Difficilement
                  <QuestionnaireChoiceDescription>Vous pourrez en parler en séance.</QuestionnaireChoiceDescription>
                </QuestionnaireChoice>
              </QuestionnaireChoices>
            </QuestionnaireItem>
            <QuestionnaireItem name="sommeil" multiple>
              <QuestionnaireTitle>Qu&apos;est-ce qui a perturbé votre sommeil ?</QuestionnaireTitle>
              <QuestionnaireDescription>Plusieurs réponses possibles.</QuestionnaireDescription>
              <QuestionnaireChoices>
                <QuestionnaireChoice value="stress">Stress</QuestionnaireChoice>
                <QuestionnaireChoice value="travail">Travail</QuestionnaireChoice>
                <QuestionnaireChoice value="rien">Rien de particulier</QuestionnaireChoice>
              </QuestionnaireChoices>
            </QuestionnaireItem>
            <QuestionnaireActions>
              <QuestionnairePrevious>Précédent</QuestionnairePrevious>
              <QuestionnaireNext>Suivant</QuestionnaireNext>
              <QuestionnaireSubmit>Envoyer</QuestionnaireSubmit>
            </QuestionnaireActions>
          </Questionnaire>
        </Section>
      </Category>
    </div>
  );
}
