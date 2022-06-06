import { ValidationChain, body } from 'express-validator';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends CreateCategoryDto {
  static validators(): ValidationChain[] {
    return [body('name', 'Valor name não é uma string!').optional().isString()];
  }
}
