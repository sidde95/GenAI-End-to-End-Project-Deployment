import { Router } from 'express';
import { authenticate } from '../../middleware/auth';
import * as reportsController from './reports.controller';

const router = Router();

router.use(authenticate);
router.get('/monthly', reportsController.getMonthlyReport);
router.get('/export', reportsController.exportReport);

export default router;
