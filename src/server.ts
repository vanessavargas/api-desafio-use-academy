import express, { Request, Response } from 'express';
import { routes } from './routes';
import { env } from './config/environment-variables';
import { AppDataSource } from './config/data-source';

const PORT = env.PORT || 3000;
const app = express();
app.use(express.json());

app.use(routes);

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running in port: ${PORT}`));
  })
  .catch((error) => console.log(error));
