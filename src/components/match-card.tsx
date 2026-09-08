import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { Crest } from "@/components/crest";
import { SPORT_LABEL, teamPathSlug } from "@/lib/sports/data";
import { formatDay, resultForMelilla, statusLabel } from "@/lib/sports/format";
import type { Match } from "@/lib/sports/types";
import { cn } from "@/lib/utils";

function TeamRow({
  name, initials, crest, score, dim,
}: {
  name: string; initials: string; crest: string; score?: number; dim?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-3", dim && "opacity-55")}>
      <Crest initials={initials} crest={crest} size="sm" />
      <span className="min-w-0 flex-1 truncate font-medium text-fg">{name}</span>
      {score != null && (
        <span className="font-display text-2xl leading-none tabular tracking-tight text-fg">{score}</span>
      )}
    </div>
  );
}

export function MatchCard({ match, featured = false }: { match: Match; featured?: boolean }) {
  const live = match.status === "live";
  const ft = match.status === "ft";
  const showScore = live || ft;
  const result = resultForMelilla(match);
  const homeDim = ft && match.score && match.score.home < match.score.away;
  const awayDim = ft && match.score && match.score.away < match.score.home;
  const slug = match.home.isMelilla
    ? teamPathSlug(match.home.teamId)
    : match.away.isMelilla
      ? teamPathSlug(match.away.teamId)
      : undefined;

  const inner = (
    <article className={cn(
      "min-w-0 w-full overflow-hidden rounded-xl bg-surface p-4 shadow-border transition-[box-shadow,transform] duration-150 ease-out",
      featured && "rounded-2xl p-5",
      live && "shadow-border-hover",
      slug && "hover:shadow-border-hover",
    )}>
      <header className="mb-3 flex items-center justify-between gap-3 text-xs text-muted">
        <span className="min-w-0 truncate">
          {SPORT_LABEL[match.sport]} · {match.competition}
          {match.round ? ` · ${match.round}` : ""}
        </span>
        <span className="flex shrink-0 items-center gap-2">
          {live && (
            <span className="inline-flex items-center gap-1.5 font-medium uppercase tracking-wider text-live">
              <span className="live-dot size-1.5 rounded-full bg-live" />
              En directo
            </span>
          )}
          {ft && result && (
            <span className={cn(
              "rounded-xs px-1.5 py-0.5 font-medium uppercase tracking-wide",
              result === "W" && "bg-win/15 text-win",
              result === "L" && "bg-live/15 text-live",
              result === "D" && "bg-surface-2 text-muted",
            )}>
              {result === "W" ? "Victoria" : result === "L" ? "Derrota" : "Empate"}
            </span>
          )}
          {match.status === "scheduled" && (
            <span className="capitalize">{formatDay(match.kickoff)}</span>
          )}
        </span>
      </header>
      <div className="grid gap-2.5">
        <TeamRow name={match.home.name} initials={match.home.initials} crest={match.home.crest} score={showScore ? match.score?.home : undefined} dim={homeDim} />
        <TeamRow name={match.away.name} initials={match.away.initials} crest={match.away.crest} score={showScore ? match.score?.away : undefined} dim={awayDim} />
      </div>
      <footer className="mt-3 flex items-center justify-between gap-3 text-xs text-subtle">
        <span className="inline-flex min-w-0 items-center gap-1.5 truncate">
          <MapPin className="size-3.5 shrink-0" />
          <span className="truncate">{match.venue}{match.city ? ` · ${match.city}` : ""}</span>
        </span>
        <span className="font-display text-lg leading-none tabular tracking-tight text-fg">{statusLabel(match)}</span>
      </footer>
    </article>
  );

  if (!slug) return inner;
  return (
    <Link to="/equipo/$slug" params={{ slug }} className="block min-w-0 w-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60">
      {inner}
    </Link>
  );
}
