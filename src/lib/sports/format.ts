import type { Match } from "./types";

const TZ = "Europe/Madrid";

function fmt(iso: string, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("es-ES", { timeZone: TZ, hour12: false, ...options }).format(
    new Date(iso),
  );
}

function ymdInMadrid(date: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function nextYmd(ymd: string) {
  const [year, month, day] = ymd.split("-").map(Number);
  const next = new Date(Date.UTC(year, month - 1, day + 1));
  return `${next.getUTCFullYear()}-${String(next.getUTCMonth() + 1).padStart(2, "0")}-${String(next.getUTCDate()).padStart(2, "0")}`;
}

export function formatKickoff(iso: string) {
  return fmt(iso, {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatKickoffLong(iso: string) {
  return fmt(iso, {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatClock(iso: string) {
  return fmt(iso, { hour: "2-digit", minute: "2-digit" });
}

export function formatDay(iso: string) {
  const target = ymdInMadrid(new Date(iso));
  const today = ymdInMadrid(new Date());
  if (target === today) return "Hoy";
  if (target === nextYmd(today)) return "Mañana";
  return fmt(iso, { weekday: "short", day: "numeric", month: "short" });
}

export function statusLabel(match: Match) {
  if (match.status === "live") {
    if (match.minute != null && (match.sport === "futbol" || match.sport === "futsal")) {
      return `${match.minute}'`;
    }
    return "En juego";
  }
  if (match.status === "ft") return "Final";
  return formatClock(match.kickoff);
}

export function resultForMelilla(match: Match): "W" | "D" | "L" | null {
  if (match.status !== "ft" || !match.score) return null;
  const us = match.home.isMelilla ? match.score.home : match.score.away;
  const them = match.home.isMelilla ? match.score.away : match.score.home;
  if (us > them) return "W";
  if (us < them) return "L";
  return "D";
}

export { TZ };
