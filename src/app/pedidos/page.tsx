"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { ConnectionIndicator } from "@/components/connection-indicator";
import { RequestCard } from "@/components/request-card";
import { PageLoader } from "@/components/page-loader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getRequests } from "@/lib/storage";
import { filterRequests, type RequestFilter } from "@/lib/format";
import type { HelpRequest } from "@/types/help-request";
import { cn } from "@/lib/utils";

const FILTERS: RequestFilter[] = [
  "Todos",
  "Urgentes",
  "Próximos",
  "Pendentes",
  "Em atendimento",
  "Resolvidos",
];

export default function PedidosPage() {
  const [requests, setRequests] = useState<HelpRequest[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<RequestFilter>("Todos");

  useEffect(() => {
    let active = true;
    const refresh = () => getRequests().then((items) => {
      if (active) setRequests(items);
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

  const filtered = filterRequests(requests, filter, search);

  return (
    <PageLoader>
      <main className="px-4 pt-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold">Pedidos de Ajuda</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Veja quem precisa de ajuda e ofereça assistência.
          </p>
          <div className="mt-3">
            <ConnectionIndicator />
          </div>
        </header>

        <div className="relative mb-4">
          <Search
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            placeholder="Pesquisar por nome, bairro ou tipo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
            aria-label="Pesquisar pedidos"
          />
        </div>

        <div
          className="mb-4 flex gap-2 overflow-x-auto pb-1 scrollbar-none"
          role="tablist"
          aria-label="Filtrar pedidos"
        >
          {FILTERS.map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f)}
              className={cn(
                "shrink-0 rounded-full",
                filter === f && "pointer-events-none"
              )}
              role="tab"
              aria-selected={filter === f}
            >
              {f}
            </Button>
          ))}
        </div>

        <p className="mb-3 text-sm text-muted-foreground">
          {filtered.length}{" "}
          {filtered.length === 1 ? "pedido encontrado" : "pedidos encontrados"}
        </p>

        {filtered.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-8 text-center">
            <p className="font-medium">Nenhum pedido encontrado</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Tente alterar os filtros ou a pesquisa.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((request) => (
              <RequestCard key={request.id} request={request} />
            ))}
          </div>
        )}
      </main>
    </PageLoader>
  );
}
