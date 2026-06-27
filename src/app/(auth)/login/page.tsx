import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "@/components/shared/login-form";

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
        </CardContent>
      </Card>
    </div>
  );
}