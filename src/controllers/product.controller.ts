import { Request, Response } from 'express';
import { CreateProductDto } from '../dtos/product/create-product.dto';
import { CreatedProductDto } from '../dtos/product/created-product.dto';
import { ProductService } from '../services/product.service';
import { HttpStatus } from '../utils/enums/http-status.enum';

interface IProduct {
  id?: string;
  name: string;
  description: string;
  value: number;
  person_count: number;
  disponibility: number;
  image: string;
  category_id: string;
  created_at: Date;
  updated_at: Date;
}

interface CreateProductBody extends Request {
  body: CreateProductDto;
}

let products: Array<IProduct> = [];

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  async getAll(request: Request, response: Response) {
    const products = await this.productService.getAll();
    return response.status(HttpStatus.OK).json(products);
  }

  async create(
    { body: { name } }: CreateProductBody,
    response: Response,
  ): Promise<Response<CreatedProductDto>> {
    const createdProduct = await this.productService.create({ name });
    return response.status(HttpStatus.CREATED).json(createdProduct);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const product = products.find((product: IProduct) => product.id == id);

    return response.status(HttpStatus.OK).json(product);
  }

  async update(request: Request, response: Response) {
    const data = request.body;
    const { id } = request.params;

    products = products.map((product: IProduct) => {
      if (product.id == id) {
        product = { ...product, name: data.name, updated_at: new Date() };
      }
      return product;
    });

    return response.status(HttpStatus.NO_CONTENT).json();
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    products.forEach((product: IProduct, index: number) => {
      if (product.id == id) products.splice(index, 1);
    });

    return response.status(HttpStatus.NO_CONTENT).json();
  }
}
