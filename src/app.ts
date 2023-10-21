import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { initDb } from './db';
import router from './routes';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

dotenv.config();

const app = express();

const secretKey = process.env.SECRET_KEY || 'secret';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.headers['authorization'];
  const token = authToken && authToken.split(' ')[1];
  if (token == null) return res.status(401).send('Access denied');
  jwt.verify(token, secretKey, (err, value) => {
    if (err) return res.status(403).send('Invalid token');
    req.body.user_id = value;
    next();
  });
};

app.use(cors());
app.use(express.json());
app.use(verifyToken);

app.use('/', router);

initDb().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`server is running at ${process.env.PORT}`);
  });
});
