# Risks and Mitigations

## Risk 1: Incorrect Financial Calculations
- **Impact:** Loss of user trust
- **Mitigation:** Deterministic math utilities, high-coverage tests, peer review

## Risk 2: Sensitive Data Exposure
- **Impact:** Security incident
- **Mitigation:** Strong auth controls, encryption, secrets management, secure logging

## Risk 3: External Price Provider Instability
- **Impact:** Stale portfolio valuation
- **Mitigation:** Caching, fallback to last known values, provider abstraction

## Risk 4: Scope Creep
- **Impact:** Reduced delivery quality
- **Mitigation:** Enforce scope document and change governance

## Risk 5: Deployment Misconfiguration
- **Impact:** Service outage
- **Mitigation:** Environment parity, health checks, rollback automation

## Risk 6: Data Integrity Issues
- **Impact:** Corrupted financial records
- **Mitigation:** Transactional DB operations, constraints, migration discipline
