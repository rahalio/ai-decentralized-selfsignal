import { AppShell } from '@/components/app-shell';
import { GhostButton, StatusPill } from '@/components/ui';

const LOG = [
  { id: 'act_1', purpose: 'Interest ads', signal: 'intent', result: 'allowed', mode: 'deterministic' },
  { id: 'act_2', purpose: 'Retargeting', signal: 'engagement', result: 'blocked', mode: '—' },
];

export default function ActivationPage() {
  return (
    <AppShell role="publisher" title="Signal activation health">
      <p className="mb-4 text-sm text-baltic-900/65">Emission log with SLA and bidstream token status.</p>
      <ul className="space-y-3">
        {LOG.map((row) => (
          <li key={row.id} className="flex flex-wrap items-center justify-between gap-2 border-b border-baltic-900/10 pb-3 font-mono text-sm">
            <span>{row.id} · {row.purpose} · {row.signal}</span>
            <StatusPill tone={row.result === 'allowed' ? 'signal' : 'statute'}>{row.result}</StatusPill>
          </li>
        ))}
      </ul>
      <GhostButton className="mt-6">Replay test emission</GhostButton>
    </AppShell>
  );
}
