# Product Requirements Document (PRD)

## 1. Overview
Intelligent Finance Copilot is a full-stack web application for personal finance operations, combining budgeting, transaction management, portfolio tracking, and financial dashboards.

## 2. Goals
- Centralize financial data entry and review
- Provide budgeting controls and status visibility
- Provide portfolio and net-worth tracking
- Offer clean APIs and deployable architecture

## 3. Core Modules
1. Authentication & User Profile
2. Transactions (Income/Expense)
3. Budget Management
4. Portfolio Management
5. Dashboard & Reports

## 4. Users and Permissions
- **End User**: manage own financial data
- **Admin/Operator (optional)**: system-level monitoring access

## 5. Key User Capabilities
- Register/login securely
- Create, update, delete transactions
- Categorize spending/income
- Set monthly budget limits by category
- Track budget utilization and overrun
- Add and manage portfolio assets
- View gains/losses and allocation
- View dashboard summary and report outputs

## 6. In Scope
- Manual data entry workflows
- Category-level budgeting
- Portfolio holdings (manual)
- Dashboard and monthly summaries
- REST API and web UI

## 7. Out of Scope
- Direct bank account sync
- Trade execution
- Tax filing workflows
- Financial advisory guarantees

## 8. Assumptions
- Users provide valid financial inputs
- Asset price refresh can be periodic or user-triggered
- Authentication uses modern token-based pattern

## 9. Constraints
- Must remain understandable and maintainable
- Must protect sensitive finance data
- Must support containerized deployment

## 10. Deliverables
- Documented architecture and API
- Deployable backend and frontend services
- Testable end-to-end user workflows
