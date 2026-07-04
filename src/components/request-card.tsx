"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  getHelpTypeIcon,
  getStatusBadgeVariant,
  getUrgencyBadgeVariant,
} from "@/lib/request-helpers";
import { formatRelativeTime } from "@/lib/utils";
import type { HelpRequest } from "@/types/help-request";
import { Clock, MapPin } from "lucide-react";
import Link from "next/link";

interface RequestCardProps {
  request: HelpRequest;
}

export function RequestCard({ request }: RequestCardProps) {
  const Icon = getHelpTypeIcon(request.helpType);

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/20 group">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
            <Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="font-semibold text-foreground">
                {request.helpType}
              </span>
              <Badge variant={getUrgencyBadgeVariant(request.urgency)}>
                {request.urgency}
              </Badge>
              <Badge variant={getStatusBadgeVariant(request.status)}>
                {request.status}
              </Badge>
            </div>
            <div className="mb-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0" />
              <span className="truncate">{request.location}</span>
            </div>
            {request.description && (
              <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">
                {request.description}
              </p>
            )}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span>{formatRelativeTime(request.createdAt)}</span>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Button asChild variant="outline" className="w-full">
            <Link href={`/pedidos/${request.id}`}>Ver detalhes</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
