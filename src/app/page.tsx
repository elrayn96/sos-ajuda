"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertTriangle, HandHeart, CheckCircle2 } from "lucide-react";
import { ConnectionIndicator } from "@/components/connection-indicator";
import { RequestCard } from "@/components/request-card";
import { PageLoader } from "@/components/page-loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getRequests, getRequestStats } from "@/lib/storage";
import type { HelpRequest } from "@/types/help-request";

export default function HomePage() {
  const [requests, setRequests] = useState<HelpRequest[]>([]);
  const [stats, setStats] = useState({ urgent: 0, inProgress: 0, resolved: 0 });

  useEffect(() => {
    let active = true;
    const refresh = () => getRequests().then((items) => {
      if (!active) return;
      setRequests(items);
      setStats(getRequestStats(items));
    });

    refresh();
    const interval = window.setInterval(refresh, 8_000);
    const handleVisibility = () => {
      if (document.visibilityState === "visible") refresh();
    };
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      active = false;
      window.clearInterval(interval);
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  const urgentRequests = requests
    .filter((r) => r.urgency === "Alta" && r.status !== "Resolvido")
    .slice(0, 3);

  return (
    <PageLoader>
      <main className="px-4 pt-6">
        <header className="mb-6">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <AlertTriangle className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                SOS Ajuda
              </h1>
              <p className="text-sm text-muted-foreground">
                Assistência comunitária de emergência
              </p>
            </div>
          </div>
          <ConnectionIndicator />
        </header>

        <section className="mb-6 grid grid-cols-2 gap-3">
          <Button asChild size="lg" variant="accent" className="h-14 text-base">
            <Link href="/pedir-ajuda">Pedir Ajuda</Link>
          </Button>
          <Button asChild size="lg" className="h-14 text-base">
            <Link href="/pedidos">Quero Ajudar</Link>
          </Button>
        </section>

        <section className="mb-6 grid grid-cols-3 gap-2">
          <Card>
            <CardContent className="p-3 text-center">
              <p className="text-2xl font-bold text-urgent">{stats.urgent}</p>
              <p className="text-[11px] font-medium leading-tight text-muted-foreground">
                Pedidos urgentes
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <p className="text-2xl font-bold text-primary">{stats.inProgress}</p>
              <p className="text-[11px] font-medium leading-tight text-muted-foreground">
                Em atendimento
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <p className="text-2xl font-bold text-success">{stats.resolved}</p>
              <p className="text-[11px] font-medium leading-tight text-muted-foreground">
                Resolvidos
              </p>
            </CardContent>
          </Card>
        </section>

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Pedidos urgentes recentes</h2>
            <Link
              href="/pedidos"
              className="text-sm font-medium text-primary hover:underline"
            >
              Ver todos
            </Link>
          </div>

          {urgentRequests.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center gap-2 p-6 text-center">
                <CheckCircle2
                  className="h-8 w-8 text-success"
                  aria-hidden="true"
                />
                <p className="font-medium">Sem pedidos urgentes no momento</p>
                <p className="text-sm text-muted-foreground">
                  Todos os pedidos urgentes foram atendidos.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {urgentRequests.map((request) => (
                <RequestCard key={request.id} request={request} />
              ))}
            </div>
          )}
        </section>

        <section className="mt-6 rounded-xl border border-border bg-secondary/30 p-4">
          <div className="flex items-start gap-3">
            <HandHeart
              className="mt-0.5 h-5 w-5 shrink-0 text-primary"
              aria-hidden="true"
            />
            <div>
              <p className="font-semibold text-foreground">Como funciona</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Peça ajuda ou veja pedidos próximos. Voluntários aceitam e
                acompanham até à resolução. Sem rede, o pedido fica em fila e
                sincroniza automaticamente quando a ligação regressa.
              </p>
            </div>
          </div>
        </section>
      </main>
    </PageLoader>
  );
}
