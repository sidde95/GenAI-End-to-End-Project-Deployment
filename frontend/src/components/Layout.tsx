import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  padding: '0.75rem 1.5rem',
  background: '#1e293b',
  color: '#f1f5f9',
};

const linkStyle: React.CSSProperties = {
  color: '#94a3b8',
  textDecoration: 'none',
  padding: '0.25rem 0.5rem',
  borderRadius: '4px',
};

const activeLinkStyle: React.CSSProperties = {
  ...linkStyle,
  color: '#f1f5f9',
  background: '#334155',
};

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <nav style={navStyle}>
        <span style={{ fontWeight: 700, marginRight: '1rem', color: '#38bdf8' }}>
          Finance Copilot
        </span>
        {(['dashboard', 'transactions', 'holdings', 'reports', 'budgets'] as const).map(
          (path) => (
            <NavLink
              key={path}
              to={`/${path}`}
              style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
            >
              {path.charAt(0).toUpperCase() + path.slice(1)}
            </NavLink>
          ),
        )}
        <span style={{ marginLeft: 'auto', fontSize: '0.875rem', color: '#94a3b8' }}>
          {user?.email}
        </span>
        <button
          onClick={handleLogout}
          style={{
            background: '#ef4444',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            padding: '0.25rem 0.75rem',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </nav>
      <main style={{ flex: 1, padding: '1.5rem' }}>
        <Outlet />
      </main>
    </div>
  );
}
