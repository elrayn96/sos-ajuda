"use client";

import { useEffect, useState } from "react";
import { Wifi } from "lucide-react";

export function ConnectionIndicator() {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    setOnline(navigator.onLine);
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div
      className="flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-2 text-xs font-medium text-secondary-foreground"
      role="status"
      aria-live="polite"
    >
      <Wifi className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span>
        {online
          ? "Modo 3G ativo — interface leve"
          : "Sem ligação — dados guardados localmente"}
      </span>
    </div>
  );
}
