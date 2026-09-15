'use client';

import { AppShell } from '@/components/app-shell';
import { GhostButton, PrimaryButton, StatusPill } from '@/components/ui';

const GRANTS = [
  { id: 'cgr_01', party: 'Baltic News Network', purpose: 'Interest-based ads', expires: '2026-12-01', status: 'active' },
  { id: 'cgr_02', party: 'Nordic Retail Co', purpose: 'CRM suppression sync', expires: '2026-06-15', status: 'active' },
];

export default function VaultGrantsPage() {
  return (
    <AppShell role="consumer" title="Active grants">
      <p className="mb-6 text-sm text-baltic-900/70">
        Every purpose-bound grant you have issued. Revoke in one tap — activation must honour withdrawal within SLA.
      </p>
      <ul className="space-y-4">
        {GRANTS.map((g) => (
          <li key={g.id} className="flex flex-wrap items-center justify-between gap-3 border-b border-baltic-900/10 pb-4">
            <div>
              <p className="font-medium">{g.party}</p>
              <p className="text-sm text-baltic-900/65">{g.purpose} · expires {g.expires}</p>
            </div>
            <div className="flex items-center gap-2">
              <StatusPill tone="signal">Live</StatusPill>
              <GhostButton>Revoke</GhostButton>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap gap-2">
        <PrimaryButton>Download data pack</PrimaryButton>
        <GhostButton>Request access</GhostButton>
        <GhostButton>Request erasure</GhostButton>
      </div>
    </AppShell>
  );
}
