import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { ProductsRepository } from './products/products.repository';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'sqlite' as const,
        database: 'chaosdb.sqlite',
        autoLoadEntities: true,
      }),
    }),
    ProductsModule
  ],
})
export class AppModule { }
