import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "@/components/shared/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Espace thérapeute</CardTitle>
          <CardDescription>
            Connectez-vous pour accéder au suivi de vos patients
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Vous n’avez pas encore de compte ?{" "}
            <Link href="/register" className="font-medium text-foreground underline underline-offset-4">
              Créer un compte
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}