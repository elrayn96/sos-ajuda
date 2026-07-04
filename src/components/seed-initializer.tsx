"use client";

import { useEffect } from "react";
import { seedIfEmpty } from "@/lib/seed-data";

export function SeedInitializer() {
  useEffect(() => {
    seedIfEmpty();
  }, []);

  return null;
}
