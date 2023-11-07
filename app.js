import express, { json } from 'express'
import logger from 'morgan'
import cors from 'cors'

import dotenv from 'dotenv';
dotenv.config();

import Router from './routes/api/Router.js';
import contactsRouter from './routes/api/contactsRouter.js';



const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors())
app.use(json());

app.use('/api/users', Router);
app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: 'Server error' }) = err;
});

export default app;