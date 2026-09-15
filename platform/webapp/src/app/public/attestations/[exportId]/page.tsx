export default function PublicAttestationPage({ params }: { params: { exportId: string } }) {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center gap-4 px-6 py-16">
      <p className="font-display text-4xl font-semibold text-paper">Selfsignal</p>
      <h1 className="text-xl text-paper/90">Consent artefact attestation</h1>
      <div className="rounded-sm bg-paper p-6 text-baltic-900">
        <p className="text-sm text-baltic-900/60">Export</p>
        <p className="font-mono text-sm">{params.exportId}</p>
        <p className="mt-4 text-sm">Pack hash</p>
        <p className="font-mono text-xs break-all">sha256:demo-attestation-hash-not-for-production</p>
        <p className="mt-4 text-sm text-signal">Verified read-only public artefact</p>
      </div>
    </main>
  );
}
