# Decisions Log

## ADR-001: Use REST API Boundary
- **Decision:** Frontend and backend communicate through versioned REST endpoints.
- **Rationale:** Broad tooling support and predictable client contracts.

## ADR-002: Relational Database for Core Ledger Data
- **Decision:** Persist financial records in relational schema.
- **Rationale:** Strong integrity constraints and query flexibility.

## ADR-003: Token-Based Authentication
- **Decision:** Use token auth for API access.
- **Rationale:** Stateless scalability and common web interoperability.

## ADR-004: Manual-first Data Entry
- **Decision:** Prioritize manual transaction/portfolio input.
- **Rationale:** Lower integration complexity and faster reliability.

## ADR-005: Modular Domain Services
- **Decision:** Separate services for transactions, budgets, portfolio, reports.
- **Rationale:** Maintainability and easier testing.
