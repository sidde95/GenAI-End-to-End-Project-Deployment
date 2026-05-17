// TODO: Reserved for user implementation - See DATA_MODEL.md and API_SPEC.md
import { Router } from 'express';
import { authenticate } from '../../middleware/auth';
import * as budgetsController from './budgets.controller';

const router = Router();

router.use(authenticate);
router.get('/', budgetsController.getBudgets);
router.post('/', budgetsController.createBudget);
router.patch('/:id', budgetsController.updateBudget);
router.delete('/:id', budgetsController.deleteBudget);

export default router;
