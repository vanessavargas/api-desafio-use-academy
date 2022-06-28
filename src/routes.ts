import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { AppDataSource } from './config/data-source';
import { multerConfig } from './config/multer';
import { CategoryController } from './controllers/category.controller';
import { ProductController } from './controllers/product.controller';
import { CreateCategoryDto } from './dtos/category/create-category.dto';
import { UpdateCategoryDto } from './dtos/category/update-category.dto';
import { CreateProductDto } from './dtos/product/create-product.dto';
import { UpdateProductDto } from './dtos/product/update-product.dto';
import { validator } from './middlewares';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';

const routes = Router();

const categoryController = new CategoryController(
  new CategoryService(AppDataSource),
);

const productController = new ProductController(
  new ProductService(AppDataSource),
);

routes.get('/', (_request: Request, response: Response) => {
  return response.json({ status: 'sucesso', version: '1.0.0' }).status(200);
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
  CreateCategoryDto.validators(),
  validator,
  (request: Request, response: Response, next: NextFunction) => {
    categoryController.create(request, response).catch((error: Error) => {
      next(error);
    });
  },
);

routes.put(
  '/categories/:id',
  UpdateCategoryDto.validators(),
  validator,
  (request: Request, response: Response, next: NextFunction) => {
    categoryController.update(request, response).catch((error: Error) => {
      next(error);
    });
  },
);

routes.delete(
  '/categories/:id',
  (request: Request, response: Response, next: NextFunction) => {
    categoryController.delete(request, response).catch((error: Error) => {
      next(error);
    });
  },
);

//routes Products
routes.post(
  '/products',
  multer(multerConfig).single('image'),
  CreateProductDto.validators(),
  validator,
  (request: Request, response: Response, next: NextFunction) => {
    productController.create(request, response).catch((error: Error) => {
      next(error);
    });
  },
);

routes.get(
  '/products',
  (request: Request, response: Response, next: NextFunction) => {
    productController.getAll(request, response).catch((error: Error) => {
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

routes.get(
  'products/img/:name',
  (request: Request, response: Response, next: NextFunction) => {
    productController.getImgByName(request, response).catch((error: Error) => {
      next(error);
    });
  },
);

routes.put(
  '/products/:id',
  multer(multerConfig).single('image'),
  UpdateProductDto.validators(),
  validator,
  (request: Request, response: Response, next: NextFunction) => {
    productController.update(request, response).catch((error: Error) => {
      next(error);
    });
  },
);

export { routes };
