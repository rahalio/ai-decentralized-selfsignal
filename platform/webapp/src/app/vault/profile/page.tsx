import { AppShell } from '@/components/app-shell';
import { PrimaryButton } from '@/components/ui';

export default function VaultProfilePage() {
  return (
    <AppShell role="consumer" title="Profile">
      <div className="space-y-4">
        <label className="block text-sm">
          Display handle
          <input className="mt-1 w-full rounded-sm border border-baltic-900/15 px-3 py-2" defaultValue="signal.keeper" />
        </label>
        <label className="block text-sm">
          Locale
          <input className="mt-1 w-full rounded-sm border border-baltic-900/15 px-3 py-2" defaultValue="en-IE" />
        </label>
        <p className="text-sm text-baltic-900/65">Child / special-category flags hard-block behavioural activation.</p>
        <PrimaryButton>Save profile</PrimaryButton>
      </div>
    </AppShell>
  );
}
