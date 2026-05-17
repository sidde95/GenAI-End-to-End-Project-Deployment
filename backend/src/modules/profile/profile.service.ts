import bcrypt from 'bcryptjs';
import prisma from '../../lib/prisma';
import { AppError } from '../../lib/errors';

const SALT_ROUNDS = 12;

export async function getProfile(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, full_name: true, created_at: true, updated_at: true },
  });
  if (!user) throw AppError.notFound('User not found');
  return user;
}

export async function updateProfile(
  userId: string,
  data: { full_name?: string; password?: string },
) {
  const updateData: { full_name?: string; password_hash?: string } = {};
  if (data.full_name) updateData.full_name = data.full_name;
  if (data.password) updateData.password_hash = await bcrypt.hash(data.password, SALT_ROUNDS);

  const user = await prisma.user.update({
    where: { id: userId },
    data: updateData,
    select: { id: true, email: true, full_name: true, created_at: true, updated_at: true },
  });
  return user;
}
