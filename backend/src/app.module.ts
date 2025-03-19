import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ItemModule } from './items/items.module';
import { FavoritesModule } from './favorites/favorites.module';
import { FirebaseService } from './auth/firebase.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule,ItemModule,FavoritesModule],
  providers: [
    FirebaseService,
  ],
})
export class AppModule {}
