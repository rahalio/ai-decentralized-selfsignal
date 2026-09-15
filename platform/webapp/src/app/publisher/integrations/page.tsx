import { AppShell } from '@/components/app-shell';
import { GhostButton, StatusPill } from '@/components/ui';

export default function PublisherIntegrationsPage() {
  return (
    <AppShell role="publisher" title="Integrations">
      <ul className="space-y-3">
        {[
          ['Ad server — Prebid edge', 'processor', 'active'],
          ['CMP handoff', 'processor', 'active'],
        ].map(([name, role, status]) => (
          <li key={name} className="flex items-center justify-between border-b border-baltic-900/10 pb-3">
            <div>
              <p className="font-medium">{name}</p>
              <p className="text-sm text-baltic-900/60">{role}</p>
            </div>
            <StatusPill tone="signal">{status}</StatusPill>
          </li>
        ))}
      </ul>
      <GhostButton className="mt-6">Register integration</GhostButton>
    </AppShell>
  );
}
