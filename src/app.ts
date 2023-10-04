import express from 'express';
import cors from 'cors';
import { initDb } from './db';
import router from './routes';

import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', router);

initDb().then(() => {

  app.listen(process.env.PORT, () => {
    console.log(`server is running at ${process.env.PORT}`);
  });
});
