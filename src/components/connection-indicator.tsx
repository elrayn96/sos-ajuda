"use client";

import { Wifi } from "lucide-react";

export function ConnectionIndicator() {
  return (
    <div
      className="flex items-center gap-2 rounded-lg border border-primary/20 bg-accent px-3 py-2 text-sm text-accent-foreground"
      role="status"
      aria-live="polite"
    >
      <Wifi className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
      <span className="font-medium">Modo 3G ativo — interface leve</span>
    </div>
  );
}
