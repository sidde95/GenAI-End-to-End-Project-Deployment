// TODO: Budget module is reserved for user implementation
// Implement: GET /budgets, POST /budgets, budget utilization display

export default function BudgetsPage() {
  return (
    <div>
      <h2>Budgets</h2>

      {/* TODO: Budget module is reserved for user implementation */}
      {/* Implement: GET /budgets, POST /budgets, budget utilization display */}

      <div
        style={{
          marginTop: '2rem',
          padding: '2rem',
          border: '2px dashed #cbd5e1',
          borderRadius: '8px',
          textAlign: 'center',
          color: '#64748b',
        }}
      >
        <p style={{ fontSize: '1.25rem', fontWeight: 600 }}>
          Budget module coming soon — this feature is reserved for your implementation.
        </p>
        <p style={{ marginTop: '0.75rem' }}>
          Suggested endpoints to implement:
        </p>
        {/* TODO: implement the list below once backend /budgets routes are ready */}
        <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.5rem' }}>
          <li><code>GET /budgets</code> — list all budgets</li>
          <li><code>POST /budgets</code> — create a budget</li>
          <li><code>PUT /budgets/:id</code> — update a budget</li>
          <li><code>DELETE /budgets/:id</code> — remove a budget</li>
        </ul>
      </div>
    </div>
  );
}
