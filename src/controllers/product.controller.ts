import { ProductService } from '../services/product.service';
import { Request, Response } from 'express';
import { HttpStatus } from '../utils/enums/http-status.enum';
import { CreatedProductDto } from '../dtos/product/created-product.dto';
import { CreateProductDto } from '../dtos/product/create-product.dto';
import { UpdateProductDto } from '../dtos/product/update-product.dto';

interface CreateProductBody extends Request {
  body: CreateProductDto;
}
interface UpdateProductBody extends Request {
  body: Partial<UpdateProductDto>;
}
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  async create(
    { body, file }: CreateProductBody,
    response: Response,
  ): Promise<Response<CreatedProductDto>> {
    const product = await this.productService.create({
      ...body,
      image: file!.filename,
    });
    return response.status(HttpStatus.CREATED).json(product);
  }

  async getAll(
    _request: Request,
    response: Response,
  ): Promise<Response<CreatedProductDto[]>> {
    const products = await this.productService.getAll();
    return response.status(HttpStatus.OK).json(products);
  }

  async show(
    { params }: Request,
    response: Response,
  ): Promise<Response<CreatedProductDto>> {
    const product = await this.productService.show(params.id);
    return response.status(HttpStatus.OK).json(product);
  }

  async update(
    { body, file, params }: UpdateProductBody,
    response: Response,
  ): Promise<Response<void>> {
    await this.productService.update(params.id, {
      ...body,
      image: file?.filename,
    });
    return response.status(HttpStatus.NO_CONTENT).json();
  }
}
