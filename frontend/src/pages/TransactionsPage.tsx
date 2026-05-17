import { useEffect, useState, FormEvent } from 'react';
import { getTransactions, createTransaction } from '../api/transactions';
import { getCategories } from '../api/categories';
import type { Transaction, Category } from '../types';
import axios from 'axios';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    category_id: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    type: 'expense' as 'income' | 'expense',
  });

  const load = () => {
    setLoading(true);
    Promise.all([getTransactions(), getCategories()])
      .then(([txRes, catRes]) => {
        setTransactions(txRes.data.data);
        setCategories(catRes.data.data);
      })
      .catch((err: unknown) => {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.error?.message ?? 'Failed to load');
        } else {
          setError('Failed to load transactions');
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createTransaction({
        ...formData,
        amount: parseFloat(formData.amount),
      });
      setShowForm(false);
      setFormData({ category_id: '', amount: '', description: '', date: new Date().toISOString().split('T')[0], type: 'expense' });
      load();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error?.message ?? 'Failed to create transaction');
      } else {
        setError('Failed to create transaction');
      }
    }
  };

  if (loading) return <p>Loading transactions…</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Transactions</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{ padding: '0.5rem 1rem', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          {showForm ? 'Cancel' : 'Add Transaction'}
        </button>
      </div>
      {error && <p style={{ color: '#dc2626' }}>{error}</p>}

      {showForm && (
        <form onSubmit={handleSubmit} style={{ margin: '1rem 0', padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            <div>
              <label htmlFor="type">Type</label>
              <select id="type" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value as 'income' | 'expense' })} style={{ width: '100%', padding: '0.4rem' }}>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <div>
              <label htmlFor="category">Category</label>
              <select id="category" value={formData.category_id} onChange={(e) => setFormData({ ...formData, category_id: e.target.value })} style={{ width: '100%', padding: '0.4rem' }}>
                <option value="">Select…</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="amount">Amount</label>
              <input id="amount" type="number" step="0.01" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} required style={{ width: '100%', padding: '0.4rem' }} />
            </div>
            <div>
              <label htmlFor="date">Date</label>
              <input id="date" type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required style={{ width: '100%', padding: '0.4rem' }} />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <input id="description" type="text" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required style={{ width: '100%', padding: '0.4rem' }} />
            </div>
          </div>
          <button type="submit" style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: '#22c55e', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Save
          </button>
        </form>
      )}

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Date</th>
            <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Description</th>
            <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Category</th>
            <th style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e2e8f0' }}>Amount</th>
            <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Type</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 && (
            <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>No transactions yet.</td></tr>
          )}
          {transactions.map((tx) => (
            <tr key={tx.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '0.75rem' }}>{tx.date}</td>
              <td style={{ padding: '0.75rem' }}>{tx.description}</td>
              <td style={{ padding: '0.75rem' }}>{tx.category?.name ?? tx.category_id}</td>
              <td style={{ padding: '0.75rem', textAlign: 'right', color: tx.type === 'income' ? '#16a34a' : '#dc2626' }}>
                {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
              </td>
              <td style={{ padding: '0.75rem' }}>{tx.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
