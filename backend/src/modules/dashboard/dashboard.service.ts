import prisma from '../../lib/prisma';

export async function getDashboardSummary(userId: string) {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const [transactions, holdings] = await Promise.all([
    prisma.transaction.findMany({
      where: {
        user_id: userId,
        occurred_on: { gte: startOfMonth, lte: endOfMonth },
      },
    }),
    prisma.holding.findMany({ where: { user_id: userId } }),
  ]);

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const portfolioValue = holdings.reduce((sum, h) => {
    const price = h.current_price ?? h.cost_basis;
    return sum + Number(h.quantity) * Number(price);
  }, 0);

  const totalCostBasis = holdings.reduce(
    (sum, h) => sum + Number(h.quantity) * Number(h.cost_basis),
    0,
  );

  return {
    period: {
      start: startOfMonth.toISOString().slice(0, 10),
      end: endOfMonth.toISOString().slice(0, 10),
    },
    income: totalIncome,
    expenses: totalExpenses,
    net: totalIncome - totalExpenses,
    portfolio: {
      value: portfolioValue,
      cost_basis: totalCostBasis,
      gain_loss: portfolioValue - totalCostBasis,
      holdings_count: holdings.length,
    },
  };
}
