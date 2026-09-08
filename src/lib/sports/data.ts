import type { Match, StandingRow, Team } from "./types";

export const TEAMS: Team[] = [
  { id: "ud-melilla", slug: "ud-melilla", name: "UD Melilla", shortName: "Melilla", initials: "UDM", sport: "futbol", gender: "M", league: "Tercera Federación · Grupo 9", venue: "Estadio Álvarez Claro", city: "Melilla", crest: "navy" },
  { id: "torreblanca", slug: "torreblanca", name: "Melilla CD Torreblanca", shortName: "Torreblanca", initials: "TB", sport: "futsal", gender: "F", league: "Primera FS Iberdrola", venue: "Pabellón Javier Imbroda Ortiz", city: "Melilla", crest: "steel" },
  { id: "melilla-bcto", slug: "melilla-baloncesto", name: "Melilla Ciudad del Deporte", shortName: "Melilla Bcto", initials: "MB", sport: "baloncesto", gender: "M", league: "Segunda FEB · Grupo A", venue: "Pabellón Javier Imbroda Ortiz", city: "Melilla", crest: "ink" },
  { id: "cv-melilla", slug: "cv-melilla", name: "CV Melilla", shortName: "CV Melilla", initials: "CVM", sport: "voleibol", gender: "M", league: "Superliga Masculina", venue: "Pabellón Javier Imbroda Ortiz", city: "Melilla", crest: "wave" },
  { id: "cv-melilla-fem", slug: "cv-melilla-femenino", name: "CV Melilla Femenino", shortName: "CV Melilla F", initials: "CVF", sport: "voleibol", gender: "F", league: "Liga Iberdrola", venue: "Pabellón Javier Imbroda Ortiz", city: "Melilla", crest: "mist" },
  { id: "la-salle", slug: "la-salle", name: "Melilla CD La Salle", shortName: "La Salle", initials: "LS", sport: "baloncesto", gender: "F", league: "Liga Femenina Challenge", venue: "Pabellón Guillermo García Pezzi", city: "Melilla", crest: "slate" },
  { id: "enrique-soler", slug: "enrique-soler", name: "CAM Enrique Soler", shortName: "Enrique Soler", initials: "ES", sport: "baloncesto", gender: "M", league: "Tercera FEB", venue: "Pabellón Guillermo García Pezzi", city: "Melilla", crest: "stone" },
];

export function getTeam(id: string) { return TEAMS.find((t) => t.id === id); }
export function teamBySlug(slug: string) { return TEAMS.find((t) => t.slug === slug); }
export function teamPath(teamId: string) { const t = getTeam(teamId); return t ? `/equipo/${t.slug}` : undefined; }
export function teamPathSlug(teamId: string) { return getTeam(teamId)?.slug; }

const teamMap = Object.fromEntries(TEAMS.map((t) => [t.id, t]));
function sideFromTeam(id: string) {
  const t = teamMap[id];
  if (!t) throw new Error(`Unknown team ${id}`);
  return { teamId: t.id, name: t.name, short: t.shortName, initials: t.initials, crest: t.crest, isMelilla: true };
}
function opp(name: string, short: string, initials: string) {
  return { teamId: `opp-${short.toLowerCase().replace(/\s+/g, "-")}`, name, short, initials, crest: "away", isMelilla: false };
}

