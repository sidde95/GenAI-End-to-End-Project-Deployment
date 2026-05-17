# API Specification

## Base Path
`/api/v1`

## Authentication

### POST `/auth/register`
Create user account.

### POST `/auth/login`
Authenticate user and return access token.

### POST `/auth/logout`
Invalidate current session/token.

## Profile

### GET `/profile`
Return authenticated user profile.

### PATCH `/profile`
Update profile attributes.

## Categories

### GET `/categories`
List categories.

### POST `/categories`
Create custom category.

### PATCH `/categories/{id}`
Update category.

### DELETE `/categories/{id}`
Delete category if unused or allowed by policy.

## Transactions

### GET `/transactions`
Query params: `from`, `to`, `type`, `categoryId`, `page`, `pageSize`

### POST `/transactions`
Create transaction.

### PATCH `/transactions/{id}`
Update transaction.

### DELETE `/transactions/{id}`
Delete transaction.

## Budgets

### GET `/budgets?period=YYYY-MM`
List budgets for period.

### POST `/budgets`
Create or upsert budget for category + period.

### PATCH `/budgets/{id}`
Update budget.

### DELETE `/budgets/{id}`
Delete budget.

## Portfolio

### GET `/holdings`
List holdings.

### POST `/holdings`
Create holding.

### PATCH `/holdings/{id}`
Update holding.

### DELETE `/holdings/{id}`
Delete holding.

### POST `/holdings/refresh-prices`
Refresh prices for supported symbols.

## Dashboard & Reports

### GET `/dashboard/summary?period=YYYY-MM`
Return key finance summary cards and charts.

### GET `/reports/monthly?period=YYYY-MM`
Return monthly report payload.

### GET `/reports/export?period=YYYY-MM&format=csv`
Export report data.

## Error Contract
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Readable explanation",
    "details": []
  }
}
```
