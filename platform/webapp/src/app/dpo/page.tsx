import { AppShell } from '@/components/app-shell';
import { GhostButton, StatusPill } from '@/components/ui';

export default function DpoRightsPage() {
  return (
    <AppShell role="dpo" title="Rights request desk">
      <ul className="space-y-3">
        {[
          ['Access', 'vpf_demo', 'Due 4d', 'open'],
          ['Erasure', 'vpf_demo2', 'Overdue', 'inProgress'],
          ['Portability', 'vpf_demo3', 'Due 12d', 'open'],
        ].map(([type, person, due, status]) => (
          <li key={type + person} className="flex flex-wrap items-center justify-between gap-2 border-b border-baltic-900/10 pb-3">
            <div>
              <p className="font-medium">{type} · {person}</p>
              <p className={`text-sm ${due === 'Overdue' ? 'text-statute' : 'text-baltic-900/60'}`}>{due}</p>
            </div>
            <StatusPill tone={due === 'Overdue' ? 'statute' : 'amber'}>{status}</StatusPill>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex gap-2">
        <GhostButton>Fulfil selected</GhostButton>
        <GhostButton>Export evidence pack</GhostButton>
      </div>
    </AppShell>
  );
}
