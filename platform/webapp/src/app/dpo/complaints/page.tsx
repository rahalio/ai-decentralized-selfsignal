import { AppShell } from '@/components/app-shell';
import { GhostButton, StatusPill } from '@/components/ui';

export default function ComplaintsPage() {
  return (
    <AppShell role="dpo" title="Complaint cases">
      <ul className="space-y-3">
        <li className="border-b border-baltic-900/10 pb-3">
          <div className="flex items-center justify-between">
            <p className="font-medium">Unlawful retargeting claim</p>
            <StatusPill tone="amber">escalated</StatusPill>
          </div>
          <p className="mt-1 text-sm text-baltic-900/65">Linked grants: 2 · activations: 5 · authority ref pending</p>
        </li>
      </ul>
      <GhostButton className="mt-6">Open case</GhostButton>
    </AppShell>
  );
}
