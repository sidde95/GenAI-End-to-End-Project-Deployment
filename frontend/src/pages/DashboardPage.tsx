import { useEffect, useState } from 'react';
import { getDashboardSummary } from '../api/dashboard';
import type { DashboardSummary } from '../types';
import axios from 'axios';

const cardStyle: React.CSSProperties = {
  padding: '1.5rem',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  minWidth: '180px',
  textAlign: 'center',
};

export default function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getDashboardSummary()
      .then((res) => setSummary(res.data.data))
      .catch((err: unknown) => {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.error?.message ?? 'Failed to load dashboard');
        } else {
          setError('Failed to load dashboard');
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading dashboard…</p>;
  if (error) return <p style={{ color: '#dc2626' }}>{error}</p>;

  return (
    <div>
      <h2>Dashboard</h2>
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
        <div style={{ ...cardStyle, borderTop: '4px solid #22c55e' }}>
          <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Total Income</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#16a34a' }}>
            ${summary?.total_income.toFixed(2)}
          </div>
        </div>
        <div style={{ ...cardStyle, borderTop: '4px solid #ef4444' }}>
          <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Total Expenses</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#dc2626' }}>
            ${summary?.total_expenses.toFixed(2)}
          </div>
        </div>
        <div style={{ ...cardStyle, borderTop: '4px solid #3b82f6' }}>
          <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Net Worth</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#2563eb' }}>
            ${summary?.net_worth.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}
