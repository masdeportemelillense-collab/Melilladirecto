import { Link } from "@tanstack/react-router";
import { Radio } from "lucide-react";
import { useEffect, useState } from "react";

function MadridClock() {
  const [label, setLabel] = useState("");

  useEffect(() => {
    const tick = () => {
      setLabel(
        new Date().toLocaleTimeString("es-ES", {
          timeZone: "Europe/Madrid",
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (!label) return null;
  return (
    <time className="font-display text-lg tabular tracking-tight text-fg" dateTime={label}>
      {label}
    </time>
  );
}

export function SiteHeader({ liveCount }: { liveCount: number }) {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-bg">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-display text-xl tracking-tight text-fg">Melilla</span>
          <span className="font-display text-xl tracking-tight text-accent">Directo</span>
        </Link>
        <div className="flex items-center gap-4">
          {liveCount > 0 && (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-live">
              <Radio className="size-3.5" />
              {liveCount} en juego
            </span>
          )}
          <div className="hidden text-right sm:block">
            <p className="text-xs uppercase tracking-wider text-subtle">Melilla</p>
            <MadridClock />
          </div>
        </div>
      </div>
    </header>
  );
}
