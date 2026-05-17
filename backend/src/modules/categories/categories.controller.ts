import { Request, Response, NextFunction } from 'express';
import * as categoriesService from './categories.service';

export async function getCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const categories = await categoriesService.getCategories(req.user!.userId);
    res.json(categories);
  } catch (err) {
    next(err);
  }
}

export async function createCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const category = await categoriesService.createCategory(req.user!.userId, req.body as { name: string; type: 'income' | 'expense'; is_default?: boolean });
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
}

export async function updateCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const category = await categoriesService.updateCategory(req.user!.userId, req.params['id'] as string, req.body as { name?: string; type?: 'income' | 'expense'; is_default?: boolean });
    res.json(category);
  } catch (err) {
    next(err);
  }
}

export async function deleteCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await categoriesService.deleteCategory(req.user!.userId, req.params['id'] as string);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
