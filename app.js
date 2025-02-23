import express from 'express';
import morgan from 'morgan';

import tourRouter from './routers/tourRouters.js';
import userRouter from './routers/userRouters.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 1) Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('tiny'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello form the middleware 🙋‍♂️');
  next();
});

app.use((req, res, next) => {
  req.requestTitme = new Date().toISOString();
  next();
});

// 2) Route Handler

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

export { app };

// 93 - Modelling the Tours
