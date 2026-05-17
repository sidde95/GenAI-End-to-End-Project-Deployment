import { Request, Response, NextFunction } from 'express';
import * as holdingsService from './holdings.service';

export async function getHoldings(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const holdings = await holdingsService.getHoldings(req.user!.userId);
    res.json(holdings);
  } catch (err) {
    next(err);
  }
}

export async function createHolding(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const holding = await holdingsService.createHolding(req.user!.userId, req.body as {
      asset_type: 'stock' | 'crypto' | 'fund' | 'cash' | 'other';
      symbol?: string;
      quantity: number;
      cost_basis: number;
      current_price?: number;
    });
    res.status(201).json(holding);
  } catch (err) {
    next(err);
  }
}

export async function updateHolding(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const holding = await holdingsService.updateHolding(req.user!.userId, req.params['id'] as string, req.body as {
      asset_type?: 'stock' | 'crypto' | 'fund' | 'cash' | 'other';
      symbol?: string;
      quantity?: number;
      cost_basis?: number;
      current_price?: number;
    });
    res.json(holding);
  } catch (err) {
    next(err);
  }
}

export async function deleteHolding(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await holdingsService.deleteHolding(req.user!.userId, req.params['id'] as string);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export async function refreshPrices(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await holdingsService.refreshPrices(req.user!.userId);
    res.json(result);
  } catch (err) {
    next(err);
  }
}
