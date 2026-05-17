import { useEffect, useState } from 'react';
import { getMonthlyReport } from '../api/reports';
import type { MonthlyReport } from '../types';
import axios from 'axios';

export default function ReportsPage() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [report, setReport] = useState<MonthlyReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getMonthlyReport(year, month)
      .then((res) => setReport(res.data.data))
      .catch((err: unknown) => {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.error?.message ?? 'Failed to load report');
        } else {
          setError('Failed to load report');
        }
      })
      .finally(() => setLoading(false));
  }, [year, month]);

  return (
    <div>
      <h2>Reports</h2>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <label htmlFor="year" style={{ marginRight: '0.5rem' }}>Year:</label>
          <select id="year" value={year} onChange={(e) => setYear(Number(e.target.value))} style={{ padding: '0.4rem' }}>
            {[now.getFullYear() - 2, now.getFullYear() - 1, now.getFullYear()].map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="month" style={{ marginRight: '0.5rem' }}>Month:</label>
          <select id="month" value={month} onChange={(e) => setMonth(Number(e.target.value))} style={{ padding: '0.4rem' }}>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <option key={m} value={m}>{new Date(2000, m - 1).toLocaleString('default', { month: 'long' })}</option>
            ))}
          </select>
        </div>
      </div>

      {loading && <p>Loading report…</p>}
      {error && <p style={{ color: '#dc2626' }}>{error}</p>}

      {report && !loading && (
        <div>
          <h3>{report.month}</h3>
          <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Income</div>
              <div style={{ fontWeight: 700, color: '#16a34a' }}>${report.income.toFixed(2)}</div>
            </div>
            <div style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Expenses</div>
              <div style={{ fontWeight: 700, color: '#dc2626' }}>${report.expenses.toFixed(2)}</div>
            </div>
            <div style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Net</div>
              <div style={{ fontWeight: 700, color: report.net >= 0 ? '#16a34a' : '#dc2626' }}>
                {report.net >= 0 ? '+' : ''}${report.net.toFixed(2)}
              </div>
            </div>
          </div>

          {report.categories.length > 0 && (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f1f5f9' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Category</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Type</th>
                  <th style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e2e8f0' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {report.categories.map((c, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '0.75rem' }}>{c.category}</td>
                    <td style={{ padding: '0.75rem' }}>{c.type}</td>
                    <td style={{ padding: '0.75rem', textAlign: 'right', color: c.type === 'income' ? '#16a34a' : '#dc2626' }}>
                      ${c.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
