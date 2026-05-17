import request from 'supertest';
import app from '../src/app';

jest.mock('../src/lib/prisma', () => ({
  __esModule: true,
  default: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}));

import prisma from '../src/lib/prisma';

const mockPrisma = prisma as jest.Mocked<typeof prisma>;

describe('POST /api/v1/auth/register', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should register a new user', async () => {
    (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    (mockPrisma.user.create as jest.Mock).mockResolvedValue({
      id: 'test-uuid',
      email: 'test@example.com',
      full_name: 'Test User',
      created_at: new Date(),
    });

    const res = await request(app).post('/api/v1/auth/register').send({
      email: 'test@example.com',
      password: 'password123',
      full_name: 'Test User',
    });

    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe('test@example.com');
  });

  it('should return 409 if email already exists', async () => {
    (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: 'existing-uuid',
      email: 'test@example.com',
    });

    const res = await request(app).post('/api/v1/auth/register').send({
      email: 'test@example.com',
      password: 'password123',
      full_name: 'Test User',
    });

    expect(res.status).toBe(409);
    expect(res.body.error.code).toBe('CONFLICT');
  });

  it('should return 400 for invalid email', async () => {
    const res = await request(app).post('/api/v1/auth/register').send({
      email: 'not-an-email',
      password: 'password123',
      full_name: 'Test User',
    });

    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });
});

describe('POST /api/v1/auth/login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 401 for non-existent user', async () => {
    (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    const res = await request(app).post('/api/v1/auth/login').send({
      email: 'notfound@example.com',
      password: 'password123',
    });

    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe('UNAUTHORIZED');
  });

  it('should return 400 for missing fields', async () => {
    const res = await request(app).post('/api/v1/auth/login').send({
      email: 'test@example.com',
    });

    expect(res.status).toBe(400);
  });
});
