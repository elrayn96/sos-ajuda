import Link from "next/link";
import {
  ArrowRight,
  Heart,
  Smartphone,
  Users,
  Zap,
} from "lucide-react";
import { ConnectionIndicator } from "@/components/connection-indicator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const flowSteps = [
  "Uma pessoa cria um pedido de ajuda de emergência",
  "O pedido aparece na lista pública de pedidos",
  "Um voluntário abre os detalhes do pedido",
  "O voluntário aceita o pedido",
  "O estado muda para \"Em atendimento\"",
  "O pedido é marcado como \"Resolvido\"",
];

export default function SobrePage() {
  return (
    <div className="space-y-6 p-4 md:p-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">Sobre o SOS Ajuda</h1>
        <p className="text-muted-foreground">
          Plataforma de assistência de emergência para comunidades moçambicanas
          afetadas por inundações.
        </p>
        <ConnectionIndicator />
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-urgent" />
            O problema
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <p>
            Quando cheias atingem bairros em Moçambique, famílias precisam de
            água, comida, abrigo e medicamentos — mas os pedidos ficam espalhados
            por WhatsApp e chamadas, sem prioridade nem coordenação. Voluntários
            não sabem quem ajudar primeiro.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            A solução
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <p>
            O SOS Ajuda liga quem precisa de ajuda a voluntários e doadores
            próximos. Cada pedido tem tipo, urgência, localização e contacto
            visível — tudo num só lugar, em português, no telemóvel.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-primary" />
            Porque funciona em 3G
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-muted-foreground">
          <p>Interface leve, sem imagens pesadas, sem vídeos, sem dependências desnecessárias.</p>
          <ul className="list-inside list-disc space-y-1 text-sm">
            <li>Dados guardados localmente (LocalStorage)</li>
            <li>Componentes mínimos e carregamento rápido</li>
            <li>Tipografia grande e alvos de toque acessíveis (44px+)</li>
            <li>Funciona sem backend nem autenticação</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-warning-foreground" />
            Impacto
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <p>
            Resposta mais rápida a emergências reais. Pedidos urgentes ficam
            visíveis imediatamente. Voluntários aceitam e resolvem pedidos com
            rastreio claro — da criação à resolução.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowRight className="h-5 w-5 text-success" />
            Fluxo end-to-end
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3">
            {flowSteps.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <span className="pt-0.5 text-sm text-muted-foreground">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <div className="grid gap-3 pb-4">
        <Button asChild size="lg" className="w-full">
          <Link href="/pedir-ajuda">Demonstrar: Pedir Ajuda</Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="w-full">
          <Link href="/pedidos">Demonstrar: Quero Ajudar</Link>
        </Button>
      </div>
    </div>
  );
}
