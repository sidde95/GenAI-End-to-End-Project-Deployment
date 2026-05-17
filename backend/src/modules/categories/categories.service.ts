import prisma from '../../lib/prisma';
import { AppError } from '../../lib/errors';

export async function getCategories(userId: string) {
  return prisma.category.findMany({ where: { user_id: userId }, orderBy: { created_at: 'asc' } });
}

export async function createCategory(
  userId: string,
  data: { name: string; type: 'income' | 'expense'; is_default?: boolean },
) {
  return prisma.category.create({
    data: { user_id: userId, name: data.name, type: data.type, is_default: data.is_default ?? false },
  });
}

export async function updateCategory(
  userId: string,
  categoryId: string,
  data: { name?: string; type?: 'income' | 'expense'; is_default?: boolean },
) {
  const existing = await prisma.category.findFirst({ where: { id: categoryId, user_id: userId } });
  if (!existing) throw AppError.notFound('Category not found');

  return prisma.category.update({ where: { id: categoryId }, data });
}

export async function deleteCategory(userId: string, categoryId: string) {
  const existing = await prisma.category.findFirst({ where: { id: categoryId, user_id: userId } });
  if (!existing) throw AppError.notFound('Category not found');

  await prisma.category.delete({ where: { id: categoryId } });
}
