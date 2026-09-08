export type Sport = "futbol" | "baloncesto" | "futsal" | "voleibol";
export type MatchStatus = "scheduled" | "live" | "ft";
export type Team = {
  id: string; slug: string; name: string; shortName: string; initials: string;
  sport: Sport; gender: "M" | "F"; league: string; venue: string; city: string; crest: string;
};
export type Side = {
  teamId: string; name: string; short: string; initials: string; crest: string; isMelilla: boolean;
};
export type Match = {
  id: string; sport: Sport; competition: string; round?: string; kickoff: string;
  venue: string; city: string; home: Side; away: Side;
  score?: { home: number; away: number; detail?: string }; minute?: number; status: MatchStatus;
};
export type StandingRow = {
  pos: number; teamId: string; name: string; short: string; played: number; won: number;
  drawn: number; lost: number; gf: number; ga: number; pts: number; isMelilla: boolean;
};
export type Board = {
  generatedAt: string; timezone: "Europe/Madrid"; live: Match[]; upcoming: Match[];
  results: Match[]; matches: Match[]; teams: Team[]; standings: StandingRow[]; next: Match | null;
};
