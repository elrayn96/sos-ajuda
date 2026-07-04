export type HelpType =
  | "Água"
  | "Comida"
  | "Abrigo"
  | "Medicamentos"
  | "Transporte"
  | "Outro";

export type Urgency = "Alta" | "Média" | "Baixa";

export type RequestStatus = "Pendente" | "Em atendimento" | "Resolvido";

export interface HelpRequest {
  id: string;
  name: string;
  contact: string;
  location: string;
  helpType: HelpType;
  urgency: Urgency;
  description?: string;
  status: RequestStatus;
  createdAt: string;
  acceptedAt?: string;
  resolvedAt?: string;
}

export type CreateHelpRequestInput = Omit<
  HelpRequest,
  "id" | "status" | "createdAt" | "acceptedAt" | "resolvedAt"
>;

export const HELP_TYPES: HelpType[] = [
  "Água",
  "Comida",
  "Abrigo",
  "Medicamentos",
  "Transporte",
  "Outro",
];

export const URGENCY_LEVELS: Urgency[] = ["Alta", "Média", "Baixa"];

export const REQUEST_STATUSES: RequestStatus[] = [
  "Pendente",
  "Em atendimento",
  "Resolvido",
];
