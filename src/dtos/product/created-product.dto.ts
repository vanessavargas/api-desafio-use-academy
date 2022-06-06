import { ProductEntity } from '../../entities/product.entity';
import { CreateProductDto } from './create-product.dto';

export class CreatedProductDto extends CreateProductDto {
  id!: string;

  constructor({
    name,
    description,
    value,
    person_count,
    disponibility,
    image,
    id,
    category,
  }: ProductEntity) {
    super();
    this.id = id;
    this.name = name;
    this.description = description;
    this.value = value;
    this.person_count = person_count;
    this.disponibility =
      typeof disponibility === 'string' && disponibility === 'true'
        ? true
        : false;
    this.image = image;
    this.categoryId = category.id;
  }
}
