import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @Column()
  name: string;

  @Column()
  desc: string;

  @Column()
  price: number;

  @Column()
  productImg: string;
}
