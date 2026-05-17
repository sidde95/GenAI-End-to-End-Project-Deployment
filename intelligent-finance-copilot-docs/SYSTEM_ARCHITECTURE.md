# System Architecture

## Architecture Style
- Layered, service-oriented web architecture
- Frontend and backend separated by REST API boundary

## Major Components
1. **Web Client**
   - Authentication UI
   - Transaction, budget, portfolio modules
   - Dashboard and reporting views

2. **API Service**
   - Auth module
   - Transaction module
   - Budget module
   - Portfolio module
   - Reporting module

3. **Data Layer**
   - Relational database for structured finance data

4. **Optional Integrations**
   - Asset price provider
   - Notification provider

## Data Flow (High-Level)
1. User authenticates via web client
2. Client calls protected API endpoints
3. API validates token and request payload
4. Business logic executes and persists data
5. Dashboard/report endpoints aggregate and return summaries

## Design Principles
- Explicit domain boundaries
- Validation at API edge
- Calculation logic centralized in domain services
- Read models optimized for dashboards

## Failure Handling
- Standardized error responses
- Input validation failures handled early
- Graceful degradation for optional external providers
