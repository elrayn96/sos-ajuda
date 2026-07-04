import { promises as fs } from "node:fs";
import path from "node:path";
import type { HelpRequest, RequestStatus } from "@/types/help-request";
import { getSeedData } from "@/lib/seed-data";

const DATA_FILE = path.join(process.cwd(), "data", "requests.json");
let writeQueue = Promise.resolve();

async function readAll(): Promise<HelpRequest[]> {
  try {
    return JSON.parse(await fs.readFile(DATA_FILE, "utf8")) as HelpRequest[];
  } catch {
    const seed = getSeedData();
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(seed, null, 2));
    return seed;
  }
}

async function saveAll(requests: HelpRequest[]) {
  writeQueue = writeQueue.then(() =>
    fs.writeFile(DATA_FILE, JSON.stringify(requests, null, 2))
  );
  await writeQueue;
}

export async function listRequests() {
  return (await readAll()).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function findRequest(id: string) {
  return (await readAll()).find((request) => request.id === id);
}

export async function addRequest(request: HelpRequest) {
  const requests = await readAll();
  const existing = requests.find((item) => item.id === request.id);
  if (existing) return existing;
  requests.unshift(request);
  await saveAll(requests);
  return request;
}

export async function setRequestStatus(id: string, status: RequestStatus) {
  const requests = await readAll();
  const index = requests.findIndex((request) => request.id === id);
  if (index < 0) return undefined;
  const updated = { ...requests[index], status };
  if (status === "Em atendimento" && !updated.acceptedAt) updated.acceptedAt = new Date().toISOString();
  if (status === "Resolvido" && !updated.resolvedAt) updated.resolvedAt = new Date().toISOString();
  requests[index] = updated;
  await saveAll(requests);
  return updated;
}
