"use client";

import { CheckCircle2, Circle, Clock } from "lucide-react";
import { cn, formatDateTime } from "@/lib/utils";
import type { HelpRequest } from "@/types/help-request";

interface RequestTimelineProps {
  request: HelpRequest;
}

interface TimelineStep {
  label: string;
  date?: string;
  done: boolean;
  active: boolean;
}

export function RequestTimeline({ request }: RequestTimelineProps) {
  const steps: TimelineStep[] = [
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

  return (
    <ol className="space-y-0" aria-label="Histórico do pedido">
      {steps.map((step, index) => (
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
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "my-1 w-0.5 flex-1 min-h-[24px]",
                  step.done ? "bg-success/40" : "bg-border"
                )}
              />
            )}
          </div>
          <div className="pb-5">
            <p
              className={cn(
                "text-sm font-medium",
                step.done ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {step.label}
            </p>
            {step.date && (
              <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" aria-hidden="true" />
                {formatDateTime(step.date)}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
