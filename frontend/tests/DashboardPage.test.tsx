import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { AuthProvider } from '../src/context/AuthContext';
import DashboardPage from '../src/pages/DashboardPage';

vi.mock('../src/api/dashboard', () => ({
  getDashboardSummary: vi.fn(() =>
    Promise.resolve({
      data: {
        data: {
          total_income: 5000,
          total_expenses: 3000,
          net_worth: 20000,
          period: '2024-01',
        },
      },
    }),
  ),
}));

describe('DashboardPage', () => {
  it('renders the dashboard heading', async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <DashboardPage />
        </AuthProvider>
      </MemoryRouter>,
    );
    expect(await screen.findByRole('heading', { name: /dashboard/i })).toBeInTheDocument();
  });

  it('shows income, expenses and net worth after loading', async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <DashboardPage />
        </AuthProvider>
      </MemoryRouter>,
    );
    expect(await screen.findByText(/total income/i)).toBeInTheDocument();
    expect(screen.getByText(/total expenses/i)).toBeInTheDocument();
    expect(screen.getByText(/net worth/i)).toBeInTheDocument();
  });
});
