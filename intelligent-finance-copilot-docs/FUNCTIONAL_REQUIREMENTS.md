# Functional Requirements

## FR-001 Authentication
- System shall support user registration with unique email.
- System shall support secure login and token issuance.
- System shall support session/token invalidation.

## FR-002 User Profile
- System shall store and retrieve profile metadata.
- System shall allow profile updates.

## FR-003 Transaction Management
- System shall create income and expense transactions.
- System shall support update and delete operations.
- System shall support transaction filtering by date, type, and category.

## FR-004 Category Management
- System shall provide default categories.
- System shall allow custom categories per user.

## FR-005 Budget Management
- System shall allow monthly budget creation by category.
- System shall calculate spent amount versus budget limit.
- System shall mark budget states (within limit, near limit, over limit).

## FR-006 Portfolio Management
- System shall support creating, editing, and deleting holdings.
- System shall compute current value, cost basis, and unrealized gain/loss.
- System shall support asset classification (stock, crypto, fund, cash, other).

## FR-007 Dashboard
- System shall display total income, total expense, and net value.
- System shall display net-worth summary.
- System shall display category spend breakdown.
- System shall display portfolio allocation.

## FR-008 Reporting
- System shall generate period summaries.
- System shall provide downloadable report data in CSV format.

## FR-009 Auditability
- System shall maintain created/updated metadata for key entities.

## FR-010 API Behavior
- System shall provide REST endpoints with consistent request/response contracts.
- System shall return standardized error payloads.
