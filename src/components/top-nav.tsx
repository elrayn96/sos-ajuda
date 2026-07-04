"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Início" },
  { href: "/pedidos", label: "Pedidos" },
  { href: "/pedir-ajuda", label: "Pedir Ajuda" },
  { href: "/sobre", label: "Sobre" },
];

export function TopNav() {
  const pathname = usePathname();

  return (
    <header className="hidden border-b bg-card md:block">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold text-primary">
          SOS Ajuda
        </Link>
        <nav className="flex items-center gap-6" aria-label="Navegação desktop">
          {navItems.map(({ href, label }) => {
            const isActive =
              href === "/"
                ? pathname === "/"
                : pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "text-sm font-medium transition-colors min-h-[44px] flex items-center",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
