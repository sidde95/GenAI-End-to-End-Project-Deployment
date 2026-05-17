import prisma from '../../lib/prisma';
import { AppError } from '../../lib/errors';
import { Prisma } from '@prisma/client';

export async function getTransactions(
  userId: string,
  filters: { from?: string; to?: string; category_id?: string; type?: string; limit?: number; offset?: number },
) {
  const where: Prisma.TransactionWhereInput = { user_id: userId };
  if (filters.type) where.type = filters.type as Prisma.EnumTransactionTypeFilter;
  if (filters.category_id) where.category_id = filters.category_id;
  if (filters.from || filters.to) {
    where.occurred_on = {
      ...(filters.from ? { gte: new Date(filters.from) } : {}),
      ...(filters.to ? { lte: new Date(filters.to) } : {}),
    };
  }

  const [total, data] = await prisma.$transaction([
    prisma.transaction.count({ where }),
    prisma.transaction.findMany({
      where,
      orderBy: { occurred_on: 'desc' },
      take: filters.limit ?? 50,
      skip: filters.offset ?? 0,
      include: { category: true },
    }),
  ]);

  return { total, data };
}

export async function createTransaction(
  userId: string,
  data: {
    category_id: string;
    amount: number;
    type: 'income' | 'expense';
    occurred_on: string;
    description?: string;
  },
) {
  const category = await prisma.category.findFirst({
    where: { id: data.category_id, user_id: userId },
  });
  if (!category) throw AppError.notFound('Category not found');

  return prisma.transaction.create({
    data: {
      user_id: userId,
      category_id: data.category_id,
      amount: data.amount,
      type: data.type,
      occurred_on: new Date(data.occurred_on),
      description: data.description,
    },
    include: { category: true },
  });
}

export async function updateTransaction(
  userId: string,
  transactionId: string,
  data: {
    category_id?: string;
    amount?: number;
    type?: 'income' | 'expense';
    occurred_on?: string;
    description?: string;
  },
) {
  const existing = await prisma.transaction.findFirst({
    where: { id: transactionId, user_id: userId },
  });
  if (!existing) throw AppError.notFound('Transaction not found');

  if (data.category_id) {
    const category = await prisma.category.findFirst({
      where: { id: data.category_id, user_id: userId },
    });
    if (!category) throw AppError.notFound('Category not found');
  }

  return prisma.transaction.update({
    where: { id: transactionId },
    data: {
      ...(data.category_id ? { category_id: data.category_id } : {}),
      ...(data.amount !== undefined ? { amount: data.amount } : {}),
      ...(data.type ? { type: data.type } : {}),
      ...(data.occurred_on ? { occurred_on: new Date(data.occurred_on) } : {}),
      ...(data.description !== undefined ? { description: data.description } : {}),
    },
    include: { category: true },
  });
}

export async function deleteTransaction(userId: string, transactionId: string) {
  const existing = await prisma.transaction.findFirst({
    where: { id: transactionId, user_id: userId },
  });
  if (!existing) throw AppError.notFound('Transaction not found');

  await prisma.transaction.delete({ where: { id: transactionId } });
}