export const MATCHES: Match[] = [
  { id: "fut-j1", sport: "futbol", competition: "Tercera Federación", round: "Jornada 1", kickoff: "2026-09-05T12:30:00+02:00", venue: "Estadio Municipal", city: "Torredonjimeno", home: opp("Ciudad de Torredonjimeno", "Torredonjimeno", "TOR"), away: sideFromTeam("ud-melilla"), score: { home: 1, away: 2 }, status: "ft" },
  { id: "fs-j1", sport: "futsal", competition: "Primera FS Iberdrola", round: "Jornada 1", kickoff: "2026-09-05T13:00:00+02:00", venue: "Pabellón Javier Imbroda Ortiz", city: "Melilla", home: sideFromTeam("torreblanca"), away: opp("Nueces de Ronda Atlético Torcal", "Atlético Torcal", "TOR"), score: { home: 6, away: 3 }, status: "ft" },
  { id: "fut-copa-rfef", sport: "futbol", competition: "Copa Federación", round: "Dieciseisavos", kickoff: "2026-09-09T17:30:00+02:00", venue: "Estadio Álvarez Claro", city: "Melilla", home: sideFromTeam("ud-melilla"), away: opp("Conil CF", "Conil", "CON"), status: "scheduled" },
  { id: "fut-j2", sport: "futbol", competition: "Tercera Federación", round: "Jornada 2", kickoff: "2026-09-12T16:00:00+02:00", venue: "Estadio Álvarez Claro", city: "Melilla", home: sideFromTeam("ud-melilla"), away: opp("CD Huétor Vega", "Huétor Vega", "HVE"), status: "scheduled" },
  { id: "fs-j2", sport: "futsal", competition: "Primera FS Iberdrola", round: "Jornada 2", kickoff: "2026-09-12T18:00:00+02:00", venue: "Pavelló de l'Esport", city: "Barcelona", home: opp("AEF Les Corts UBAE", "Les Corts", "LCO"), away: sideFromTeam("torreblanca"), status: "scheduled" },
  { id: "fut-j3", sport: "futbol", competition: "Tercera Federación", round: "Jornada 3", kickoff: "2026-09-19T20:00:00+02:00", venue: "Estadio Juan Lorenzo Suárez", city: "Torre del Mar", home: opp("UD Torre del Mar", "Torre del Mar", "TDM"), away: sideFromTeam("ud-melilla"), status: "scheduled" },
  { id: "fs-j3", sport: "futsal", competition: "Primera FS Iberdrola", round: "Jornada 3", kickoff: "2026-09-19T18:00:00+02:00", venue: "Pabellón Javier Imbroda Ortiz", city: "Melilla", home: sideFromTeam("torreblanca"), away: opp("MRB FSF Móstoles", "Móstoles", "MOS"), status: "scheduled" },
  { id: "fut-j4", sport: "futbol", competition: "Tercera Federación", round: "Jornada 4", kickoff: "2026-09-26T20:00:00+02:00", venue: "Estadio Álvarez Claro", city: "Melilla", home: sideFromTeam("ud-melilla"), away: opp("CD Málaga Juniors", "Málaga Juniors", "MJF"), status: "scheduled" },
  { id: "fut-j5", sport: "futbol", competition: "Tercera Federación", round: "Jornada 5", kickoff: "2026-10-03T20:00:00+02:00", venue: "Estadio Municipal", city: "Alhaurín el Grande", home: opp("CD Alhaurino", "Alhaurino", "ALH"), away: sideFromTeam("ud-melilla"), status: "scheduled" },
  { id: "bcto-j1", sport: "baloncesto", competition: "Segunda FEB", round: "Jornada 1", kickoff: "2026-10-03T18:00:00+02:00", venue: "Pabellón Pisuerga", city: "Valladolid", home: opp("UEMC Real Valladolid", "Valladolid", "VLL"), away: sideFromTeam("melilla-bcto"), status: "scheduled" },
  { id: "fut-j6", sport: "futbol", competition: "Tercera Federación", round: "Jornada 6", kickoff: "2026-10-10T20:00:00+02:00", venue: "Estadio Álvarez Claro", city: "Melilla", home: sideFromTeam("ud-melilla"), away: opp("UD San Pedro", "San Pedro", "SPE"), status: "scheduled" },
  { id: "bcto-j2", sport: "baloncesto", competition: "Segunda FEB", round: "Jornada 2", kickoff: "2026-10-10T18:00:00+02:00", venue: "Pabellón Javier Imbroda Ortiz", city: "Melilla", home: sideFromTeam("melilla-bcto"), away: opp("Clínica Ponferrada SDP", "Ponferrada", "PON"), status: "scheduled" },
  { id: "vol-j1", sport: "voleibol", competition: "Superliga Masculina", round: "Jornada 1", kickoff: "2026-10-17T18:30:00+02:00", venue: "Pabellón Javier Imbroda Ortiz", city: "Melilla", home: sideFromTeam("cv-melilla"), away: opp("Conqueridor Valencia", "Valencia", "VAL"), status: "scheduled" },
  { id: "bcto-j3", sport: "baloncesto", competition: "Segunda FEB", round: "Jornada 3", kickoff: "2026-10-17T18:00:00+02:00", venue: "Palacio de los Deportes", city: "León", home: opp("Cultural Leonesa", "Leonesa", "CUL"), away: sideFromTeam("melilla-bcto"), status: "scheduled" },
  { id: "vol-j2", sport: "voleibol", competition: "Superliga Masculina", round: "Jornada 2", kickoff: "2026-10-24T19:00:00+02:00", venue: "Pabellón Los Planos", city: "Teruel", home: opp("CV Teruel", "Teruel", "TER"), away: sideFromTeam("cv-melilla"), status: "scheduled" },
  { id: "bcto-j4", sport: "baloncesto", competition: "Segunda FEB", round: "Jornada 4", kickoff: "2026-10-24T18:00:00+02:00", venue: "Pabellón Javier Imbroda Ortiz", city: "Melilla", home: sideFromTeam("melilla-bcto"), away: opp("Tres Cantos CB", "Tres Cantos", "TDC"), status: "scheduled" },
  { id: "bcto-j5", sport: "baloncesto", competition: "Segunda FEB", round: "Jornada 5", kickoff: "2026-10-31T18:00:00+01:00", venue: "Movistar Academy Magariños", city: "Madrid", home: opp("Movistar Estudiantes B", "Estudiantes B", "EST"), away: sideFromTeam("melilla-bcto"), status: "scheduled" },
  { id: "bcto-j6", sport: "baloncesto", competition: "Segunda FEB", round: "Jornada 6", kickoff: "2026-11-07T18:00:00+01:00", venue: "Pabellón Javier Imbroda Ortiz", city: "Melilla", home: sideFromTeam("melilla-bcto"), away: opp("CB Naturavia Morón", "Morón", "MOR"), status: "scheduled" },
];

