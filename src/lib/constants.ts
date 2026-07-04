import type { HelpType, RequestStatus, Urgency } from "@/types/help-request";
import {
  Droplets,
  Utensils,
  Home,
  Pill,
  Car,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";

export const HELP_TYPES: HelpType[] = [
  "Água",
  "Comida",
  "Abrigo",
  "Medicamentos",
  "Transporte",
  "Outro",
];

export const URGENCIES: Urgency[] = ["Alta", "Média", "Baixa"];

export const HELP_TYPE_ICONS: Record<HelpType, LucideIcon> = {
  Água: Droplets,
  Comida: Utensils,
  Abrigo: Home,
  Medicamentos: Pill,
  Transporte: Car,
  Outro: HelpCircle,
};

export function urgencyVariant(
  urgency: Urgency
): "urgent" | "warning" | "secondary" {
  switch (urgency) {
    case "Alta":
      return "urgent";
    case "Média":
      return "warning";
    case "Baixa":
      return "secondary";
  }
}

export function statusVariant(
  status: RequestStatus
): "secondary" | "warning" | "success" {
  switch (status) {
    case "Pendente":
      return "secondary";
    case "Em atendimento":
      return "warning";
    case "Resolvido":
      return "success";
  }
}

export function statusLabel(status: RequestStatus): string {
  return status;
}
