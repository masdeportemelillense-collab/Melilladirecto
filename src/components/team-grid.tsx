import { Link } from "@tanstack/react-router";
import { Crest } from "@/components/crest";
import { SPORT_LABEL } from "@/lib/sports/data";
import type { Team } from "@/lib/sports/types";

export function TeamGrid({ teams }: { teams: Team[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {teams.map((team) => (
        <Link
          key={team.id}
          to="/equipo/$slug"
          params={{ slug: team.slug }}
          className="flex items-center gap-3 rounded-xl bg-surface p-3 shadow-border transition-[box-shadow] duration-150 hover:shadow-border-hover"
        >
          <Crest initials={team.initials} crest={team.crest} />
          <div className="min-w-0">
            <p className="truncate font-medium text-fg">{team.name}</p>
            <p className="truncate text-xs text-muted">
              {SPORT_LABEL[team.sport]}
              {team.gender === "F" ? " · Femenino" : ""} · {team.league}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
