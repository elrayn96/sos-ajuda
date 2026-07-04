import { NextResponse } from "next/server";
import { addRequest, listRequests } from "@/lib/server-store";
import type { HelpRequest } from "@/types/help-request";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await listRequests(), { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const body = (await request.json()) as HelpRequest;
  if (!body.id || !body.name || !body.contact || !body.location || !body.helpType || !body.urgency) {
    return NextResponse.json({ error: "Dados obrigatórios em falta" }, { status: 400 });
  }
  return NextResponse.json(await addRequest(body), { status: 201 });
}
