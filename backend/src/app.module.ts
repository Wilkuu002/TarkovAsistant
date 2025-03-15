import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ItemModule } from './items/items.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule,ItemModule,FavoritesModule],
})
export class AppModule {}
