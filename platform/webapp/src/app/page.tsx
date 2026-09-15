import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-6 px-6 py-16">
      <p className="font-display text-5xl font-semibold tracking-tight text-paper">Selfsignal</p>
      <p className="max-w-xl text-lg text-paper/80">
        Consent rail and personal vault. Publishers and brands only see purpose-lit lanes that are
        currently granted.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/login"
          className="rounded-sm bg-seal px-4 py-2 text-sm font-medium text-paper hover:opacity-90"
        >
          Sign in
        </Link>
        <Link
          href="/vault"
          className="rounded-sm border border-paper/30 px-4 py-2 text-sm font-medium text-paper hover:bg-paper/10"
        >
          Consumer vault
        </Link>
        <Link
          href="/publisher"
          className="rounded-sm border border-paper/30 px-4 py-2 text-sm font-medium text-paper hover:bg-paper/10"
        >
          Publisher
        </Link>
        <Link
          href="/brand"
          className="rounded-sm border border-paper/30 px-4 py-2 text-sm font-medium text-paper hover:bg-paper/10"
        >
          Brand
        </Link>
        <Link
          href="/dpo"
          className="rounded-sm border border-paper/30 px-4 py-2 text-sm font-medium text-paper hover:bg-paper/10"
        >
          DPO desk
        </Link>
      </div>
    </main>
  );
}
