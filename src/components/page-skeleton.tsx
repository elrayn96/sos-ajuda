"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface PageSkeletonProps {
  lines?: number;
}

export function PageSkeleton({ lines = 3 }: PageSkeletonProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="space-y-4 p-4" aria-busy="true" aria-label="A carregar">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-full" />
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return null;
}

export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
