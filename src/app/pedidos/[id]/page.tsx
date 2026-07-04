"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Phone,
  MapPin,
  CheckCircle2,
  Circle,
  HandHeart,
} from "lucide-react";
import { ConnectionIndicator } from "@/components/connection-indicator";
import { PageLoader } from "@/components/page-loader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  getRequestById,
  updateRequestStatus,
} from "@/lib/storage";
import {
  formatRelativeTime,
  getHelpTypeIcon,
  getStatusVariant,
  getUrgencyVariant,
} from "@/lib/format";
import type { HelpRequest } from "@/types/help-request";
import { cn } from "@/lib/utils";

interface TimelineStep {
  label: string;
  date?: string;
  done: boolean;
  active: boolean;
}

function buildTimeline(request: HelpRequest): TimelineStep[] {
  return [
    {
      label: "Pedido criado",
      date: request.createdAt,
      done: true,
      active: request.status === "Pendente",
    },
    {
      label: "Voluntário aceitou",
      date: request.acceptedAt,
      done: !!request.acceptedAt,
      active: request.status === "Em atendimento",
    },
    {
      label: "Em atendimento",
      date: request.acceptedAt,
      done: request.status === "Em atendimento" || request.status === "Resolvido",
      active: request.status === "Em atendimento",
    },
    {
      label: "Resolvido",
      date: request.resolvedAt,
      done: request.status === "Resolvido",
      active: request.status === "Resolvido",
    },
  ];
}

export default function RequestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [request, setRequest] = useState<HelpRequest | null>(null);
  const [notFound, setNotFound] = useState(false);

  const loadRequest = useCallback(async () => {
    const found = await getRequestById(id);
    if (found) {
      setRequest(found);
      setNotFound(false);
    } else {
      setNotFound(true);
    }
  }, [id]);

  useEffect(() => {
    loadRequest();
  }, [loadRequest]);

  async function handleAccept() {
    const updated = await updateRequestStatus(id, "Em atendimento");
    if (updated) setRequest(updated);
  }

  async function handleResolve() {
    const updated = await updateRequestStatus(id, "Resolvido");
    if (updated) setRequest(updated);
  }

  if (notFound) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <p className="text-lg font-semibold">Pedido não encontrado</p>
        <Button asChild className="mt-4">
          <Link href="/pedidos">Ver todos os pedidos</Link>
        </Button>
      </main>
    );
  }

  if (!request) {
    return (
      <PageLoader>
        <div />
      </PageLoader>
    );
  }

  const timeline = buildTimeline(request);

  return (
    <PageLoader>
      <main className="px-4 pt-6">
        <header className="mb-6">
          <button
            onClick={() => router.back()}
            className="mb-4 inline-flex min-h-11 items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Voltar
          </button>
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-3xl" aria-hidden="true">
                {getHelpTypeIcon(request.helpType)}
              </span>
              <div>
                <h1 className="text-2xl font-bold">{request.helpType}</h1>
                <p className="text-sm text-muted-foreground">
                  {formatRelativeTime(request.createdAt)}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <Badge variant={getUrgencyVariant(request.urgency)}>
                {request.urgency}
              </Badge>
              <Badge variant={getStatusVariant(request.status)}>
                {request.status}
              </Badge>
            </div>
          </div>
          <div className="mt-3">
            <ConnectionIndicator />
          </div>
        </header>

        <Card className="mb-4">
          <CardContent className="space-y-4 p-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Nome
              </p>
              <p className="mt-0.5 text-lg font-semibold">{request.name}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Contacto
              </p>
              <a
                href={`tel:${request.contact.replace(/\s/g, "")}`}
                className="mt-0.5 flex min-h-11 items-center gap-2 text-lg font-semibold text-primary hover:underline"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {request.contact}
              </a>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Localização
              </p>
              <p className="mt-0.5 flex items-center gap-2 text-base">
                <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                {request.location}
              </p>
            </div>
            {request.description && (
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Descrição
                </p>
                <p className="mt-0.5 text-base text-foreground/90">
                  {request.description}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <section className="mb-6">
          <h2 className="mb-3 text-lg font-semibold">Linha do tempo</h2>
          <ol className="space-y-0">
            {timeline.map((step, i) => (
              <li key={step.label} className="flex gap-3">
                <div className="flex flex-col items-center">
                  {step.done ? (
                    <CheckCircle2
                      className={cn(
                        "h-5 w-5 shrink-0",
                        step.active ? "text-primary" : "text-success"
                      )}
                      aria-hidden="true"
                    />
                  ) : (
                    <Circle
                      className="h-5 w-5 shrink-0 text-muted-foreground/40"
                      aria-hidden="true"
                    />
                  )}
                  {i < timeline.length - 1 && (
                    <div
                      className={cn(
                        "my-1 w-0.5 flex-1 min-h-[24px]",
                        step.done ? "bg-primary/30" : "bg-border"
                      )}
                    />
                  )}
                </div>
                <div className="pb-4">
                  <p
                    className={cn(
                      "font-medium",
                      step.done ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {step.label}
                  </p>
                  {step.date && step.done && (
                    <p className="text-xs text-muted-foreground">
                      {formatRelativeTime(step.date)}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>

        {request.status === "Pendente" && (
          <Button
            size="lg"
            className="w-full"
            onClick={handleAccept}
          >
            <HandHeart className="h-5 w-5" aria-hidden="true" />
            Aceitar pedido
          </Button>
        )}

        {request.status === "Em atendimento" && (
          <Button
            size="lg"
            variant="default"
            className="w-full bg-success hover:bg-success/90"
            onClick={handleResolve}
          >
            <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
            Marcar como resolvido
          </Button>
        )}

        {request.status === "Resolvido" && (
          <Card className="border-success/30 bg-success/5">
            <CardContent className="flex flex-col items-center gap-2 p-6 text-center">
              <CheckCircle2
                className="h-10 w-10 text-success"
                aria-hidden="true"
              />
              <p className="text-lg font-semibold text-success">
                Pedido resolvido
              </p>
              <p className="text-sm text-muted-foreground">
                Este pedido foi atendido com sucesso. Obrigado por ajudar a
                comunidade.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </PageLoader>
  );
}
