import { unlink } from 'fs';
import { resolve } from 'path';
import { Repository, DataSource } from 'typeorm';
import { CreateProductDto } from '../dtos/product/create-product.dto';
import { CreatedProductDto } from '../dtos/product/created-product.dto';
import { UpdateProductDto } from '../dtos/product/update-product.dto';
import { ProductEntity } from '../entities/product.entity';
import { HttpException } from '../handler-exceptions/http-exception.provider';
import { HttpStatus } from '../utils/enums/http-status.enum';

export class ProductService {
  private productRepository: Repository<ProductEntity>;

  constructor(private readonly connection: DataSource) {
    this.productRepository = this.connection.getRepository(ProductEntity);
  }
  async create({
    categoryId,
    description,
    disponibility,
    image,
    name,
    value,
    person_count,
  }: CreateProductDto): Promise<CreatedProductDto> {
    try {
      const createProduct = this.productRepository.create({
        category: { id: categoryId },
        description,
        disponibility,
        image,
        name,
        value,
        person_count,
      });
      const saveProduct = await this.productRepository.save(createProduct);
      return new CreatedProductDto(saveProduct);
    } catch (error) {
      throw new HttpException(
        'Houve um erro ao cadastrar produto!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAll(): Promise<CreatedProductDto[]> {
    try {
      const products = await this.productRepository.find({
        relations: ['category'],
      });
      return products.map((product) => new CreatedProductDto(product));
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Houve um erro ao listar produtos!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async show(id: string): Promise<CreatedProductDto> {
    try {
      const product = await this.productRepository.findOne({
        relations: ['category'],
        where: { id },
      });
      if (!product) {
        throw new HttpException(
          'Produto não encontrado!',
          HttpStatus.NOT_FOUND,
        );
      }
      return new CreatedProductDto(product);
    } catch (error) {
      throw new HttpException(
        'Houve um erro ao recuperar o produto!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(
    id: string,
    {
      categoryId,
      description,
      disponibility,
      image,
      name,
      value,
      person_count,
    }: Partial<UpdateProductDto>,
  ): Promise<void> {
    const oldProduct = await this.productRepository.findOne({
      relations: ['category'],
      where: { id },
    });
    if (!oldProduct) {
      throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);
    }
    try {
      if (image) {
        unlink(
          resolve(__dirname, '..', '..', 'uploads', oldProduct.image),
          (error: NodeJS.ErrnoException | null) => {
            if (error) throw error;
          },
        );
      }
      const updateProduct = this.productRepository.merge(oldProduct, {
        description,
        disponibility,
        image,
        name,
        value,
        person_count,
        category: { id: categoryId },
      });
      await this.productRepository.save(updateProduct);
    } catch (error) {
      throw new HttpException(
        'Houve um erro ao atulizar produto!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.productRepository.delete(id);
    } catch (error) {
      throw new HttpException(
        'Houve um erro ao deletar produto!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
