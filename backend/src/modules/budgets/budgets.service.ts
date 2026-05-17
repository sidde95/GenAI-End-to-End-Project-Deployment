// TODO: Reserved for user implementation - See DATA_MODEL.md and API_SPEC.md
// TODO: Implement budget CRUD operations following the patterns in categories.service.ts and transactions.service.ts
// TODO: Budget model fields: id, user_id, category_id, period_key (YYYY-MM), limit_amount, created_at, updated_at
// TODO: Consider adding spending tracking by joining with transactions for the given period_key

export async function getBudgets(_userId: string): Promise<never[]> {
  // TODO: Implement - query prisma.budget.findMany({ where: { user_id: userId } })
  throw new Error('Not implemented');
}

export async function createBudget(
  _userId: string,
  _data: { category_id: string; period_key: string; limit_amount: number },
): Promise<never> {
  // TODO: Implement - create budget record, enforce unique(user_id, category_id, period_key)
  throw new Error('Not implemented');
}

export async function updateBudget(
  _userId: string,
  _budgetId: string,
  _data: { limit_amount?: number },
): Promise<never> {
  // TODO: Implement - verify ownership, then update
  throw new Error('Not implemented');
}

export async function deleteBudget(_userId: string, _budgetId: string): Promise<void> {
  // TODO: Implement - verify ownership, then delete
  throw new Error('Not implemented');
}
