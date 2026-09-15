import { AppShell } from '@/components/app-shell';
import { Metric, PrimaryButton } from '@/components/ui';
import Link from 'next/link';

export default function PublisherHomePage() {
  return (
    <AppShell role="publisher" title="Yield vs contextual">
      <div className="grid gap-6 sm:grid-cols-2">
        <Metric label="Consented RPM" value="€4.82" hint="Purpose-granted inventory" tone="signal" />
        <Metric label="Contextual RPM" value="€3.10" hint="Baseline without Selfsignal" />
        <Metric label="Coverage" value="67%" hint="Inventory with valid purpose grant" />
        <Metric label="Withdrawal p50" value="840ms" hint="Propagation SLA target 2s" tone="signal" />
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/publisher/activation" className="rounded-sm bg-seal px-3 py-2 text-sm font-medium text-paper">Activation health</Link>
        <Link href="/publisher/integrations" className="text-sm text-seal underline">Integrations</Link>
      </div>
    </AppShell>
  );
}
