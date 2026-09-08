import type { Match } from "./types";

type SportsDbEvent = {
  strHomeTeam?: string;
  strAwayTeam?: string;
  intHomeScore?: string | null;
  intAwayScore?: string | null;
  dateEvent?: string;
  strTime?: string;
  strStatus?: string;
  strProgress?: string;
  strLeague?: string;
};

function toIso(date?: string, time?: string) {
  if (!date) return "";
  const t = (time || "00:00:00").length === 5 ? `${time}:00` : time || "00:00:00";
  return `${date}T${t}Z`;
}

function mapEvent(ev: SportsDbEvent): Match | null {
  if (!ev.strHomeTeam || !ev.strAwayTeam) return null;
  const homeScore = ev.intHomeScore == null ? undefined : Number(ev.intHomeScore);
  const awayScore = ev.intAwayScore == null ? undefined : Number(ev.intAwayScore);
  const hasScore = Number.isFinite(homeScore) && Number.isFinite(awayScore);
  const statusRaw = (ev.strStatus || ev.strProgress || "").toLowerCase();
  const live = statusRaw.includes("live") || statusRaw.includes("1h") || statusRaw.includes("2h") || statusRaw.includes("ht");
  const ft = statusRaw === "ft" || statusRaw.includes("match finished") || (hasScore && !live);

  return {
    id: `remote-${ev.dateEvent}-${ev.strHomeTeam}`,
    sport: "futbol",
    competition: ev.strLeague || "Fútbol",
    kickoff: toIso(ev.dateEvent, ev.strTime),
    venue: "",
    city: "",
    home: {
      teamId: "",
      name: ev.strHomeTeam,
      short: ev.strHomeTeam,
      initials: ev.strHomeTeam.slice(0, 3).toUpperCase(),
      crest: "away",
      isMelilla: /melilla/i.test(ev.strHomeTeam),
    },
    away: {
      teamId: "",
      name: ev.strAwayTeam,
      short: ev.strAwayTeam,
      initials: ev.strAwayTeam.slice(0, 3).toUpperCase(),
      crest: "away",
      isMelilla: /melilla/i.test(ev.strAwayTeam),
    },
    score: hasScore ? { home: homeScore as number, away: awayScore as number } : undefined,
    status: live ? "live" : ft ? "ft" : "scheduled",
  };
}

async function fetchJson(url: string) {
  const res = await fetch(url, {
    headers: { "User-Agent": "MelillaDirecto/1.0" },
    signal: AbortSignal.timeout(4000),
  });
  if (!res.ok) return null;
  return (await res.json()) as { events?: SportsDbEvent[]; results?: SportsDbEvent[] };
}

export async function fetchRemoteMatches(): Promise<Match[]> {
  try {
    const [last, next] = await Promise.all([
      fetchJson("https://www.thesportsdb.com/api/v1/json/123/eventslast.php?id=137847"),
      fetchJson("https://www.thesportsdb.com/api/v1/json/123/eventsnext.php?id=137847"),
    ]);
    const events = [...(last?.results ?? last?.events ?? []), ...(next?.events ?? [])];
    return events.map(mapEvent).filter((m): m is Match => m != null);
  } catch {
    return [];
  }
}
