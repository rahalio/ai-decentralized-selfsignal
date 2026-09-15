import { AppShell } from '@/components/app-shell';
import { GhostButton, Metric, PrimaryButton, StatusPill } from '@/components/ui';

export default function BrandCampaignsPage() {
  return (
    <AppShell role="brand" title="Campaign compliance gate">
      <div className="mb-6 rounded-sm border border-statute/30 bg-statute/5 p-4">
        <StatusPill tone="statute">Hard block</StatusPill>
        <p className="mt-2 text-sm">Campaign “Spring intent” lacks valid grants for purpose Interest ads. Selfsignal segments cannot launch.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <Metric label="Fine-risk score" value="72" tone="amber" />
        <Metric label="Granted audience" value="18.4k" />
        <Metric label="Expired grants" value="312" tone="statute" />
      </div>
      <div className="mt-6 flex gap-2">
        <PrimaryButton disabled>Launch</PrimaryButton>
        <GhostButton>Fix purpose</GhostButton>
      </div>
    </AppShell>
  );
}
