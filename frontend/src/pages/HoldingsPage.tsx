import { useEffect, useState } from 'react';
import { getHoldings } from '../api/holdings';
import type { Holding } from '../types';
import axios from 'axios';

export default function HoldingsPage() {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getHoldings()
      .then((res) => setHoldings(res.data.data))
      .catch((err: unknown) => {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.error?.message ?? 'Failed to load holdings');
        } else {
          setError('Failed to load holdings');
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading holdings…</p>;
  if (error) return <p style={{ color: '#dc2626' }}>{error}</p>;

  const totalValue = holdings.reduce((sum, h) => sum + h.quantity * h.current_price, 0);
  const totalCost = holdings.reduce((sum, h) => sum + h.quantity * h.cost_basis, 0);
  const totalGain = totalValue - totalCost;

  return (
    <div>
      <h2>Portfolio Holdings</h2>
      <div style={{ display: 'flex', gap: '1.5rem', margin: '1rem 0', flexWrap: 'wrap' }}>
        <div style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
          <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Total Value</div>
          <div style={{ fontWeight: 700, fontSize: '1.5rem' }}>${totalValue.toFixed(2)}</div>
        </div>
        <div style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
          <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Total Cost</div>
          <div style={{ fontWeight: 700, fontSize: '1.5rem' }}>${totalCost.toFixed(2)}</div>
        </div>
        <div style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
          <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Total Gain/Loss</div>
          <div style={{ fontWeight: 700, fontSize: '1.5rem', color: totalGain >= 0 ? '#16a34a' : '#dc2626' }}>
            {totalGain >= 0 ? '+' : ''}${totalGain.toFixed(2)}
          </div>
        </div>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            {['Symbol', 'Name', 'Quantity', 'Cost Basis', 'Current Price', 'Market Value', 'Gain/Loss'].map((h) => (
              <th key={h} style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {holdings.length === 0 && (
            <tr><td colSpan={7} style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>No holdings yet.</td></tr>
          )}
          {holdings.map((h) => {
            const marketValue = h.quantity * h.current_price;
            const gain = marketValue - h.quantity * h.cost_basis;
            return (
              <tr key={h.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '0.75rem', fontWeight: 600 }}>{h.symbol}</td>
                <td style={{ padding: '0.75rem' }}>{h.name}</td>
                <td style={{ padding: '0.75rem' }}>{h.quantity}</td>
                <td style={{ padding: '0.75rem' }}>${h.cost_basis.toFixed(2)}</td>
                <td style={{ padding: '0.75rem' }}>${h.current_price.toFixed(2)}</td>
                <td style={{ padding: '0.75rem' }}>${marketValue.toFixed(2)}</td>
                <td style={{ padding: '0.75rem', color: gain >= 0 ? '#16a34a' : '#dc2626' }}>
                  {gain >= 0 ? '+' : ''}${gain.toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
