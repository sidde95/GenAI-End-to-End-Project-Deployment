import { Request, Response } from 'express';

// TODO: Reserved for user implementation - See DATA_MODEL.md and API_SPEC.md
// TODO: Wire up budgets.service.ts methods once implemented

export function getBudgets(_req: Request, res: Response): void {
  // TODO: Call budgets.service.getBudgets(req.user!.userId)
  res.status(501).json({
    message: 'Budget module is reserved for user implementation. See TODO markers in budgets.service.ts.',
  });
}

export function createBudget(_req: Request, res: Response): void {
  // TODO: Call budgets.service.createBudget(req.user!.userId, req.body)
  res.status(501).json({
    message: 'Budget module is reserved for user implementation. See TODO markers in budgets.service.ts.',
  });
}

export function updateBudget(_req: Request, res: Response): void {
  // TODO: Call budgets.service.updateBudget(req.user!.userId, req.params.id, req.body)
  res.status(501).json({
    message: 'Budget module is reserved for user implementation. See TODO markers in budgets.service.ts.',
  });
}

export function deleteBudget(_req: Request, res: Response): void {
  // TODO: Call budgets.service.deleteBudget(req.user!.userId, req.params.id)
  res.status(501).json({
    message: 'Budget module is reserved for user implementation. See TODO markers in budgets.service.ts.',
  });
}
