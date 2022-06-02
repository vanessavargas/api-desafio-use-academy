import { Router, Request, Response, NextFunction } from 'express';
import { AppDataSource } from './config/data-source';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';

const routes = Router();

const categoryController = new CategoryController(
  new CategoryService(AppDataSource),
);
const productController = new ProductController(
  new ProductService(AppDataSource),
);

routes.get('/', (request: Request, response: Response) => {
  return response.json({ status: 'sucesso', versão: '1.0.0' }).status(200);
});

//routes Categories
routes.get(
  '/categories',
  (request: Request, response: Response, next: NextFunction) => {
    categoryController.getAll(request, response).catch((error: Error) => {
      next(error);
    });
  },
);

routes.post(
  '/categories',
  (request: Request, response: Response, next: NextFunction) => {
    categoryController.create(request, response).catch((error: Error) => {
      next(error);
    });
  },
);

//routes Products
routes.get(
  '/products',
  (request: Request, response: Response, next: NextFunction) => {
    productController.getAll(request, response).catch((error: Error) => {
      next(error);
    });
  },
);

routes.post(
  '/products',
  (request: Request, response: Response, next: NextFunction) => {
    productController.create(request, response).catch((error: Error) => {
      next(error);
    });
  },
);

routes.get(
  '/products/:id',
  (request: Request, response: Response, next: NextFunction) => {
    productController.show(request, response).catch((error: Error) => {
      next(error);
    });
  },
);

routes.put(
  '/products/:id',
  (request: Request, response: Response, next: NextFunction) => {
    productController.update(request, response).catch((error: Error) => {
      next(error);
    });
  },
);

routes.delete(
  '/products/:id',
  (request: Request, response: Response, next: NextFunction) => {
    productController.delete(request, response).catch((error: Error) => {
      next(error);
    });
  },
);

export { routes };
