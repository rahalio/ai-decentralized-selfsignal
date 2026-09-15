import { AppShell } from '@/components/app-shell';
import { GhostButton, StatusPill } from '@/components/ui';

export default function VaultRightsPage() {
  return (
    <AppShell role="consumer" title="My rights">
      <ul className="space-y-3">
        {[
          ['Access', 'open', 'Due in 18 days'],
          ['Portability', 'fulfilled', 'Pack ready'],
        ].map(([type, status, due]) => (
          <li key={type} className="flex items-center justify-between border-b border-baltic-900/10 pb-3">
            <div>
              <p className="font-medium">{type}</p>
              <p className="text-sm text-baltic-900/60">{due}</p>
            </div>
            <StatusPill tone={status === 'fulfilled' ? 'signal' : 'amber'}>{status}</StatusPill>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex gap-2">
        <GhostButton>New access request</GhostButton>
        <GhostButton>New erasure request</GhostButton>
      </div>
    </AppShell>
  );
}
