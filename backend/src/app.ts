import express from 'express';
import cors from 'cors';
import authRoutes from './modules/auth/auth.routes';
import profileRoutes from './modules/profile/profile.routes';
import categoriesRoutes from './modules/categories/categories.routes';
import transactionsRoutes from './modules/transactions/transactions.routes';
import holdingsRoutes from './modules/holdings/holdings.routes';
import dashboardRoutes from './modules/dashboard/dashboard.routes';
import reportsRoutes from './modules/reports/reports.routes';
import budgetsRoutes from './modules/budgets/budgets.routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());

// Request logger
app.use((req, _res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
const api = '/api/v1';
app.use(`${api}/auth`, authRoutes);
app.use(`${api}/profile`, profileRoutes);
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/transactions`, transactionsRoutes);
app.use(`${api}/holdings`, holdingsRoutes);
app.use(`${api}/dashboard`, dashboardRoutes);
app.use(`${api}/reports`, reportsRoutes);
app.use(`${api}/budgets`, budgetsRoutes);

// Global error handler
app.use(errorHandler);

export default app;
