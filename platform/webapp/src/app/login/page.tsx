'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth, type OperatorRole } from '@/contexts/auth-context';
import { PrimaryButton } from '@/components/ui';

const HOMES: Record<OperatorRole, string> = {
  consumer: '/vault',
  publisher: '/publisher',
  brand: '/brand',
  dpo: '/dpo',
  auditor: '/dpo/audit',
};

export default function LoginPage() {
  const { role, setRole, email, setEmail } = useAuth();
  const router = useRouter();

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-6 px-6">
      <div>
        <p className="font-display text-4xl font-semibold text-paper">Selfsignal</p>
        <p className="mt-2 text-paper/75">Sign in to the consent rail console.</p>
      </div>
      <label className="block text-sm text-paper/80">
        Email
        <input
          className="mt-1 w-full rounded-sm border border-paper/20 bg-paper px-3 py-2 text-baltic-900"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className="block text-sm text-paper/80">
        Role
        <select
          className="mt-1 w-full rounded-sm border border-paper/20 bg-paper px-3 py-2 text-baltic-900"
          value={role}
          onChange={(e) => setRole(e.target.value as OperatorRole)}
        >
          <option value="consumer">Consumer</option>
          <option value="publisher">Publisher</option>
          <option value="brand">Brand</option>
          <option value="dpo">DPO</option>
          <option value="auditor">Auditor</option>
        </select>
      </label>
      <PrimaryButton onClick={() => router.push(HOMES[role])}>Continue</PrimaryButton>
      <Link href="/" className="text-sm text-paper/60 hover:text-paper">
        Back
      </Link>
    </main>
  );
}
