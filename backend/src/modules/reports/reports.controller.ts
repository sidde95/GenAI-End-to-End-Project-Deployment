import { Request, Response, NextFunction } from 'express';
import * as reportsService from './reports.service';

export async function getMonthlyReport(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const year = parseInt(req.query.year as string ?? String(new Date().getFullYear()), 10);
    const month = parseInt(req.query.month as string ?? String(new Date().getMonth() + 1), 10);
    const report = await reportsService.getMonthlyReport(req.user!.userId, year, month);
    res.json(report);
  } catch (err) {
    next(err);
  }
}

export async function exportReport(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { from, to, format = 'json' } = req.query as { from: string; to: string; format?: string };
    const result = await reportsService.exportReport(req.user!.userId, from, to, format);

    if (result.format === 'csv') {
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="transactions.csv"');
      res.send(result.data);
    } else {
      res.json(result.data);
    }
  } catch (err) {
    next(err);
  }
}
