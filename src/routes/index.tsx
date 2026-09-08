import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { HeroMatch } from "@/components/hero-match";
import { MatchCard } from "@/components/match-card";
import { SiteHeader } from "@/components/site-header";
import { SportFilter } from "@/components/sport-filter";
import { Standings } from "@/components/standings";
import { TeamGrid } from "@/components/team-grid";
import { teamPathSlug } from "@/lib/sports/data";
import { getBoard } from "@/lib/sports/get-board";
import type { Sport } from "@/lib/sports/types";

export const Route = createFileRoute("/")({
  loader: () => getBoard(),
  component: Home,
});

function pick<T>(list: T[], sport: Sport | "todos", getSport: (item: T) => Sport) {
  if (sport === "todos") return list;
  return list.filter((item) => getSport(item) === sport);
}

function Home() {
  const initial = Route.useLoaderData();
  const { data } = useQuery({
    queryKey: ["board"],
    queryFn: () => getBoard(),
    initialData: initial,
    refetchInterval: 20_000,
  });
  const [sport, setSport] = useState<Sport | "todos">("todos");

  const live = useMemo(() => pick(data.live, sport, (m) => m.sport), [data.live, sport]);
  const upcoming = useMemo(
    () => pick(data.upcoming, sport, (m) => m.sport).slice(0, 8),
    [data.upcoming, sport],
  );
  const results = useMemo(
    () => pick(data.results, sport, (m) => m.sport).slice(0, 6),
    [data.results, sport],
  );
  const teams = useMemo(
    () => pick(data.teams, sport, (t) => t.sport),
    [data.teams, sport],
  );
  const hero = live[0] ?? (sport === "todos" ? data.next : upcoming[0] ?? live[0]);
  const heroSlug = hero
    ? teamPathSlug(hero.home.isMelilla ? hero.home.teamId : hero.away.teamId)
    : undefined;

  return (
    <div className="min-h-dvh overflow-x-hidden">
      <SiteHeader liveCount={data.live.length} />
      <main className="mx-auto flex w-full min-w-0 max-w-5xl flex-col gap-10 px-4 py-8 pb-16">
        <div className="reveal space-y-3">
          <p className="text-xs uppercase tracking-widest text-accent">Ciudad Autónoma de Melilla</p>
          <h1 className="font-display text-4xl leading-none tracking-tight text-fg sm:text-5xl">
            El deporte local, en un vistazo.
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-muted">
            Resultados, próximos partidos y clasificación de los equipos melillenses en categoría
            nacional. Temporada 2026/27.
          </p>
        </div>

        <SportFilter value={sport} onChange={setSport} />

        {hero &&
          (heroSlug ? (
            <Link
              to="/equipo/$slug"
              params={{ slug: heroSlug }}
              className="block min-w-0 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
            >
              <HeroMatch match={hero} />
            </Link>
          ) : (
            <HeroMatch match={hero} />
          ))}

        {live.length > 1 && (
          <section className="space-y-3">
            <SectionTitle kicker="Ahora" title="En juego" />
            <div className="grid gap-3">
              {live.slice(1).map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </section>
        )}

        {upcoming.length > 0 && (
          <section className="space-y-3">
            <SectionTitle kicker="Agenda" title="Próximos" />
            <div className="grid min-w-0 gap-3 md:grid-cols-2">
              {upcoming
                .filter((m) => m.id !== hero?.id)
                .map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
            </div>
          </section>
        )}

        {results.length > 0 && (
          <section className="space-y-3">
            <SectionTitle kicker="Cierre" title="Últimos resultados" />
            <div className="grid min-w-0 gap-3 md:grid-cols-2">
              {results.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </section>
        )}

        {(sport === "todos" || sport === "futbol") && (
          <section className="space-y-3">
            <SectionTitle kicker="Liga" title="Clasificación" />
            <Standings rows={data.standings} />
          </section>
        )}

        <section className="space-y-3">
          <SectionTitle kicker="Ciudad" title="Equipos" />
          <TeamGrid teams={teams} />
        </section>
      </main>
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-col gap-1 px-4 py-6 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
          <span>Melilla Directo · Temporada 2026/27</span>
          <span>Horarios en hora peninsular · Actualización cada 20 s</span>
        </div>
      </footer>
    </div>
  );
}

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <h2 className="font-display text-2xl tracking-tight text-fg">{title}</h2>
      <span className="text-xs uppercase tracking-wider text-subtle">{kicker}</span>
    </div>
  );
}
