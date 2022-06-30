import { ProductEntity } from '../../entities/product.entity';
import { CreateProductDto } from './create-product.dto';

export class CreatedProductDto extends CreateProductDto {
  id!: string;
  created_at?: Date;
  updated_at?: Date;

  constructor({
    name,
    description,
    value,
    person_count,
    disponibility,
    image,
    id,
    category,
    created_at,
    updated_at,
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
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
