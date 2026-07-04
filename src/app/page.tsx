"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RequestCard } from "@/components/request-card";
import { ConnectionIndicator, StatsCards } from "@/components/stats-cards";
import { getRequests, getRequestStats } from "@/lib/storage";
import type { HelpRequest } from "@/types/help-request";
import { HandHeart, PlusCircle, AlertTriangle } from "lucide-react";

export default function HomePage() {
  const [requests, setRequests] = useState<HelpRequest[]>([]);
  const [stats, setStats] = useState({ urgent: 0, inProgress: 0, resolved: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = getRequests();
    setRequests(data);
    setStats(getRequestStats());
    setLoading(false);
  }, []);

  const urgentRequests = requests
    .filter((r) => r.urgency === "Alta" && r.status !== "Resolvido")
    .slice(0, 3);

  return (
    <div className="px-4 pt-6 md:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          SOS Ajuda
        </h1>
        <p className="mt-1 text-muted-foreground">
          Assistência comunitária em emergências
        </p>
      </div>

      <div className="mb-6">
        <ConnectionIndicator />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Button asChild size="lg" className="h-14 text-base">
          <Link href="/pedir-ajuda">
            <PlusCircle className="h-5 w-5" />
            Pedir Ajuda
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="h-14 text-base">
          <Link href="/pedidos">
            <HandHeart className="h-5 w-5" />
            Quero Ajudar
          </Link>
        </Button>
      </div>

      <div className="mb-8">
        <StatsCards
          urgent={stats.urgent}
          inProgress={stats.inProgress}
          resolved={stats.resolved}
          loading={loading}
        />
      </div>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <AlertTriangle className="h-5 w-5 text-urgent" />
            Pedidos urgentes recentes
          </h2>
          <Link
            href="/pedidos"
            className="text-sm font-medium text-primary min-h-[44px] flex items-center"
          >
            Ver todos
          </Link>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="h-36 animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        ) : urgentRequests.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-8 text-center">
            <p className="text-muted-foreground">
              Sem pedidos urgentes no momento.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {urgentRequests.map((request) => (
              <RequestCard key={request.id} request={request} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
