"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { HelpRequest } from "@/types/help-request";
import { AlertTriangle, CheckCircle2, Clock } from "lucide-react";

interface StatsCardsProps {
  urgent: number;
  inProgress: number;
  resolved: number;
  loading?: boolean;
}

export function StatsCards({
  urgent,
  inProgress,
  resolved,
  loading,
}: StatsCardsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>
    );
  }

  const stats = [
    {
      label: "Pedidos urgentes",
      value: urgent,
      icon: AlertTriangle,
      color: "text-urgent",
      bg: "bg-urgent/10",
    },
    {
      label: "Em atendimento",
      value: inProgress,
      icon: Clock,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Resolvidos",
      value: resolved,
      icon: CheckCircle2,
      color: "text-success",
      bg: "bg-success/10",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((stat) => (
        <Card key={stat.label} className="border-border/80">
          <CardContent className="p-3 text-center">
            <div
              className={`mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-lg ${stat.bg}`}
            >
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold tabular-nums">{stat.value}</p>
            <p className="text-[11px] leading-tight text-muted-foreground">
              {stat.label}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

interface RequestTimelineProps {
  request: HelpRequest;
}

export function RequestTimeline({ request }: RequestTimelineProps) {
  const steps = [
    {
      label: "Pedido criado",
      date: request.createdAt,
      done: true,
    },
    {
      label: "Voluntário aceitou",
      date: request.acceptedAt,
      done: !!request.acceptedAt,
    },
    {
      label: "Em atendimento",
      date: request.acceptedAt,
      done: request.status === "Em atendimento" || request.status === "Resolvido",
    },
    {
      label: "Resolvido",
      date: request.resolvedAt,
      done: request.status === "Resolvido",
    },
  ];

  return (
    <div className="space-y-0">
      {steps.map((step, index) => (
        <div key={step.label} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                step.done
                  ? "border-success bg-success/10 text-success"
                  : "border-muted bg-muted/30 text-muted-foreground"
              }`}
            >
              {step.done ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
              )}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`my-1 w-0.5 flex-1 min-h-[24px] ${
                  step.done && steps[index + 1]?.done
                    ? "bg-success/40"
                    : "bg-border"
                }`}
              />
            )}
          </div>
          <div className="pb-6 pt-1">
            <p
              className={`font-medium ${
                step.done ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {step.label}
            </p>
            {step.date && step.done && (
              <p className="text-xs text-muted-foreground">
                {new Date(step.date).toLocaleString("pt-MZ", {
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export function ConnectionIndicator() {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-success/30 bg-success/5 px-3 py-2 text-sm text-success">
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-40" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success" />
      </span>
      <span className="font-medium">Modo 3G ativo — interface leve</span>
    </div>
  );
}

export function StatusBadge({ status }: { status: HelpRequest["status"] }) {
  const variants: Record<
    HelpRequest["status"],
    "secondary" | "default" | "success"
  > = {
    Pendente: "secondary",
    "Em atendimento": "default",
    Resolvido: "success",
  };

  return <Badge variant={variants[status]}>{status}</Badge>;
}
