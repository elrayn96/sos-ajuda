"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { ConnectionIndicator } from "@/components/connection-indicator";
import { PageSkeleton, useMounted } from "@/components/page-skeleton";
import { RequestTimeline } from "@/components/request-timeline";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  HELP_TYPE_ICONS,
  statusVariant,
  urgencyVariant,
} from "@/lib/constants";
import { getRequestById, updateRequestStatus, getMyRequestIds } from "@/lib/storage";
import { formatRelativeTime } from "@/lib/utils";
import type { HelpRequest } from "@/types/help-request";

export default function RequestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const mounted = useMounted();
  const id = params.id as string;

  const [request, setRequest] = useState<HelpRequest | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [isMyRequest, setIsMyRequest] = useState(false);

  useEffect(() => {
    if (!mounted) return;
    const found = getRequestById(id);
    setRequest(found ?? null);
    setIsMyRequest(getMyRequestIds().includes(id));
    setLoaded(true);
  }, [mounted, id]);

  function handleAccept() {
    const updated = updateRequestStatus(id, "Em atendimento");
    if (updated) setRequest(updated);
  }

  function handleResolve() {
    const updated = updateRequestStatus(id, "Resolvido");
    if (updated) setRequest(updated);
  }

  if (!mounted || !loaded) {
    return <PageSkeleton lines={4} />;
  }

  if (!request) {
    return (
      <div className="space-y-4 p-4 md:p-8">
        <Button asChild variant="ghost" className="pl-0">
          <Link href="/pedidos">
            <ArrowLeft className="h-4 w-4" />
            Voltar aos pedidos
          </Link>
        </Button>
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            Pedido não encontrado.
          </CardContent>
        </Card>
      </div>
    );
  }

  const Icon = HELP_TYPE_ICONS[request.helpType];

  return (
    <div className="space-y-5 p-4 md:p-8">
      <Button asChild variant="ghost" className="pl-0 min-h-[44px]">
        <Link href="/pedidos">
          <ArrowLeft className="h-4 w-4" />
          Voltar aos pedidos
        </Link>
      </Button>

      <header className="space-y-3">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-bold">{request.helpType}</h1>
            <p className="text-sm text-muted-foreground">
              Criado {formatRelativeTime(request.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant={urgencyVariant(request.urgency)}>
            Urgência: {request.urgency}
          </Badge>
          <Badge variant={statusVariant(request.status)}>
            {request.status}
          </Badge>
        </div>
        <ConnectionIndicator />
      </header>

      {request.status === "Resolvido" && (
        <Card className="border-success/30 bg-success/5">
          <CardContent className="flex items-center gap-3 p-4">
            <CheckCircle2 className="h-6 w-6 shrink-0 text-success" />
            <div>
              <p className="font-semibold text-success">Pedido resolvido</p>
              <p className="text-sm text-muted-foreground">
                Este pedido foi atendido com sucesso. Obrigado por ajudar!
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Informações de contacto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <User className="h-4 w-4 shrink-0 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Nome</p>
              <p className="font-medium">{request.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 shrink-0 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Contacto</p>
              <a
                href={`tel:${request.contact.replace(/\s/g, "")}`}
                className="font-medium text-primary hover:underline"
              >
                {request.contact}
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Localização</p>
              <p className="font-medium">{request.location}</p>
            </div>
          </div>
          {request.description && (
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="text-xs text-muted-foreground mb-1">Descrição</p>
              <p className="text-sm">{request.description}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Histórico</CardTitle>
        </CardHeader>
        <CardContent>
          <RequestTimeline request={request} />
        </CardContent>
      </Card>

      <div className="space-y-3 pb-4">
        {request.status === "Pendente" && (
          isMyRequest ? (
            <div className="rounded-lg border border-border bg-muted/40 p-4 text-center text-sm text-muted-foreground">
              Este é o teu pedido. Aguarda que um voluntário o aceite.
            </div>
          ) : (
            <Button size="lg" className="w-full" onClick={handleAccept}>
              Aceitar pedido
            </Button>
          )
        )}
        {request.status === "Em atendimento" && (
          <Button
            size="lg"
            variant="success"
            className="w-full"
            onClick={handleResolve}
          >
            Marcar como resolvido
          </Button>
        )}
        {request.status === "Resolvido" && (
          <Button
            size="lg"
            variant="outline"
            className="w-full"
            onClick={() => router.push("/pedidos")}
          >
            Ver outros pedidos
          </Button>
        )}
      </div>
    </div>
  );
}
