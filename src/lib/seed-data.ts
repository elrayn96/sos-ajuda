import type { HelpRequest } from "@/types/help-request";

export function getSeedData(): HelpRequest[] {
  const now = Date.now();
  const hour = 60 * 60 * 1000;

  return [
    { id: "seed_1", name: "Ana Machel", contact: "+258 84 123 4567", location: "Bairro Munhava, Beira", helpType: "Água", urgency: "Alta", description: "Família com 3 crianças sem água potável há 2 dias.", status: "Pendente", createdAt: new Date(now - 2 * hour).toISOString() },
    { id: "seed_2", name: "Carlos Nhamussua", contact: "+258 86 987 6543", location: "Ponta Gea, Beira", helpType: "Medicamentos", urgency: "Alta", description: "Idoso precisa de insulina urgentemente.", status: "Pendente", createdAt: new Date(now - 45 * 60 * 1000).toISOString() },
    { id: "seed_3", name: "Fátima Sitoe", contact: "+258 82 555 1234", location: "Manga, Beira", helpType: "Abrigo", urgency: "Média", description: "Casa inundada, família de 5 pessoas precisa de abrigo.", status: "Em atendimento", createdAt: new Date(now - 5 * hour).toISOString(), acceptedAt: new Date(now - 4 * hour).toISOString() },
    { id: "seed_4", name: "João Macamo", contact: "+258 87 333 7890", location: "Praia Nova, Beira", helpType: "Comida", urgency: "Média", description: "Precisamos de alimentos para 2 dias.", status: "Pendente", createdAt: new Date(now - 3 * hour).toISOString() },
    { id: "seed_5", name: "Maria Tembe", contact: "+258 85 222 4567", location: "Macuti, Beira", helpType: "Transporte", urgency: "Baixa", description: "Precisa de transporte para centro de evacuação.", status: "Resolvido", createdAt: new Date(now - 24 * hour).toISOString(), acceptedAt: new Date(now - 23 * hour).toISOString(), resolvedAt: new Date(now - 22 * hour).toISOString() },
  ];
}
