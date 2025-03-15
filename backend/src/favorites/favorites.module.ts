import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { FirebaseService } from '../auth/firebase.service';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, FirebaseService],
})
export class FavoritesModule {}
