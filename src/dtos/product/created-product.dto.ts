import { ProductEntity } from '../../entities/product.entity';
import { CreateProductDto } from './create-product.dto';

export class CreatedProductDto extends CreateProductDto {
  id!: string;

  constructor({ id, name }: ProductEntity) {
    super();
    this.id = id;
    this.name = name;
  }
}
