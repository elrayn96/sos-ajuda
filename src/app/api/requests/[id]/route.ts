import { NextResponse } from "next/server";
import { findRequest, setRequestStatus } from "@/lib/server-store";
import type { RequestStatus } from "@/types/help-request";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const item = await findRequest((await params).id);
  return item ? NextResponse.json(item) : NextResponse.json({ error: "Pedido não encontrado" }, { status: 404 });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { status } = (await request.json()) as { status: RequestStatus };
  if (!["Pendente", "Em atendimento", "Resolvido"].includes(status)) {
    return NextResponse.json({ error: "Estado inválido" }, { status: 400 });
  }
  const item = await setRequestStatus((await params).id, status);
  return item ? NextResponse.json(item) : NextResponse.json({ error: "Pedido não encontrado" }, { status: 404 });
}
