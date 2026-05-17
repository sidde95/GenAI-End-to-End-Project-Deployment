import { Request, Response, NextFunction } from 'express';
import * as dashboardService from './dashboard.service';

export async function getSummary(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const summary = await dashboardService.getDashboardSummary(req.user!.userId);
    res.json(summary);
  } catch (err) {
    next(err);
  }
}
