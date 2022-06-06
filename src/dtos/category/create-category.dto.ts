import { body, ValidationChain } from 'express-validator';
import { RequestDto } from '../request-dto/request.dto';

export class CreateCategoryDto extends RequestDto {
  name!: string;

  static validators(): ValidationChain[] {
    return [
      body('name', 'Valor name não é uma string!').isString(),
      body('name', 'O campo name é obrigatório!')
        .not()
        .isEmpty({ ignore_whitespace: true }),
    ];
  }
}
