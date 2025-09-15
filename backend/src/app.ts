import express, { Application, RequestHandler, Router } from 'express';
import cors from 'cors';
import { db } from './appDataSource';
import { errorHandler } from './middlewares/errorHandler';
import logger from './middlewares/logger';

type AppRoute = { path: string; router: Router };
type AppSetup = {
  port: number;
  middlewares: RequestHandler[];
  routes: AppRoute[];
};

class App {
  public app: Application;
  public port: number;

  constructor(setup: AppSetup) {
    this.app = express();
    this.port = setup.port;

    this.app.use(cors({ origin: 'http://localhost:5173' }));
    this.app.use(express.json());
    this.app.use(logger());

    setup.middlewares.forEach((m) => this.app.use(m));
    this.app.get('/health', (_req, res) => res.json({ ok: true }));
    setup.routes.forEach((r) => this.app.use(r.path, r.router));
    this.app.use(errorHandler);
  }

  async listen(): Promise<void> {
    await db.initialize()
      .then(() => console.log('DB connected'))
      .catch((err) => { console.error('DB connect error:', err); process.exit(1); });

    this.app.listen(this.port, () => console.log(`API http://localhost:${this.port}`));
    process.on('exit', () => { void db.destroy(); });
  }
}

export default App;
