import request from 'supertest';
import app from '../src/app';
import { signToken } from '../src/lib/jwt';

jest.mock('../src/lib/prisma', () => ({
  __esModule: true,
  default: {
    transaction: {
      findMany: jest.fn(),
      count: jest.fn(),
      create: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    category: {
      findFirst: jest.fn(),
    },
    $transaction: jest.fn(),
  },
}));

import prisma from '../src/lib/prisma';

const mockPrisma = prisma as jest.Mocked<typeof prisma>;

const validToken = signToken({ userId: 'user-uuid', email: 'test@example.com' });

describe('POST /api/v1/transactions - validation', () => {
  it('should return 400 when required fields are missing', async () => {
    const res = await request(app)
      .post('/api/v1/transactions')
      .set('Authorization', `Bearer ${validToken}`)
      .send({ amount: 100 });

    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('should return 400 for negative amount', async () => {
    const res = await request(app)
      .post('/api/v1/transactions')
      .set('Authorization', `Bearer ${validToken}`)
      .send({
        category_id: 'cat-uuid',
        amount: -50,
        type: 'expense',
        occurred_on: '2024-01-15',
      });

    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('should return 401 without auth token', async () => {
    const res = await request(app).get('/api/v1/transactions');

    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe('UNAUTHORIZED');
  });
});
