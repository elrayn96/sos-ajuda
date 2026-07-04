"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { ConnectionIndicator } from "@/components/connection-indicator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createRequest } from "@/lib/storage";
import {
  HELP_TYPES,
  URGENCY_LEVELS,
  type HelpType,
  type Urgency,
} from "@/types/help-request";

export default function PedirAjudaPage() {
  const [submitted, setSubmitted] = useState(false);
  const [requestId, setRequestId] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    name: "",
    contact: "",
    location: "",
    helpType: "" as HelpType | "",
    urgency: "" as Urgency | "",
    description: "",
  });

  function validate(): boolean {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Nome é obrigatório";
    if (!form.contact.trim()) newErrors.contact = "Contacto é obrigatório";
    if (!form.location.trim())
      newErrors.location = "Bairro / localização é obrigatório";
    if (!form.helpType) newErrors.helpType = "Tipo de ajuda é obrigatório";
    if (!form.urgency) newErrors.urgency = "Urgência é obrigatória";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const request = await createRequest({
      name: form.name.trim(),
      contact: form.contact.trim(),
      location: form.location.trim(),
      helpType: form.helpType as HelpType,
      urgency: form.urgency as Urgency,
      description: form.description.trim() || undefined,
    });

    setRequestId(request.id);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="flex min-h-[80vh] flex-col items-center justify-center px-4 pt-6 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
          <CheckCircle2 className="h-8 w-8 text-success" aria-hidden="true" />
        </div>
        <h1 className="text-2xl font-bold">Pedido enviado!</h1>
        <p className="mt-2 max-w-sm text-muted-foreground">
          O seu pedido de ajuda foi registado com sucesso. Voluntários
          próximos poderão vê-lo e aceitar.
        </p>
        <div className="mt-8 flex w-full max-w-xs flex-col gap-3">
          <Button asChild size="lg">
            <Link href={`/pedidos/${requestId}`}>Ver o meu pedido</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/">Voltar ao início</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="px-4 pt-6">
      <header className="mb-6">
        <Link
          href="/"
          className="mb-4 inline-flex min-h-11 items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Voltar
        </Link>
        <h1 className="text-2xl font-bold">Pedir Ajuda</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Preencha os dados para solicitar assistência de emergência.
        </p>
        <div className="mt-3">
          <ConnectionIndicator />
        </div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div className="space-y-2">
          <Label htmlFor="name">Nome *</Label>
          <Input
            id="name"
            placeholder="O seu nome completo"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact">Contacto *</Label>
          <Input
            id="contact"
            type="tel"
            placeholder="+258 84 XXX XXXX"
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
            aria-invalid={!!errors.contact}
          />
          {errors.contact && (
            <p className="text-sm text-destructive">{errors.contact}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Bairro / localização aproximada *</Label>
          <Input
            id="location"
            placeholder="Ex: Bairro Munhava, Beira"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            aria-invalid={!!errors.location}
          />
          {errors.location && (
            <p className="text-sm text-destructive">{errors.location}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="helpType">Tipo de ajuda *</Label>
          <Select
            value={form.helpType}
            onValueChange={(v) =>
              setForm({ ...form, helpType: v as HelpType })
            }
          >
            <SelectTrigger id="helpType" aria-invalid={!!errors.helpType}>
              <SelectValue placeholder="Seleccione o tipo" />
            </SelectTrigger>
            <SelectContent>
              {HELP_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.helpType && (
            <p className="text-sm text-destructive">{errors.helpType}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="urgency">Urgência *</Label>
          <Select
            value={form.urgency}
            onValueChange={(v) => setForm({ ...form, urgency: v as Urgency })}
          >
            <SelectTrigger id="urgency" aria-invalid={!!errors.urgency}>
              <SelectValue placeholder="Seleccione a urgência" />
            </SelectTrigger>
            <SelectContent>
              {URGENCY_LEVELS.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.urgency && (
            <p className="text-sm text-destructive">{errors.urgency}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descrição curta (opcional)</Label>
          <Textarea
            id="description"
            placeholder="Descreva brevemente a situação..."
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            rows={3}
          />
        </div>

        <Button type="submit" size="lg" className="w-full">
          Enviar pedido de ajuda
        </Button>
      </form>
    </main>
  );
}
