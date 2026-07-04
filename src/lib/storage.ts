import { generateId } from "@/lib/utils";
import type {
  CreateHelpRequestInput,
  HelpRequest,
  RequestStatus,
} from "@/types/help-request";

const STORAGE_KEY = "sos-ajuda-requests";
const MY_REQUESTS_KEY = "sos-ajuda-my-requests";

export function getMyRequestIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(MY_REQUESTS_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function addMyRequestId(id: string): void {
  if (typeof window === "undefined") return;
  const existing = getMyRequestIds();
  localStorage.setItem(MY_REQUESTS_KEY, JSON.stringify([...existing, id]));
}

function getSeedData(): HelpRequest[] {
  const now = Date.now();
  return [
    {
      id: "seed_1",
      name: "Maria João",
      contact: "+258 84 123 4567",
      location: "Bairro Manga, Beira",
      helpType: "Água",
      urgency: "Alta",
      description: "Família de 5 sem água potável há 2 dias.",
      status: "Pendente",
      createdAt: new Date(now - 15 * 60000).toISOString(),
    },
    {
      id: "seed_2",
      name: "Carlos Nhamirre",
      contact: "+258 86 987 6543",
      location: "Praça Nova, Quelimane",
      helpType: "Medicamentos",
      urgency: "Alta",
      description: "Idoso precisa de insulina urgentemente.",
      status: "Pendente",
      createdAt: new Date(now - 45 * 60000).toISOString(),
    },
    {
      id: "seed_3",
      name: "Ana Sitoe",
      contact: "+258 82 555 1234",
      location: "Matola, Maputo",
      helpType: "Comida",
      urgency: "Média",
      description: "3 crianças pequenas, comida escassa.",
      status: "Em atendimento",
      createdAt: new Date(now - 3 * 3600000).toISOString(),
      acceptedAt: new Date(now - 2 * 3600000).toISOString(),
    },
    {
      id: "seed_4",
      name: "Pedro Macuácua",
      contact: "+258 87 333 7890",
      location: "Chokwé, Gaza",
      helpType: "Abrigo",
      urgency: "Média",
      description: "Casa inundada, família no telhado.",
      status: "Pendente",
      createdAt: new Date(now - 90 * 60000).toISOString(),
    },
    {
      id: "seed_5",
      name: "Fátima Abdula",
      contact: "+258 84 222 3344",
      location: "Ilha de Moçambique",
      helpType: "Transporte",
      urgency: "Baixa",
      description: "Precisa de transporte para centro de saúde.",
      status: "Resolvido",
      createdAt: new Date(now - 24 * 3600000).toISOString(),
      acceptedAt: new Date(now - 23 * 3600000).toISOString(),
      resolvedAt: new Date(now - 22 * 3600000).toISOString(),
    },
  ];
}

function readStorage(): HelpRequest[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as HelpRequest[];
  } catch {
    return [];
  }
}

function writeStorage(requests: HelpRequest[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
}

export function initializeStorage(): HelpRequest[] {
  const existing = readStorage();
  if (existing.length === 0) {
    const seed = getSeedData();
    writeStorage(seed);
    return seed;
  }
  return existing;
}

export function getRequests(): HelpRequest[] {
  const requests = readStorage();
  if (requests.length === 0) {
    return initializeStorage();
  }
  return requests.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getRequestById(id: string): HelpRequest | undefined {
  return getRequests().find((r) => r.id === id);
}

export function createRequest(data: CreateHelpRequestInput): HelpRequest {
  const requests = getRequests();
  const newRequest: HelpRequest = {
    ...data,
    id: generateId(),
    status: "Pendente",
    createdAt: new Date().toISOString(),
  };
  writeStorage([newRequest, ...requests]);
  addMyRequestId(newRequest.id);
  return newRequest;
}

export function updateRequestStatus(
  id: string,
  status: RequestStatus
): HelpRequest | undefined {
  const requests = getRequests();
  const index = requests.findIndex((r) => r.id === id);
  if (index === -1) return undefined;

  const updated: HelpRequest = { ...requests[index], status };
  const now = new Date().toISOString();

  if (status === "Em atendimento" && !updated.acceptedAt) {
    updated.acceptedAt = now;
  }
  if (status === "Resolvido") {
    updated.resolvedAt = now;
    if (!updated.acceptedAt) {
      updated.acceptedAt = now;
    }
  }

  requests[index] = updated;
  writeStorage(requests);
  return updated;
}

export function getRequestStats() {
  const requests = getRequests();
  return {
    urgent: requests.filter(
      (r) => r.urgency === "Alta" && r.status !== "Resolvido"
    ).length,
    inProgress: requests.filter((r) => r.status === "Em atendimento").length,
    resolved: requests.filter((r) => r.status === "Resolvido").length,
    total: requests.length,
  };
}
