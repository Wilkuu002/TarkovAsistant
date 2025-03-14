import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ItemModule } from './items/items.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule,ItemModule],
})
export class AppModule {}
