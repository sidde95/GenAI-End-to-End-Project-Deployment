import { Router } from 'express';
import { z } from 'zod';
import { authenticate } from '../../middleware/auth';
import { validateBody } from '../../middleware/validate';
import * as categoriesController from './categories.controller';

const router = Router();

const createCategorySchema = z.object({
  name: z.string().min(1),
  type: z.enum(['income', 'expense']),
  is_default: z.boolean().optional(),
});

const updateCategorySchema = z.object({
  name: z.string().min(1).optional(),
  type: z.enum(['income', 'expense']).optional(),
  is_default: z.boolean().optional(),
});

router.use(authenticate);
router.get('/', categoriesController.getCategories);
router.post('/', validateBody(createCategorySchema), categoriesController.createCategory);
router.patch('/:id', validateBody(updateCategorySchema), categoriesController.updateCategory);
router.delete('/:id', categoriesController.deleteCategory);

export default router;
