import { useEffect, useState } from "react";

function parts(target: number, now: number) {
  const diff = Math.max(0, target - now);
  const total = Math.floor(diff / 1000);
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
    done: diff <= 0,
  };
}

function Cell({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex min-w-14 flex-col items-center rounded-md bg-surface-2 px-3 py-2">
      <span className="font-display text-2xl leading-none tabular tracking-tight text-fg">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 text-xs uppercase tracking-wider text-subtle">{label}</span>
    </div>
  );
}

export function Countdown({ iso }: { iso: string }) {
  const target = new Date(iso).getTime();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (now == null) {
    return <div className="h-14" aria-hidden />;
  }

  const t = parts(target, now);
  if (t.done) {
    return <p className="text-sm text-muted">El partido está a punto de empezar.</p>;
  }

  return (
    <div className="flex gap-2" aria-label="Cuenta atrás">
      {t.days > 0 && <Cell value={t.days} label="días" />}
      <Cell value={t.hours} label="horas" />
      <Cell value={t.minutes} label="min" />
      <Cell value={t.seconds} label="seg" />
    </div>
  );
}
