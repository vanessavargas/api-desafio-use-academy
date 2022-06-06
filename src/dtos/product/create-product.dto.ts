import { ValidationChain, body } from 'express-validator';
import { RequestDto } from '../request-dto/request.dto';

export class CreateProductDto extends RequestDto {
  name!: string;
  description!: string;
  value!: number;
  person_count!: number;
  disponibility!: boolean;
  image!: string;
  categoryId!: string;

  static validators(): ValidationChain[] {
    return [
      body('name', 'O campo name deve ser uma string!').isString(),
      body('name', 'O campo name é obrigatório!').notEmpty({
        ignore_whitespace: true,
      }),
      body(
        'description',
        'O campo description deve ser uma string!',
      ).isString(),
      body('description', 'O campo description é obrigatório!').notEmpty({
        ignore_whitespace: true,
      }),
      body('value', 'O campo value deve ser um número!').isNumeric(),
      body('value', 'O campo value é obrigatório!').notEmpty({
        ignore_whitespace: true,
      }),
      body(
        'person_count',
        'O campo person_count deve ser um número!',
      ).isNumeric(),
      body('person_count', 'O campo person_count é obrigatório!').notEmpty({
        ignore_whitespace: true,
      }),
      body(
        'disponibility',
        'O campo disponibility deve ser um booleano!',
      ).isBoolean(),
      body('disponibility', 'O campo disponibility é obrigatório!').notEmpty({
        ignore_whitespace: true,
      }),
      body('disponibility', 'O campo disponibility é obrigatório!').notEmpty(),
      body('categoryId', 'O campo categoryId é obrigatório!').notEmpty(),
      body('categoryId', 'O campo categoryId deve ser uma string!').isString(),
      body('categoryId', 'O campo categoryId é obrigatório!').notEmpty(),
      body('categoryId', 'O campo categoryId deve ser um UUID!').isUUID(),
    ];
  }
}
