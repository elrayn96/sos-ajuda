import type { HelpRequest, RequestStatus, Urgency } from "@/types/help-request";
import type { BadgeProps } from "@/components/ui/badge";

export function formatRelativeTime(isoDate: string): string {
  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffMin < 1) return "Agora";
  if (diffMin < 60) return `Há ${diffMin} min`;
  if (diffHour < 24) return `Há ${diffHour}h`;
  if (diffDay === 1) return "Ontem";
  return `Há ${diffDay} dias`;
}

export function getUrgencyVariant(urgency: Urgency): BadgeProps["variant"] {
  switch (urgency) {
    case "Alta":
      return "urgent";
    case "Média":
      return "warning";
    case "Baixa":
      return "muted";
  }
}

export function getStatusVariant(status: RequestStatus): BadgeProps["variant"] {
  switch (status) {
    case "Pendente":
      return "warning";
    case "Em atendimento":
      return "default";
    case "Resolvido":
      return "success";
  }
}

export function getHelpTypeIcon(helpType: HelpRequest["helpType"]): string {
  const icons: Record<HelpRequest["helpType"], string> = {
    Água: "💧",
    Comida: "🍞",
    Abrigo: "🏠",
    Medicamentos: "💊",
    Transporte: "🚐",
    Outro: "📋",
  };
  return icons[helpType];
}

export type RequestFilter =
  | "Todos"
  | "Urgentes"
  | "Próximos"
  | "Pendentes"
  | "Em atendimento"
  | "Resolvidos";

export function filterRequests(
  requests: HelpRequest[],
  filter: RequestFilter,
  search: string
): HelpRequest[] {
  let filtered = [...requests];

  switch (filter) {
    case "Urgentes":
      filtered = filtered.filter(
        (r) => r.urgency === "Alta" && r.status !== "Resolvido"
      );
      break;
    case "Próximos":
      filtered = filtered.filter((r) => r.status !== "Resolvido");
      break;
    case "Pendentes":
      filtered = filtered.filter((r) => r.status === "Pendente");
      break;
    case "Em atendimento":
      filtered = filtered.filter((r) => r.status === "Em atendimento");
      break;
    case "Resolvidos":
      filtered = filtered.filter((r) => r.status === "Resolvido");
      break;
  }

  if (search.trim()) {
    const q = search.toLowerCase().trim();
    filtered = filtered.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q) ||
        r.helpType.toLowerCase().includes(q) ||
        r.description?.toLowerCase().includes(q)
    );
  }

  return filtered;
}
