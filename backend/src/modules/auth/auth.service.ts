import bcrypt from 'bcryptjs';
import prisma from '../../lib/prisma';
import { signToken } from '../../lib/jwt';
import { AppError } from '../../lib/errors';

const SALT_ROUNDS = 12;

export async function register(email: string, password: string, fullName: string) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw AppError.conflict('Email already registered');
  }

  const password_hash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await prisma.user.create({
    data: { email, password_hash, full_name: fullName },
    select: { id: true, email: true, full_name: true, created_at: true },
  });

  const token = signToken({ userId: user.id, email: user.email });
  return { user, token };
}

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw AppError.unauthorized('Invalid email or password');
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    throw AppError.unauthorized('Invalid email or password');
  }

  const token = signToken({ userId: user.id, email: user.email });
  return {
    user: { id: user.id, email: user.email, full_name: user.full_name, created_at: user.created_at },
    token,
  };
}
