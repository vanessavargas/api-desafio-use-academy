import { CategoryEntity } from '../../entities/category.entity';
import { CreateCategoryDto } from './create-category.dto';

export class CreatedCategoryDto extends CreateCategoryDto {
  id!: string;

  constructor({ id, name }: CategoryEntity) {
    super();
    this.id = id;
    this.name = name;
  }
}
