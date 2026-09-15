import { AppShell } from '@/components/app-shell';
import { GhostButton, PrimaryButton, StatusPill } from '@/components/ui';
import Link from 'next/link';

export default function AuditExportPage() {
  return (
    <AppShell role="dpo" title="Audit export">
      <div className="space-y-4">
        <label className="block text-sm">
          Period start
          <input type="date" className="mt-1 w-full rounded-sm border border-baltic-900/15 px-3 py-2" defaultValue="2026-01-01" />
        </label>
        <label className="block text-sm">
          Period end
          <input type="date" className="mt-1 w-full rounded-sm border border-baltic-900/15 px-3 py-2" defaultValue="2026-03-31" />
        </label>
        <ul className="space-y-2 text-sm">
          {['Consent grants ledger', 'Rights fulfilment evidence', 'Complaint correspondence'].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <StatusPill tone="signal">ready</StatusPill> {item}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2">
          <PrimaryButton>Create pack</PrimaryButton>
          <GhostButton>Verify hash</GhostButton>
          <Link href="/public/attestations/aud_demo" className="text-sm text-seal underline self-center">
            Public attestation
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
