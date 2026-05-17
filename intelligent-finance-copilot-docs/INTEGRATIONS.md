# Integrations

## Optional External Integrations

## 1. Asset Price Data Provider
Purpose:
- Refresh market prices for supported holdings (e.g., equities, crypto)

Requirements:
- Provider abstraction interface
- Retry policy with circuit-breaker style behavior
- Cache recent responses to reduce provider load

Failure Strategy:
- Preserve last known value when refresh fails
- Expose refresh status to user interface

## 2. Notification Provider
Purpose:
- Deliver budget-threshold or system notifications

Requirements:
- Channel abstraction (email/in-app/webhook)
- Idempotent dispatch behavior

Failure Strategy:
- Queue and retry transient failures
- Dead-letter handling for repeated failures

## 3. File Export Storage (Optional)
Purpose:
- Store generated report exports

Requirements:
- Secure object storage integration
- Signed URL access controls

Failure Strategy:
- Fallback to direct streamed download where possible
