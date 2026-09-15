import { AppShell } from '@/components/app-shell';
import { StatusPill } from '@/components/ui';

export default function BrandAudiencesPage() {
  return (
    <AppShell role="brand" title="Purpose audiences">
      <ul className="space-y-4">
        {[
          ['Travel intent — Q2', 'Interest ads', '12.1k', '92% deterministic'],
          ['Homebuyers soft', 'CRM sync', '4.6k', '61% probabilistic'],
        ].map(([name, purpose, count, mix]) => (
          <li key={name} className="border-b border-baltic-900/10 pb-4">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-medium">{name}</p>
              <StatusPill>{purpose}</StatusPill>
            </div>
            <p className="mt-1 text-sm text-baltic-900/65">{count} members · {mix}</p>
          </li>
        ))}
      </ul>
    </AppShell>
  );
}
