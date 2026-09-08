import { cn } from "@/lib/utils";

const CREST: Record<string, string> = {
  navy: "bg-surface-2 text-accent",
  steel: "bg-accent text-accent-fg",
  ink: "bg-fg text-bg",
  wave: "bg-surface text-accent",
  mist: "bg-surface-2 text-fg",
  slate: "bg-surface text-muted",
  stone: "bg-surface-2 text-muted",
  away: "bg-surface-2 text-subtle",
};

export function Crest({
  initials,
  crest,
  size = "md",
}: {
  initials: string;
  crest: string;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-md font-display font-medium tracking-wide",
        CREST[crest] ?? CREST.away,
        size === "sm" && "size-8 text-xs",
        size === "md" && "size-10 text-sm",
        size === "lg" && "size-14 text-base",
      )}
      aria-hidden
    >
      {initials.slice(0, 3)}
    </span>
  );
}
