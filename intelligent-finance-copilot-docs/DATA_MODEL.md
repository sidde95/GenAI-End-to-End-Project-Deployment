# Data Model

## Entities

## User
- id (UUID)
- email (unique)
- password_hash
- full_name
- created_at
- updated_at

## Category
- id (UUID)
- user_id (FK User)
- name
- type (income|expense)
- is_default
- created_at
- updated_at

## Transaction
- id (UUID)
- user_id (FK User)
- category_id (FK Category)
- amount (decimal)
- type (income|expense)
- occurred_on (date)
- description (nullable)
- created_at
- updated_at

## Budget
- id (UUID)
- user_id (FK User)
- category_id (FK Category)
- period_key (YYYY-MM)
- limit_amount (decimal)
- created_at
- updated_at

## Holding
- id (UUID)
- user_id (FK User)
- asset_type (stock|crypto|fund|cash|other)
- symbol (nullable)
- quantity (decimal)
- cost_basis (decimal)
- current_price (decimal, nullable)
- valuation_updated_at (nullable)
- created_at
- updated_at

## Relationships
- User 1:N Category
- User 1:N Transaction
- User 1:N Budget
- User 1:N Holding
- Category 1:N Transaction
- Category 1:N Budget

## Derived Views
- Monthly cash-flow summary
- Budget utilization summary
- Portfolio allocation summary
- Net-worth trend summary
