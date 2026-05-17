import { Router } from 'express';
import { z } from 'zod';
import { authenticate } from '../../middleware/auth';
import { validateBody } from '../../middleware/validate';
import * as transactionsController from './transactions.controller';

const router = Router();

const createTransactionSchema = z.object({
  category_id: z.string().uuid(),
  amount: z.number().positive(),
  type: z.enum(['income', 'expense']),
  occurred_on: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  description: z.string().optional(),
});

const updateTransactionSchema = z.object({
  category_id: z.string().uuid().optional(),
  amount: z.number().positive().optional(),
  type: z.enum(['income', 'expense']).optional(),
  occurred_on: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  description: z.string().optional(),
});

router.use(authenticate);
router.get('/', transactionsController.getTransactions);
router.post('/', validateBody(createTransactionSchema), transactionsController.createTransaction);
router.patch('/:id', validateBody(updateTransactionSchema), transactionsController.updateTransaction);
router.delete('/:id', transactionsController.deleteTransaction);

export default router;
