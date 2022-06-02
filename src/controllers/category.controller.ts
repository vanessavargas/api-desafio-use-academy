import { Request, Response } from 'express';
import { CreateCategoryDto } from '../dtos/category/create-category.dto';
import { CreatedCategoryDto } from '../dtos/category/created-category.dto';
import { CategoryService } from '../services/category.service';
import { HttpStatus } from '../utils/enums/http-status.enum';

interface ICategory {
  id?: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

interface CreateCategoryBody extends Request {
  body: CreateCategoryDto;
}

const categories: Array<ICategory> = [];

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  async getAll(request: Request, response: Response) {
    const categories = await this.categoryService.getAll();
    return response.status(HttpStatus.OK).json(categories);
  }

  async create(
    { body: { name } }: CreateCategoryBody,
    response: Response,
  ): Promise<Response<CreatedCategoryDto>> {
    const createdCategory = await this.categoryService.create({ name });
    return response.status(HttpStatus.CREATED).json(createdCategory);
  }
}
