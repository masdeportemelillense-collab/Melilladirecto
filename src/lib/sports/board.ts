import { DURATION_MS, MATCHES, STANDINGS, TEAMS } from "./data";
import type { Board, Match, Sport } from "./types";

function footballMinute(elapsedMs: number): number {
  const minutes = Math.floor(elapsedMs / 60000);
  if (minutes < 45) return minutes;
  if (minutes < 60) return 45;
  const secondHalf = minutes - 15;
  return Math.min(secondHalf, 90);
}

export function resolveMatch(match: Match, now: number): Match {
  const start = new Date(match.kickoff).getTime();
  const end = start + DURATION_MS[match.sport];

  if (match.score && match.status === "ft") {
    return { ...match, status: "ft" };
  }

  if (now >= start && now <= end && match.status !== "ft") {
    const elapsed = now - start;
    const minute =
      match.sport === "futbol" || match.sport === "futsal"
        ? footballMinute(elapsed)
        : Math.floor(elapsed / 60000);
    return {
      ...match,
      status: "live",
      minute,
      score: match.score ?? { home: 0, away: 0 },
    };
  }

  if (now > end) {
    return {
      ...match,
      status: "ft",
      score: match.score ?? { home: 0, away: 0 },
    };
  }

  return { ...match, status: "scheduled", minute: undefined };
}

function namesMatch(a: string, b: string) {
  const n = (s: string) => s.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
  return n(a).includes(n(b)) || n(b).includes(n(a));
}

export function mergeRemote(local: Match[], remote: Match[]): Match[] {
  return local.map((match) => {
    const hit = remote.find(
      (r) =>
        namesMatch(r.home.name, match.home.name) &&
        namesMatch(r.away.name, match.away.name),
    );
    if (!hit) return match;
    return {
      ...match,
      kickoff: hit.kickoff || match.kickoff,
      score: hit.score ?? match.score,
      status: hit.status === "ft" || hit.score ? hit.status : match.status,
    };
  });
}

export function buildBoard(now = Date.now(), overlay: Match[] = []): Board {
  const matches = mergeRemote(MATCHES, overlay)
    .map((m) => resolveMatch(m, now))
    .sort((a, b) => new Date(a.kickoff).getTime() - new Date(b.kickoff).getTime());

  const live = matches.filter((m) => m.status === "live");
  const upcoming = matches.filter((m) => m.status === "scheduled");
  const results = matches
    .filter((m) => m.status === "ft")
    .sort((a, b) => new Date(b.kickoff).getTime() - new Date(a.kickoff).getTime());

  return {
    generatedAt: new Date(now).toISOString(),
    timezone: "Europe/Madrid",
    live,
    upcoming,
    results,
    matches,
    teams: TEAMS,
    standings: STANDINGS,
    next: live[0] ?? upcoming[0] ?? null,
  };
}

export function matchesForTeam(board: Board, teamId: string) {
  return board.matches.filter(
    (m) => m.home.teamId === teamId || m.away.teamId === teamId,
  );
}

export function filterBySport(matches: Match[], sport: Sport | "todos") {
  if (sport === "todos") return matches;
  return matches.filter((m) => m.sport === sport);
}
