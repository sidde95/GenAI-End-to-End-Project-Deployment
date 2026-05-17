import { Router } from 'express';
import { z } from 'zod';
import { authenticate } from '../../middleware/auth';
import { validateBody } from '../../middleware/validate';
import * as holdingsController from './holdings.controller';

const router = Router();

const createHoldingSchema = z.object({
  asset_type: z.enum(['stock', 'crypto', 'fund', 'cash', 'other']),
  symbol: z.string().optional(),
  quantity: z.number().positive(),
  cost_basis: z.number().nonnegative(),
  current_price: z.number().nonnegative().optional(),
});

const updateHoldingSchema = z.object({
  asset_type: z.enum(['stock', 'crypto', 'fund', 'cash', 'other']).optional(),
  symbol: z.string().optional(),
  quantity: z.number().positive().optional(),
  cost_basis: z.number().nonnegative().optional(),
  current_price: z.number().nonnegative().optional(),
});

router.use(authenticate);
router.get('/', holdingsController.getHoldings);
router.post('/refresh-prices', holdingsController.refreshPrices);
router.post('/', validateBody(createHoldingSchema), holdingsController.createHolding);
router.patch('/:id', validateBody(updateHoldingSchema), holdingsController.updateHolding);
router.delete('/:id', holdingsController.deleteHolding);

export default router;
