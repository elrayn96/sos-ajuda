import type { CreateHelpRequestInput, HelpRequest, RequestStatus } from "@/types/help-request";
import { getSeedData } from "@/lib/seed-data";

const CACHE_KEY = "sos-ajuda-cache-v2";
const QUEUE_KEY = "sos-ajuda-offline-queue";

type PendingOperation =
  | { kind: "create"; request: HelpRequest }
  | { kind: "status"; id: string; status: RequestStatus };

function readCache(): HelpRequest[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(CACHE_KEY) || "[]"); } catch { return []; }
}

function writeCache(requests: HelpRequest[]) {
  if (typeof window !== "undefined") localStorage.setItem(CACHE_KEY, JSON.stringify(requests));
}

function readQueue(): PendingOperation[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(QUEUE_KEY) || "[]"); } catch { return []; }
}

function enqueue(operation: PendingOperation) {
  localStorage.setItem(QUEUE_KEY, JSON.stringify([...readQueue(), operation]));
}

export function initializeStorage() {
  if (readCache().length === 0) writeCache(getSeedData());
}

export async function syncPendingOperations() {
  if (typeof window === "undefined" || !navigator.onLine) return;
  const queue = readQueue();
  let completed = 0;
  for (const operation of queue) {
    try {
      const response = operation.kind === "create"
        ? await fetch("/api/requests", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(operation.request) })
        : await fetch(`/api/requests/${operation.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: operation.status }) });
      if (!response.ok) break;
      completed++;
    } catch { break; }
  }
  if (completed) localStorage.setItem(QUEUE_KEY, JSON.stringify(queue.slice(completed)));
}

export async function getRequests(): Promise<HelpRequest[]> {
  initializeStorage();
  try {
    await syncPendingOperations();
    const response = await fetch("/api/requests", { cache: "no-store" });
    if (!response.ok) throw new Error();
    const requests = await response.json() as HelpRequest[];
    writeCache(requests);
    return requests;
  } catch {
    return readCache().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }
}

export async function getRequestById(id: string): Promise<HelpRequest | undefined> {
  try {
    const response = await fetch(`/api/requests/${id}`, { cache: "no-store" });
    if (!response.ok) throw new Error();
    const request = await response.json() as HelpRequest;
    writeCache([request, ...readCache().filter((item) => item.id !== id)]);
    return request;
  } catch { return readCache().find((request) => request.id === id); }
}

export async function createRequest(data: CreateHelpRequestInput): Promise<HelpRequest> {
  const request: HelpRequest = { ...data, id: `req_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`, status: "Pendente", createdAt: new Date().toISOString() };
  writeCache([request, ...readCache()]);
  try {
    const response = await fetch("/api/requests", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(request) });
    if (!response.ok) throw new Error();
    return await response.json();
  } catch { enqueue({ kind: "create", request }); return request; }
}

export async function updateRequestStatus(id: string, status: RequestStatus): Promise<HelpRequest | undefined> {
  const cache = readCache();
  const index = cache.findIndex((request) => request.id === id);
  if (index < 0) return undefined;
  const updated = { ...cache[index], status };
  if (status === "Em atendimento" && !updated.acceptedAt) updated.acceptedAt = new Date().toISOString();
  if (status === "Resolvido" && !updated.resolvedAt) updated.resolvedAt = new Date().toISOString();
  cache[index] = updated;
  writeCache(cache);
  try {
    const response = await fetch(`/api/requests/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    if (!response.ok) throw new Error();
    return await response.json();
  } catch { enqueue({ kind: "status", id, status }); return updated; }
}

export function getRequestStats(requests: HelpRequest[]) {
  return {
    urgent: requests.filter((r) => r.urgency === "Alta" && r.status !== "Resolvido").length,
    inProgress: requests.filter((r) => r.status === "Em atendimento").length,
    resolved: requests.filter((r) => r.status === "Resolvido").length,
    pending: requests.filter((r) => r.status === "Pendente").length,
  };
}
