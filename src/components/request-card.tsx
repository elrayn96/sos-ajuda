import Link from "next/link";
import type { HelpRequest } from "@/types/help-request";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  formatRelativeTime,
  getHelpTypeIcon,
  getStatusVariant,
  getUrgencyVariant,
} from "@/lib/format";
import { MapPin, Clock } from "lucide-react";

interface RequestCardProps {
  request: HelpRequest;
}

export function RequestCard({ request }: RequestCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xl" aria-hidden="true">
              {getHelpTypeIcon(request.helpType)}
            </span>
            <div>
              <p className="font-semibold text-foreground">{request.helpType}</p>
              <p className="text-sm text-muted-foreground">{request.name}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge variant={getUrgencyVariant(request.urgency)}>
              {request.urgency}
            </Badge>
            <Badge variant={getStatusVariant(request.status)}>
              {request.status}
            </Badge>
          </div>
        </div>

        <div className="mt-3 space-y-1.5">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>{request.location}</span>
          </div>
          {request.description && (
            <p className="line-clamp-2 text-sm text-foreground/80">
              {request.description}
            </p>
          )}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>{formatRelativeTime(request.createdAt)}</span>
          </div>
        </div>

        <Button asChild variant="outline" className="mt-4 w-full">
          <Link href={`/pedidos/${request.id}`}>Ver detalhes</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
