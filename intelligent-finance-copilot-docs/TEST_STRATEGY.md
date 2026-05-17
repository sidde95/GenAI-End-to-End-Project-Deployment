# Test Strategy

## Test Layers

## 1. Unit Tests
- Domain calculations (budget utilization, net worth, gains/losses)
- Validation and utility helpers

## 2. Integration Tests
- API + database interaction
- Authentication flow and protected route access
- Budget and transaction consistency checks

## 3. End-to-End Tests
- User sign up/login
- Add transactions and categories
- Set budget and verify utilization
- Add holdings and view dashboard

## 4. Contract Tests
- Verify API response shape stability
- Ensure backward compatibility for key endpoints

## 5. Non-Functional Tests
- Basic load profiling on key endpoints
- Security checks (auth, access control, injection resistance)

## Exit Expectations
- Critical path tests passing
- No unresolved high-severity defects
- Deterministic results for financial calculations
