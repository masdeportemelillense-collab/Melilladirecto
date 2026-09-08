import { MapPin } from "lucide-react";
import { Countdown } from "@/components/countdown";
import { Crest } from "@/components/crest";
import { SPORT_LABEL } from "@/lib/sports/data";
import { formatKickoffLong, statusLabel } from "@/lib/sports/format";
import type { Match } from "@/lib/sports/types";

function Side({
  name, initials, crest, score, align,
}: {
  name: string; initials: string; crest: string; score?: number; align: "left" | "right";
}) {
  return (
    <div className={align === "left" ? "flex min-w-0 items-center gap-3" : "flex min-w-0 items-center gap-3 sm:flex-row-reverse"}>
      <Crest initials={initials} crest={crest} size="lg" />
      <div className={align === "right" ? "min-w-0 sm:text-right" : "min-w-0"}>
        <p className="truncate font-medium text-fg">{name}</p>
        {score != null && (
          <p className="font-display text-5xl leading-none tabular tracking-tight text-fg sm:text-6xl">{score}</p>
        )}
      </div>
    </div>
  );
}

export function HeroMatch({ match }: { match: Match }) {
  const live = match.status === "live";
  const showScore = live || match.status === "ft";
  return (
    <section className="reveal min-w-0 overflow-hidden rounded-2xl bg-surface p-5 shadow-border sm:p-7">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2 text-xs uppercase tracking-wider text-muted">
        <span>
          {SPORT_LABEL[match.sport]} · {match.competition}
          {match.round ? ` · ${match.round}` : ""}
        </span>
        {live ? (
          <span className="inline-flex items-center gap-1.5 font-medium text-live">
            <span className="live-dot size-1.5 rounded-full bg-live" />
            En directo · {statusLabel(match)}
          </span>
        ) : (
          <span className="capitalize">{formatKickoffLong(match.kickoff)}</span>
        )}
      </div>
      <div className="grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
        <Side name={match.home.name} initials={match.home.initials} crest={match.home.crest} score={showScore ? match.score?.home : undefined} align="left" />
        <div className="text-center">
          {showScore ? (
            <span className="font-display text-sm uppercase tracking-widest text-subtle">vs</span>
          ) : (
            <span className="font-display text-3xl tabular text-muted">{statusLabel(match)}</span>
          )}
        </div>
        <Side name={match.away.name} initials={match.away.initials} crest={match.away.crest} score={showScore ? match.score?.away : undefined} align="right" />
      </div>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <p className="inline-flex items-center gap-1.5 text-sm text-subtle">
          <MapPin className="size-4" />
          {match.venue} · {match.city}
        </p>
        {match.status === "scheduled" && <Countdown iso={match.kickoff} />}
      </div>
    </section>
  );
}
