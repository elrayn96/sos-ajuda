"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ConnectionIndicator } from "@/components/stats-cards";
import { createRequest } from "@/lib/storage";
import {
  HELP_TYPES,
  URGENCY_LEVELS,
  type HelpType,
  type Urgency,
} from "@/types/help-request";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PedirAjudaPage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [newId, setNewId] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    name: "",
    contact: "",
    location: "",
    helpType: "" as HelpType | "",
    urgency: "" as Urgency | "",
    description: "",
  });

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Nome é obrigatório";
    if (!form.contact.trim()) newErrors.contact = "Contacto é obrigatório";
    if (!form.location.trim())
      newErrors.location = "Localização é obrigatória";
    if (!form.helpType) newErrors.helpType = "Selecione o tipo de ajuda";
    if (!form.urgency) newErrors.urgency = "Selecione a urgência";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const request = createRequest({
      name: form.name.trim(),
      contact: form.contact.trim(),
      location: form.location.trim(),
      helpType: form.helpType as HelpType,
      urgency: form.urgency as Urgency,
      description: form.description.trim() || undefined,
    });

    setNewId(request.id);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="px-4 pt-6 md:px-6">
        <Card className="border-success/30">
          <CardContent className="flex flex-col items-center p-8 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
              <CheckCircle2 className="h-8 w-8 text-success" />
            </div>
            <h2 className="mb-2 text-xl font-bold">Pedido enviado!</h2>
            <p className="mb-6 text-muted-foreground">
              O seu pedido foi registado com sucesso. Um voluntário irá
              contactá-lo em breve.
            </p>
            <div className="flex w-full flex-col gap-3">
              <Button asChild size="lg">
                <Link href={`/pedidos/${newId}`}>Ver o meu pedido</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => router.push("/pedidos")}
              >
                Ver todos os pedidos
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="px-4 pt-6 md:px-6">
      <Link
        href="/"
        className="mb-4 inline-flex min-h-[44px] items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </Link>

      <div className="mb-4">
        <h1 className="text-2xl font-bold">Pedir Ajuda</h1>
        <p className="mt-1 text-muted-foreground">
          Preencha os dados para solicitar assistência
        </p>
      </div>

      <div className="mb-6">
        <ConnectionIndicator />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dados do pedido</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Nome *</Label>
              <Input
                id="name"
                placeholder="O seu nome completo"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
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
                onChange={(e) =>
                  setForm({ ...form, contact: e.target.value })
                }
              />
              {errors.contact && (
                <p className="text-sm text-destructive">{errors.contact}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Bairro / localização aproximada *</Label>
              <Input
                id="location"
                placeholder="Ex: Bairro Manga, Beira"
                value={form.location}
                onChange={(e) =>
                  setForm({ ...form, location: e.target.value })
                }
              />
              {errors.location && (
                <p className="text-sm text-destructive">{errors.location}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Tipo de ajuda *</Label>
              <Select
                value={form.helpType}
                onValueChange={(v) =>
                  setForm({ ...form, helpType: v as HelpType })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
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
              <Label>Urgência *</Label>
              <Select
                value={form.urgency}
                onValueChange={(v) =>
                  setForm({ ...form, urgency: v as Urgency })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a urgência" />
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
              <Label htmlFor="description">Descrição curta</Label>
              <Textarea
                id="description"
                placeholder="Descreva brevemente a situação (opcional)"
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
        </CardContent>
      </Card>
    </div>
  );
}
