export function Metric({
  label,
  value,
  hint,
  tone = 'neutral',
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: 'neutral' | 'signal' | 'statute' | 'amber';
}) {
  const toneClass =
    tone === 'signal'
      ? 'text-signal'
      : tone === 'statute'
        ? 'text-statute'
        : tone === 'amber'
          ? 'text-amberwarn'
          : 'text-baltic-900';
  return (
    <div className="border-b border-baltic-900/10 pb-3">
      <p className="text-xs uppercase tracking-[0.16em] text-baltic-900/50">{label}</p>
      <p className={`mt-1 font-display text-3xl font-semibold ${toneClass}`}>{value}</p>
      {hint ? <p className="mt-1 text-sm text-baltic-900/60">{hint}</p> : null}
    </div>
  );
}

export function StatusPill({
  children,
  tone = 'neutral',
}: {
  children: React.ReactNode;
  tone?: 'neutral' | 'signal' | 'statute' | 'amber';
}) {
  const cls =
    tone === 'signal'
      ? 'bg-signal/15 text-signal'
      : tone === 'statute'
        ? 'bg-statute/15 text-statute'
        : tone === 'amber'
          ? 'bg-amberwarn/15 text-amberwarn'
          : 'bg-baltic-900/8 text-baltic-900';
  return (
    <span className={`inline-flex rounded-sm px-2 py-0.5 text-xs font-medium ${cls}`}>{children}</span>
  );
}

export function PrimaryButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`rounded-sm bg-seal px-3 py-2 text-sm font-medium text-paper hover:opacity-90 disabled:opacity-40 ${props.className ?? ''}`}
    />
  );
}

export function GhostButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`rounded-sm border border-baltic-900/20 px-3 py-2 text-sm font-medium text-baltic-900 hover:bg-baltic-900/5 disabled:opacity-40 ${props.className ?? ''}`}
    />
  );
}
