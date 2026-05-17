import { Request, Response, NextFunction } from 'express';
import * as transactionsService from './transactions.service';

export async function getTransactions(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { from, to, category_id, type, limit, offset } = req.query as Record<string, string>;
    const result = await transactionsService.getTransactions(req.user!.userId, {
      from,
      to,
      category_id,
      type,
      limit: limit ? parseInt(limit, 10) : undefined,
      offset: offset ? parseInt(offset, 10) : undefined,
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function createTransaction(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const transaction = await transactionsService.createTransaction(req.user!.userId, req.body as {
      category_id: string;
      amount: number;
      type: 'income' | 'expense';
      occurred_on: string;
      description?: string;
    });
    res.status(201).json(transaction);
  } catch (err) {
    next(err);
  }
}

export async function updateTransaction(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const transaction = await transactionsService.updateTransaction(req.user!.userId, req.params['id'] as string, req.body as {
      category_id?: string;
      amount?: number;
      type?: 'income' | 'expense';
      occurred_on?: string;
      description?: string;
    });
    res.json(transaction);
  } catch (err) {
    next(err);
  }
}

export async function deleteTransaction(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await transactionsService.deleteTransaction(req.user!.userId, req.params['id'] as string);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
