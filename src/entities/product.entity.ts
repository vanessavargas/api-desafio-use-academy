import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', nullable: false })
  name!: string;

  @Column({ type: 'varchar', nullable: false })
  description!: string;

  @Column({ type: 'integer', nullable: false })
  value!: number;

  @Column({ type: 'integer', nullable: false })
  person_count!: number;

  @Column({ type: 'integer', nullable: false })
  disponibility!: number;

  @Column({ type: 'varchar', nullable: false })
  image!: string;

  @Column({ type: 'varchar', nullable: false })
  category_id!: string;
}
