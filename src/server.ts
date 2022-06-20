import express, { Request, Response } from 'express';
import { routes } from './routes';
import { env } from './config/environment-variables';
import { AppDataSource } from './config/data-source';
import { resolve } from 'path';
import cors from 'cors';
import fs from 'fs';

const directory = resolve(__dirname, '..', 'dist', 'uploads');
fs.rmSync(directory, { force: true });
fs.mkdirSync(directory);

const PORT = env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  }),
);

app.use(routes);

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running in port: ${PORT}`));
  })
  .catch((error) => console.log(error));
