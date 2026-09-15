'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { clsx } from 'clsx';

export type ConsoleRole = 'consumer' | 'publisher' | 'brand' | 'dpo';

const NAV: Record<ConsoleRole, Array<{ href: string; label: string }>> = {
  consumer: [
    { href: '/vault', label: 'Active grants' },
    { href: '/vault/profile', label: 'Profile' },
    { href: '/vault/rights', label: 'My rights' },
  ],
  publisher: [
    { href: '/publisher', label: 'Yield' },
    { href: '/publisher/activation', label: 'Activation' },
    { href: '/publisher/integrations', label: 'Integrations' },
  ],
  brand: [
    { href: '/brand', label: 'Campaigns' },
    { href: '/brand/audiences', label: 'Audiences' },
    { href: '/brand/coverage', label: 'Coverage' },
  ],
  dpo: [
    { href: '/dpo', label: 'Rights desk' },
    { href: '/dpo/complaints', label: 'Complaints' },
    { href: '/dpo/processors', label: 'Processor map' },
    { href: '/dpo/audit', label: 'Audit export' },
  ],
};

export function AppShell({
  role,
  title,
  children,
}: {
  role: ConsoleRole;
  title: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const links = NAV[role];

  return (
    <div className="min-h-screen">
      <header className="border-b border-paper/10 bg-baltic-900/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <Link href="/" className="font-display text-2xl font-semibold tracking-tight text-paper">
            Selfsignal
          </Link>
          <nav className="flex flex-wrap items-center gap-1 text-sm">
            {(Object.keys(NAV) as ConsoleRole[]).map((r) => (
              <Link
                key={r}
                href={NAV[r][0].href}
                className={clsx(
                  'rounded-sm px-2.5 py-1 capitalize',
                  role === r ? 'bg-seal text-paper' : 'text-paper/70 hover:bg-paper/10'
                )}
              >
                {r}
              </Link>
            ))}
            <Link href="/login" className="ml-2 text-paper/60 hover:text-paper">
              Sign in
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-8 lg:grid-cols-[200px_1fr]">
        <aside className="space-y-1">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-paper/50">{role}</p>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                'block rounded-sm px-3 py-2 text-sm',
                pathname === link.href
                  ? 'bg-paper/15 text-paper'
                  : 'text-paper/70 hover:bg-paper/10 hover:text-paper'
              )}
            >
              {link.label}
            </Link>
          ))}
        </aside>

        <section>
          <div className="mb-6 flex items-end justify-between gap-4 border-b border-paper/10 pb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-seal">Selfsignal</p>
              <h1 className="font-display text-3xl font-semibold text-paper">{title}</h1>
            </div>
            <span className="h-8 w-8 rounded-full border-2 border-seal bg-seal/30" title="Brand seal" />
          </div>
          <div className="rounded-sm bg-paper p-6 text-baltic-900 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
            {children}
          </div>
        </section>
      </div>
    </div>
  );
}
