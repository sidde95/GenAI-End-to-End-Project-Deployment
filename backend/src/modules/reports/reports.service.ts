import prisma from '../../lib/prisma';
import { AppError } from '../../lib/errors';

export async function getMonthlyReport(userId: string, year: number, month: number) {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  const transactions = await prisma.transaction.findMany({
    where: {
      user_id: userId,
      occurred_on: { gte: startDate, lte: endDate },
    },
    include: { category: true },
    orderBy: { occurred_on: 'asc' },
  });

  const byCategory: Record<string, { category: string; type: string; total: number; count: number }> = {};

  for (const t of transactions) {
    const key = t.category_id;
    if (!byCategory[key]) {
      byCategory[key] = { category: t.category.name, type: t.type, total: 0, count: 0 };
    }
    byCategory[key].total += Number(t.amount);
    byCategory[key].count += 1;
  }

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((s, t) => s + Number(t.amount), 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((s, t) => s + Number(t.amount), 0);

  return {
    period: `${year}-${String(month).padStart(2, '0')}`,
    total_income: totalIncome,
    total_expenses: totalExpenses,
    net: totalIncome - totalExpenses,
    by_category: Object.values(byCategory),
    transactions,
  };
}

export async function exportReport(userId: string, from: string, to: string, format: string) {
  if (!['csv', 'json'].includes(format)) {
    throw AppError.badRequest('Format must be csv or json');
  }

  const transactions = await prisma.transaction.findMany({
    where: {
      user_id: userId,
      occurred_on: { gte: new Date(from), lte: new Date(to) },
    },
    include: { category: true },
    orderBy: { occurred_on: 'asc' },
  });

  if (format === 'csv') {
    const header = 'id,date,type,amount,category,description';
    const rows = transactions.map(
      (t) =>
        `${t.id},${t.occurred_on.toISOString().slice(0, 10)},${t.type},${t.amount},${t.category.name},${t.description ?? ''}`,
    );
    return { format: 'csv', data: [header, ...rows].join('\n') };
  }

  return { format: 'json', data: transactions };
}
