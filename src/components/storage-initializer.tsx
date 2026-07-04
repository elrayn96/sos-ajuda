"use client";

import { useEffect } from "react";
import { initializeStorage, syncPendingOperations } from "@/lib/storage";

export function StorageInitializer({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initializeStorage();
    syncPendingOperations();
    const sync = () => syncPendingOperations();
    window.addEventListener("online", sync);
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js");
    return () => window.removeEventListener("online", sync);
  }, []);

  return <>{children}</>;
}
