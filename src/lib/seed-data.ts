import type { HelpRequest } from "@/types/help-request";

const daysAgo = (days: number, hours = 0) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(d.getHours() - hours);
  return d.toISOString();
};

export const SEED_REQUESTS: HelpRequest[] = [
  {
    id: "seed-001",
    name: "Ana Machel",
    contact: "+258 84 123 4567",
    location: "Bairro Manga, Maputo",
    helpType: "Água",
    urgency: "Alta",
    description: "Família de 5 sem água potável há 2 dias.",
    status: "Pendente",
    createdAt: daysAgo(0, 1),
  },
  {
    id: "seed-002",
    name: "Carlos Nhaca",
    contact: "+258 82 987 6543",
    location: "Chokwe, Gaza",
    helpType: "Medicamentos",
    urgency: "Alta",
    description: "Idoso precisa de insulina urgentemente.",
    status: "Pendente",
    createdAt: daysAgo(0, 3),
  },
  {
    id: "seed-003",
    name: "Fátima Sitoe",
    contact: "+258 86 555 1234",
    location: "Maxixe, Inhambane",
    helpType: "Comida",
    urgency: "Média",
    description: "Perdemos todas as reservas de comida na inundação.",
    status: "Pendente",
    createdAt: daysAgo(1),
  },
  {
    id: "seed-004",
    name: "João Tembe",
    contact: "+258 87 444 7890",
    location: "Matola, Maputo",
    helpType: "Abrigo",
    urgency: "Média",
    description: "Casa parcialmente destruída, família na rua.",
    status: "Em atendimento",
    createdAt: daysAgo(1, 5),
    acceptedAt: daysAgo(1, 2),
  },
  {
    id: "seed-005",
    name: "Maria Cossa",
    contact: "+258 83 222 3344",
    location: "Xai-Xai, Gaza",
    helpType: "Transporte",
    urgency: "Baixa",
    description: "Precisa de transporte para centro de evacuação.",
    status: "Resolvido",
    createdAt: daysAgo(3),
    acceptedAt: daysAgo(2, 20),
    resolvedAt: daysAgo(2),
  },
];

export function seedIfEmpty(): void {
  if (typeof window === "undefined") return;
  const key = "sos-ajuda-requests";
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify(SEED_REQUESTS));
  }
}
