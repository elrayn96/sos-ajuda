"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ConnectionIndicator } from "@/components/connection-indicator";
import { PageSkeleton, useMounted } from "@/components/page-skeleton";
import { RequestCard } from "@/components/request-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getRequests } from "@/lib/storage";
import { cn } from "@/lib/utils";
import type { RequestFilter } from "@/types/help-request";

const FILTERS: RequestFilter[] = [
  "Todos",
  "Urgentes",
  "Próximos",
  "Pendentes",
  "Em atendimento",
  "Resolvidos",
];

export default function PedidosPage() {
  const mounted = useMounted();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<RequestFilter>("Todos");
  const [refreshKey, setRefreshKey] = useState(0);

  const requests = useMemo(() => {
    if (!mounted) return [];
    void refreshKey;
    let list = getRequests();

    switch (filter) {
      case "Urgentes":
        list = list.filter((r) => r.urgency === "Alta");
        break;
      case "Próximos":
        list = list.filter(
          (r) =>
            r.location.toLowerCase().includes("maputo") ||
            r.location.toLowerCase().includes("matola")
        );
        break;
      case "Pendentes":
        list = list.filter((r) => r.status === "Pendente");
        break;
      case "Em atendimento":
        list = list.filter((r) => r.status === "Em atendimento");
        break;
      case "Resolvidos":
        list = list.filter((r) => r.status === "Resolvido");
        break;
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.location.toLowerCase().includes(q) ||
          r.helpType.toLowerCase().includes(q) ||
          (r.description?.toLowerCase().includes(q) ?? false)
      );
    }

    return list;
  }, [mounted, filter, search, refreshKey]);

  if (!mounted) {
    return <PageSkeleton lines={5} />;
  }

  return (
    <div className="space-y-5 p-4 md:p-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">Pedidos de Ajuda</h1>
        <p className="text-muted-foreground">
          Veja quem precisa de ajuda e aceite um pedido.
        </p>
        <ConnectionIndicator />
      </header>

      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          className="pl-10"
          placeholder="Pesquisar por nome, bairro ou tipo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Pesquisar pedidos"
        />
      </div>

      <div
        className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1"
        role="tablist"
        aria-label="Filtrar pedidos"
      >
        {FILTERS.map((f) => (
          <Button
            key={f}
            role="tab"
            aria-selected={filter === f}
            variant={filter === f ? "default" : "outline"}
            size="sm"
            className={cn("shrink-0 min-h-[44px]")}
            onClick={() => {
              setFilter(f);
              setRefreshKey((k) => k + 1);
            }}
          >
            {f}
          </Button>
        ))}
      </div>

      {requests.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            Nenhum pedido encontrado com estes filtros.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {requests.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))}
        </div>
      )}
    </div>
  );
}
