import { Request, Response, NextFunction } from 'express';
import * as profileService from './profile.service';

export async function getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!.userId;
    const profile = await profileService.getProfile(userId);
    res.json(profile);
  } catch (err) {
    next(err);
  }
}

export async function updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!.userId;
    const profile = await profileService.updateProfile(userId, req.body as { full_name?: string; password?: string });
    res.json(profile);
  } catch (err) {
    next(err);
  }
}
