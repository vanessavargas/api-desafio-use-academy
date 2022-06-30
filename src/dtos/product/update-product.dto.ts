import { body, ValidationChain } from 'express-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends CreateProductDto {
  constructor() {
    super();
  }
  static validators(): ValidationChain[] {
    return [
      body('name', 'O campo name deve ser uma string!').optional().isString(),
      body('description', 'O campo description deve ser uma string!')
        .optional()
        .isString(),
      body('value', 'O campo value deve ser um número!').optional().isNumeric(),
      body('disponibility', 'O campo disponibility deve ser um booleano!')
        .optional()
        .isBoolean(),
      body('categoryId', 'O campo categoryId deve ser uma string!')
        .optional()
        .isString(),
      body('categoryId', 'O campo categoryId deve ser um UUID!')
        .optional()
        .isUUID(),
    ];
  }
}