export const STANDINGS: StandingRow[] = [
  { pos: 1, teamId: "arenas", name: "Arenas de Armilla", short: "Arenas", played: 1, won: 1, drawn: 0, lost: 0, gf: 2, ga: 0, pts: 3, isMelilla: false },
  { pos: 2, teamId: "ud-melilla", name: "UD Melilla", short: "Melilla", played: 1, won: 1, drawn: 0, lost: 0, gf: 2, ga: 1, pts: 3, isMelilla: true },
  { pos: 3, teamId: "almeria-b", name: "Almería B", short: "Almería B", played: 1, won: 1, drawn: 0, lost: 0, gf: 2, ga: 1, pts: 3, isMelilla: false },
  { pos: 4, teamId: "torre-mar", name: "Torre del Mar", short: "Torre del Mar", played: 1, won: 1, drawn: 0, lost: 0, gf: 1, ga: 0, pts: 3, isMelilla: false },
  { pos: 5, teamId: "san-pedro", name: "UD San Pedro", short: "San Pedro", played: 1, won: 1, drawn: 0, lost: 0, gf: 1, ga: 0, pts: 3, isMelilla: false },
  { pos: 6, teamId: "porcuna", name: "Atlético Porcuna", short: "Porcuna", played: 1, won: 1, drawn: 0, lost: 0, gf: 1, ga: 0, pts: 3, isMelilla: false },
  { pos: 7, teamId: "mancha", name: "Atlético Mancha Real", short: "Mancha Real", played: 1, won: 0, drawn: 1, lost: 0, gf: 1, ga: 1, pts: 1, isMelilla: false },
  { pos: 8, teamId: "marbelli", name: "FC Marbellí", short: "Marbellí", played: 1, won: 0, drawn: 1, lost: 0, gf: 1, ga: 1, pts: 1, isMelilla: false },
  { pos: 9, teamId: "alhaurino", name: "CD Alhaurino", short: "Alhaurino", played: 1, won: 0, drawn: 1, lost: 0, gf: 0, ga: 0, pts: 1, isMelilla: false },
  { pos: 10, teamId: "granada-b", name: "Recreativo Granada", short: "Granada B", played: 1, won: 0, drawn: 1, lost: 0, gf: 0, ga: 0, pts: 1, isMelilla: false },
  { pos: 11, teamId: "huetor", name: "CD Huétor Vega", short: "Huétor Vega", played: 1, won: 0, drawn: 1, lost: 0, gf: 0, ga: 0, pts: 1, isMelilla: false },
  { pos: 12, teamId: "motril", name: "CF Motril", short: "Motril", played: 1, won: 0, drawn: 1, lost: 0, gf: 0, ga: 0, pts: 1, isMelilla: false },
  { pos: 13, teamId: "torredonjimeno", name: "Torredonjimeno", short: "Torredonjimeno", played: 1, won: 0, drawn: 0, lost: 1, gf: 1, ga: 2, pts: 0, isMelilla: false },
  { pos: 14, teamId: "malaga-j", name: "Málaga Juniors", short: "Málaga Jrs", played: 1, won: 0, drawn: 0, lost: 1, gf: 1, ga: 2, pts: 0, isMelilla: false },
  { pos: 15, teamId: "malagueno", name: "Atlético Malagueño", short: "Malagueño", played: 1, won: 0, drawn: 0, lost: 1, gf: 0, ga: 1, pts: 0, isMelilla: false },
  { pos: 16, teamId: "cantoria", name: "Cantoria 2017", short: "Cantoria", played: 1, won: 0, drawn: 0, lost: 1, gf: 0, ga: 1, pts: 0, isMelilla: false },
  { pos: 17, teamId: "churriana", name: "Churriana de la Vega", short: "Churriana", played: 1, won: 0, drawn: 0, lost: 1, gf: 0, ga: 1, pts: 0, isMelilla: false },
  { pos: 18, teamId: "marbella", name: "Atlético Marbella", short: "Marbella", played: 1, won: 0, drawn: 0, lost: 1, gf: 0, ga: 2, pts: 0, isMelilla: false },
];

export const SPORT_LABEL: Record<Team["sport"], string> = {
  futbol: "Fútbol", baloncesto: "Baloncesto", futsal: "Fútbol sala", voleibol: "Voleibol",
};
export const DURATION_MS: Record<Team["sport"], number> = {
  futbol: 2 * 60 * 60 * 1000, futsal: 90 * 60 * 1000, baloncesto: 2 * 60 * 60 * 1000, voleibol: 150 * 60 * 1000,
};
