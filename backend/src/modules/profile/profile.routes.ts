import { Router } from 'express';
import { z } from 'zod';
import { authenticate } from '../../middleware/auth';
import { validateBody } from '../../middleware/validate';
import * as profileController from './profile.controller';

const router = Router();

const updateProfileSchema = z.object({
  full_name: z.string().min(1).optional(),
  password: z.string().min(8).optional(),
});

router.get('/', authenticate, profileController.getProfile);
router.patch('/', authenticate, validateBody(updateProfileSchema), profileController.updateProfile);

export default router;
