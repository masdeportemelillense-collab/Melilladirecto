import type { StandingRow } from "@/lib/sports/types";
import { cn } from "@/lib/utils";

export function Standings({ rows }: { rows: StandingRow[] }) {
  return (
    <div className="overflow-hidden rounded-xl bg-surface shadow-border">
      <div className="flex items-baseline justify-between px-4 py-3">
        <h2 className="font-display text-lg tracking-tight text-fg">Tercera Federación</h2>
        <span className="text-xs uppercase tracking-wider text-subtle">Grupo 9</span>
      </div>
      <div className="min-w-0 overflow-x-auto">
        <table className="w-full min-w-80 text-sm">
          <thead className="text-xs uppercase tracking-wider text-subtle">
            <tr className="border-t border-border">
              <th className="px-3 py-2 text-left font-medium">#</th>
              <th className="px-3 py-2 text-left font-medium">Equipo</th>
              <th className="px-2 py-2 text-right font-medium">PJ</th>
              <th className="px-2 py-2 text-right font-medium">G</th>
              <th className="hidden px-2 py-2 text-right font-medium sm:table-cell">E</th>
              <th className="hidden px-2 py-2 text-right font-medium sm:table-cell">P</th>
              <th className="px-2 py-2 text-right font-medium">DG</th>
              <th className="px-3 py-2 text-right font-medium">Pts</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.teamId}
                className={cn(
                  "border-t border-border",
                  row.isMelilla && "bg-accent/10 text-fg",
                )}
              >
                <td className="px-3 py-2.5 tabular text-muted">{row.pos}</td>
                <td className="px-3 py-2.5 font-medium">{row.short}</td>
                <td className="px-2 py-2.5 text-right tabular text-muted">{row.played}</td>
                <td className="px-2 py-2.5 text-right tabular text-muted">{row.won}</td>
                <td className="hidden px-2 py-2.5 text-right tabular text-muted sm:table-cell">
                  {row.drawn}
                </td>
                <td className="hidden px-2 py-2.5 text-right tabular text-muted sm:table-cell">
                  {row.lost}
                </td>
                <td className="px-2 py-2.5 text-right tabular text-muted">
                  {row.gf - row.ga > 0 ? `+${row.gf - row.ga}` : row.gf - row.ga}
                </td>
                <td className="px-3 py-2.5 text-right font-display text-base tabular">{row.pts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
