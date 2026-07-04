import type { HelpType, RequestStatus, Urgency } from "@/types/help-request";
import type { LucideIcon } from "lucide-react";
import {
  Droplets,
  Utensils,
  Home,
  Pill,
  Car,
  HelpCircle,
  AlertTriangle,
  Minus,
  ArrowDown,
} from "lucide-react";

export function getHelpTypeIcon(type: HelpType): LucideIcon {
  const icons: Record<HelpType, LucideIcon> = {
    Água: Droplets,
    Comida: Utensils,
    Abrigo: Home,
    Medicamentos: Pill,
    Transporte: Car,
    Outro: HelpCircle,
  };
  return icons[type];
}

export function getUrgencyBadgeVariant(
  urgency: Urgency
): "urgent" | "warning" | "muted" {
  if (urgency === "Alta") return "urgent";
  if (urgency === "Média") return "warning";
  return "muted";
}

export function getStatusBadgeVariant(
  status: RequestStatus
): "secondary" | "default" | "success" {
  if (status === "Pendente") return "secondary";
  if (status === "Em atendimento") return "default";
  return "success";
}

export function getUrgencyIcon(urgency: Urgency): LucideIcon {
  if (urgency === "Alta") return AlertTriangle;
  if (urgency === "Média") return Minus;
  return ArrowDown;
}
