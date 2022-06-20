import { ProductService } from '../services/product.service';
import { Request, Response } from 'express';
import { resolve } from 'path';
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
    { body, file }: Request,
    resquest: Response,
  ): Promise<Response<CreatedProductDto>> {
    const createdProduct = await this.productService.create({
      ...body,
      image: file?.filename,
      disponibility: body.disponibility === 'true' ? true : false,
    });
    return resquest.status(HttpStatus.CREATED).json(createdProduct);
  }

  async getAll(
    _request: Request,
    response: Response,
  ): Promise<Response<CreatedProductDto[]>> {
    const products = await this.productService.getAll();
    return response.status(HttpStatus.OK).json(products);
  }

  async getImgByName({ params }: Request, response: Response): Promise<any> {
    const directory = resolve(__dirname, '..', 'uploads');
    return response
      .status(HttpStatus.OK)
      .sendFile(`${directory}/${params.name}`);
  }

  async show(
    { params }: Request,
    response: Response,
  ): Promise<Response<CreatedProductDto>> {
    const product = await this.productService.show(params.id);
    return response.status(HttpStatus.OK).json(product);
  }

  async update({ params, body }: Request, response: Response) {
    const product = await this.productService.update(params.id, body);
    return response.status(HttpStatus.NO_CONTENT).json(product);
  }

  async delete({ params }: Request, response: Response) {
    const product = await this.productService.delete(params.id);
    return response.status(HttpStatus.NO_CONTENT).json(product);
  }
}
