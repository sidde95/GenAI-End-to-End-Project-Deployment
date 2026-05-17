# Runbook

## 1. Service Health Verification
- Check frontend availability endpoint
- Check backend health endpoint
- Verify database connectivity metrics

## 2. Common Incident: API Error Spike
- Validate recent deployment status
- Inspect error logs and top failing routes
- Roll back to last healthy artifact if required

## 3. Common Incident: Login Failures
- Check auth service and token configuration
- Confirm secret/key configuration validity
- Review rate-limit and lockout metrics

## 4. Common Incident: Dashboard Data Mismatch
- Validate aggregation queries
- Recompute summary for affected user(s)
- Inspect recent schema or logic changes

## 5. Common Incident: Price Refresh Failure
- Check external provider status
- Confirm API credentials and quotas
- Trigger fallback mode and notify users of stale values

## 6. Backup and Recovery
- Verify backup completion status
- Test restore in isolated environment
- Document recovery outcomes

## 7. Escalation
- Escalate security incidents immediately
- Escalate persistent data integrity issues to engineering lead
