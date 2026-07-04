import Link from "next/link";
import {
  AlertTriangle,
  Wifi,
  Users,
  ArrowRight,
  Heart,
  Zap,
} from "lucide-react";
import { ConnectionIndicator } from "@/components/connection-indicator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const FLOW_STEPS = [
  {
    step: "1",
    title: "Pedir ajuda",
    description: "A pessoa afectada cria um pedido com tipo, urgência e localização.",
  },
  {
    step: "2",
    title: "Listagem pública",
    description: "O pedido aparece na lista para voluntários e doadores próximos.",
  },
  {
    step: "3",
    title: "Aceitar pedido",
    description: "Um voluntário abre os detalhes e aceita o pedido.",
  },
  {
    step: "4",
    title: "Em atendimento",
    description: "O estado muda para «Em atendimento» e o contacto fica visível.",
  },
  {
    step: "5",
    title: "Resolvido",
    description: "Após a ajuda ser entregue, o pedido é marcado como resolvido.",
  },
];

export default function SobrePage() {
  return (
    <main className="px-4 pt-6">
      <header className="mb-6">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <AlertTriangle className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">SOS Ajuda</h1>
            <p className="text-sm text-muted-foreground">Pitch — 3 minutos</p>
          </div>
        </div>
        <ConnectionIndicator />
      </header>

      <section className="mb-6">
        <Card className="border-accent/20 bg-accent/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle
                className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                aria-hidden="true"
              />
              <div>
                <h2 className="font-semibold">O problema</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Durante cheias e emergências em Moçambique, milhares de
                  famílias ficam isoladas sem água, comida ou medicamentos.
                  Quem precisa de ajuda não sabe como pedir. Quem quer ajudar
                  não sabe onde ir.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Heart
                className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                aria-hidden="true"
              />
              <div>
                <h2 className="font-semibold">A solução</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  SOS Ajuda conecta pessoas afectadas com voluntários e doadores
                  próximos. Pedidos de ajuda são criados, listados e aceites —
                  com acompanhamento até à resolução completa.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Wifi
                className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                aria-hidden="true"
              />
              <div>
                <h2 className="font-semibold">Porque funciona em 3G</h2>
                <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Zap className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warning" aria-hidden="true" />
                    Interface leve, sem imagens pesadas
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warning" aria-hidden="true" />
                    Pedidos offline entram numa fila segura no dispositivo
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warning" aria-hidden="true" />
                    API partilhada sincroniza vítimas e voluntários
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warning" aria-hidden="true" />
                    Textos curtos, botões grandes, navegação simples
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Users
                className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                aria-hidden="true"
              />
              <div>
                <h2 className="font-semibold">Impacto</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Cada pedido aceite significa uma família com água, abrigo ou
                  medicamentos. Voluntários locais actuam mais rápido que
                  organizações centralizadas. A plataforma escala com a
                  comunidade — quanto mais pessoas usam, mais ajuda chega.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-lg font-semibold">Fluxo completo</h2>
        <ol className="space-y-3">
          {FLOW_STEPS.map(({ step, title, description }) => (
            <li key={step}>
              <Card>
                <CardContent className="flex gap-3 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {step}
                  </div>
                  <div>
                    <p className="font-semibold">{title}</p>
                    <p className="text-sm text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-6 rounded-xl border border-primary/20 bg-primary/5 p-4">
        <p className="text-center text-sm font-medium text-primary">
          Hackathon Cursor · Categoria 3 — SOS / Reunião · Moçambique
        </p>
      </section>

      <div className="flex flex-col gap-3 pb-4">
        <Button asChild size="lg" variant="accent">
          <Link href="/pedir-ajuda">
            Demonstrar: Pedir Ajuda
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
        <Button asChild size="lg">
          <Link href="/pedidos">
            Demonstrar: Quero Ajudar
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </main>
  );
}
