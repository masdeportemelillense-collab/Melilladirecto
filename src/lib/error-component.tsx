import type { ErrorComponentProps } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";

export function AppErrorComponent({ error }: ErrorComponentProps) {
  const message = error instanceof Error && error.message ? error.message : "Error inesperado. Recarga la pagina.";
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-bg text-fg">
      <TriangleAlert className="size-10 text-live" />
      <h1 className="text-lg font-semibold">Algo ha fallado</h1>
      <p className="max-w-md text-sm text-muted">{message}</p>
    </main>
  );
}
