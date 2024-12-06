import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // create product api
  @Post('/new')
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    return await this.productService.createProduct(createProductDto);
  }

  @Get('/all')
  async getAllProducts(): Promise<Product[]> {
    return await this.productService.getAllProducts();
  }

  @Get('/:id')
  async getProductById(@Param('id') id: string): Promise<Product> {
    return await this.productService.getProductById(id); // 수정: 서비스 메소드 호출
  }

  @Put('/:id')
  async updateProductById(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<boolean> {
    return await this.productService.updateProductById(id, updateProductDto);
  }

  @Delete('/delete/:id') // :id를 추가하여 경로 매개변수 지정
  async deleteProduct(@Param('id') id: string): Promise<boolean> {
    // 반환 타입 수정
    return await this.productService.deleteProduct(id); // 서비스 메소드 호출
  }
}
