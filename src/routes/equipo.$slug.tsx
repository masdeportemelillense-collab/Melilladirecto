import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, MapPin } from "lucide-react";
import { Crest } from "@/components/crest";
import { MatchCard } from "@/components/match-card";
import { SiteHeader } from "@/components/site-header";
import { Standings } from "@/components/standings";
import { matchesForTeam } from "@/lib/sports/board";
import { SPORT_LABEL, teamBySlug } from "@/lib/sports/data";
import { getBoard } from "@/lib/sports/get-board";

export const Route = createFileRoute("/equipo/$slug")({
  loader: () => getBoard(),
  component: TeamPage,
});

function TeamPage() {
  const { slug } = Route.useParams();
  const initial = Route.useLoaderData();
  const { data } = useQuery({
    queryKey: ["board"],
    queryFn: () => getBoard(),
    initialData: initial,
    refetchInterval: 20_000,
  });
  const team = teamBySlug(slug);

  if (!team) {
    return (
      <div className="min-h-dvh overflow-x-hidden">
        <SiteHeader liveCount={data.live.length} />
        <main className="mx-auto max-w-5xl px-4 py-16 text-center">
          <h1 className="font-display text-3xl tracking-tight">Equipo no encontrado</h1>
          <Link to="/" className="mt-4 inline-block text-sm text-accent">
            Volver al marcador
          </Link>
        </main>
      </div>
    );
  }

  const teamMatches = matchesForTeam(data, team.id);
  const live = teamMatches.filter((m) => m.status === "live");
  const upcoming = teamMatches.filter((m) => m.status === "scheduled");
  const results = teamMatches
    .filter((m) => m.status === "ft")
    .sort((a, b) => new Date(b.kickoff).getTime() - new Date(a.kickoff).getTime());

  return (
    <div className="min-h-dvh overflow-x-hidden">
      <SiteHeader liveCount={data.live.length} />
      <main className="mx-auto flex w-full min-w-0 max-w-5xl flex-col gap-8 px-4 py-8 pb-16">
        <Link to="/" className="inline-flex h-11 w-fit items-center gap-2 text-sm text-muted hover:text-fg">
          <ArrowLeft className="size-4" />
          Marcador
        </Link>

        <section className="flex items-start gap-4 rounded-2xl bg-surface p-5 shadow-border">
          <Crest initials={team.initials} crest={team.crest} size="lg" />
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-wider text-accent">
              {SPORT_LABEL[team.sport]}
              {team.gender === "F" ? " · Femenino" : ""}
            </p>
            <h1 className="mt-1 font-display text-3xl leading-none tracking-tight text-fg sm:text-4xl">
              {team.name}
            </h1>
            <p className="mt-2 text-sm text-muted">{team.league}</p>
            <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-subtle">
              <MapPin className="size-3.5" />
              {team.venue}
            </p>
          </div>
        </section>

        {live.length > 0 && (
          <section className="space-y-3">
            <h2 className="font-display text-2xl tracking-tight">En juego</h2>
            {live.map((match) => (
              <MatchCard key={match.id} match={match} featured />
            ))}
          </section>
        )}

        {upcoming.length > 0 && (
          <section className="space-y-3">
            <h2 className="font-display text-2xl tracking-tight">Próximos</h2>
            <div className="grid min-w-0 gap-3 md:grid-cols-2">
              {upcoming.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </section>
        )}

        {results.length > 0 && (
          <section className="space-y-3">
            <h2 className="font-display text-2xl tracking-tight">Resultados</h2>
            <div className="grid min-w-0 gap-3 md:grid-cols-2">
              {results.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </section>
        )}

        {upcoming.length === 0 && results.length === 0 && live.length === 0 && (
          <p className="rounded-xl bg-surface p-5 text-sm text-muted shadow-border">
            La liga arranca en octubre. El calendario de {team.name} se publicará aquí en cuanto se confirme.
          </p>
        )}

        {team.id === "ud-melilla" && <Standings rows={data.standings} />}
      </main>
    </div>
  );
}
