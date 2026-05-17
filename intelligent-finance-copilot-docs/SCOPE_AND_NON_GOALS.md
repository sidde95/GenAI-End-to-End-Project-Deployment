# Scope and Non-Goals

## Scope

### Functional Scope
- User authentication and session management
- Income/expense transaction recording
- Category-based budgeting
- Portfolio holding management
- Net worth and dashboard visualization
- Monthly summaries and reports

### Technical Scope
- Web frontend
- REST API backend
- Relational persistence layer
- Deployment-ready configuration
- CI/CD automation hooks

## Non-Goals
- Automated financial account aggregation from institutions
- Broker integration for direct order placement
- Multi-tenant enterprise accounting
- AI-generated investment recommendations with fiduciary claims
- Tax optimization engine

## Scope Boundaries
- Data is user-provided unless external price refresh is explicitly configured
- Recommendations are informational, not advisory
- Reporting is operational/personal, not statutory-compliance output

## Change Control Principles
- Any net-new feature must map to a defined user problem
- Features increasing compliance burden require explicit review
- Production complexity must be justified by user value
