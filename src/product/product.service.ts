import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // create product logic
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = this.productRepository.create(createProductDto); // 수정: DTO를 사용하여 새 인스턴스 생성
    return await this.productRepository.save(newProduct); // 수정: save 메소드를 사용하여 데이터베이스에 저장
  }

  // get all produts logic
  async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.find(); // 모든 제품을 조회
  }

  // get product by id logic
  async getProductById(id: string): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product)
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);

    return product;
  }

  // delete product by id
  async deleteProduct(id: string): Promise<boolean> {
    const result: DeleteResult = await this.productRepository.delete(id);
    if (!result.affected) {
      throw new HttpException('Product not found!', HttpStatus.NOT_FOUND);
    }
    return true; // 삭제 성공 시 true 반환
  }

  // update product by id
  async updateProductById(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<boolean> {
    const result: UpdateResult = await this.productRepository.update(
      id,
      updateProductDto,
    );
    if (!result.affected) {
      throw new HttpException('Product not found!', HttpStatus.NOT_FOUND);
    }
    return true;
  }
}
