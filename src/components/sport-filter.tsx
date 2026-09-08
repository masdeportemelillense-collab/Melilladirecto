import { SPORT_LABEL } from "@/lib/sports/data";
import type { Sport } from "@/lib/sports/types";
import { cn } from "@/lib/utils";

const OPTIONS: Array<{ id: Sport | "todos"; label: string }> = [
  { id: "todos", label: "Todos" },
  { id: "futbol", label: SPORT_LABEL.futbol },
  { id: "futsal", label: SPORT_LABEL.futsal },
  { id: "baloncesto", label: SPORT_LABEL.baloncesto },
  { id: "voleibol", label: SPORT_LABEL.voleibol },
];

export function SportFilter({
  value,
  onChange,
}: {
  value: Sport | "todos";
  onChange: (v: Sport | "todos") => void;
}) {
  return (
    <div className="w-full min-w-0 overflow-x-auto">
      <div
        role="tablist"
        aria-label="Deporte"
        className="flex w-max min-w-full gap-1 rounded-lg bg-surface p-1 shadow-border"
      >
      {OPTIONS.map((opt) => {
        const active = value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.id)}
            className={cn(
              "h-11 shrink-0 rounded-md px-4 text-sm font-medium transition-colors duration-150",
              active ? "bg-fg text-bg" : "text-muted hover:text-fg",
            )}
          >
            {opt.label}
          </button>
        );
      })}
      </div>
    </div>
  );
}
