import prisma from '../../lib/prisma';
import { AppError } from '../../lib/errors';

export async function getHoldings(userId: string) {
  return prisma.holding.findMany({ where: { user_id: userId }, orderBy: { created_at: 'asc' } });
}

export async function createHolding(
  userId: string,
  data: {
    asset_type: 'stock' | 'crypto' | 'fund' | 'cash' | 'other';
    symbol?: string;
    quantity: number;
    cost_basis: number;
    current_price?: number;
  },
) {
  return prisma.holding.create({
    data: {
      user_id: userId,
      asset_type: data.asset_type,
      symbol: data.symbol,
      quantity: data.quantity,
      cost_basis: data.cost_basis,
      current_price: data.current_price,
      valuation_updated_at: data.current_price ? new Date() : null,
    },
  });
}

export async function updateHolding(
  userId: string,
  holdingId: string,
  data: {
    asset_type?: 'stock' | 'crypto' | 'fund' | 'cash' | 'other';
    symbol?: string;
    quantity?: number;
    cost_basis?: number;
    current_price?: number;
  },
) {
  const existing = await prisma.holding.findFirst({ where: { id: holdingId, user_id: userId } });
  if (!existing) throw AppError.notFound('Holding not found');

  return prisma.holding.update({
    where: { id: holdingId },
    data: {
      ...data,
      ...(data.current_price !== undefined ? { valuation_updated_at: new Date() } : {}),
    },
  });
}

export async function deleteHolding(userId: string, holdingId: string) {
  const existing = await prisma.holding.findFirst({ where: { id: holdingId, user_id: userId } });
  if (!existing) throw AppError.notFound('Holding not found');

  await prisma.holding.delete({ where: { id: holdingId } });
}

export async function refreshPrices(userId: string) {
  // Placeholder: In production, this would call an external market data API
  const holdings = await prisma.holding.findMany({ where: { user_id: userId } });
  return {
    message: 'Price refresh initiated',
    holdings_count: holdings.length,
    refreshed_at: new Date().toISOString(),
  };
}
