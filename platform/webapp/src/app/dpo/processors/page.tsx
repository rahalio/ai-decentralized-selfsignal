import { AppShell } from '@/components/app-shell';
import { StatusPill } from '@/components/ui';

export default function ProcessorsPage() {
  return (
    <AppShell role="dpo" title="Processor / controller map">
      <table className="w-full text-left text-sm">
        <thead className="text-baltic-900/50">
          <tr>
            <th className="pb-2 font-medium">Party</th>
            <th className="pb-2 font-medium">Role</th>
            <th className="pb-2 font-medium">DPA</th>
            <th className="pb-2 font-medium">Gaps</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['Baltic News Network', 'controller', 'on file', '—'],
            ['Edge Bidstream LLC', 'processor', 'missing', 'missingDpa'],
          ].map((row) => (
            <tr key={row[0]} className="border-t border-baltic-900/10">
              <td className="py-3">{row[0]}</td>
              <td>{row[1]}</td>
              <td>{row[2]}</td>
              <td>{row[3] === '—' ? '—' : <StatusPill tone="statute">{row[3]}</StatusPill>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AppShell>
  );
}
