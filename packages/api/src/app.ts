import * as trpcExpress from '@trpc/server/adapters/express';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import { postRouter } from './controllers/postRouter';
import { questionRouter } from './controllers/questionRouter';
import { createContext, router } from './trpc';

config();

const appRouter = router({
  post: postRouter,
  question: questionRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;

const app = express();

if (!process.env.SESSION_SECRET || !process.env.DATABASE_URL) {
  throw new Error('Please set env variables SESSION_SECRET and DATABASE_URL');
}

app.use(
  session({
    rolling: true,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      domain: process.env.MAIN_DOMAIN,
      maxAge: 30 * 24 * 60 * 60 * 1000, // クッキーの有効期限(msec) 30日
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    },
  }),
);

app.use(express.json());
app.disable('x-powered-by');
app.use(morgan('dev'));
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.get('/status', (_, res) => {
  return res.json({ ok: true });
});

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

export default app;
