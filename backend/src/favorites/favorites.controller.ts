import { Controller, Post, Delete, Get, Body, Query, Headers, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse,ApiBearerAuth,ApiBody } from '@nestjs/swagger';
import { FavoritesService } from './favorites.service';
import { FirebaseService } from '../auth/firebase.service';

@ApiTags('Favorites')
@ApiBearerAuth()
@Controller('favorites')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly firebaseService: FirebaseService,
  ) {}

  async validateUser(token: string) {
    if (!token) {
      throw new UnauthorizedException('Token is required');
    }
    const decodedToken = await this.firebaseService.verifyToken(token);
    return decodedToken.uid;
  }

  @Post()
  @ApiOperation({ summary: 'Add an item to favorites using normalizedName' })
  @ApiResponse({ status: 200, description: 'Item added to favorites' })
  @ApiResponse({ status: 404, description: 'Item was not added to favorites' })
  @ApiBody({ schema: { type: 'object', properties: { normalizedName: { type: 'string' } } } }) // Swagger pokaże pole tekstowe
  async addFavorite(
    @Headers('Authorization') authHeader: string,
    @Body('normalizedName') normalizedName: string,
  ) {
    const token = authHeader?.split('Bearer ')[1];
    const userId = await this.validateUser(token);
    return this.favoritesService.addFavoriteItem(userId, normalizedName);
  }
  @Delete()
  @ApiOperation({ summary: 'Remove an item from favorites using normalizedName' })
  @ApiResponse({ status: 200, description: 'Item removed from favorites' })
  @ApiResponse({ status: 404, description: 'Item was npt removed from favorites' })
  async removeFavorite(
    @Headers('Authorization') authHeader: string,
    @Query('normalizedName') normalizedName: string,
  ) {
    const token = authHeader?.split('Bearer ')[1];
    const userId = await this.validateUser(token);
    return this.favoritesService.removeFavoriteItem(userId, normalizedName);
  }

  @Get()
  @ApiOperation({ summary: 'Get user favorite items' })
  @ApiResponse({ status: 200, description: 'User favorite items' })
  @ApiResponse({ status: 404, description: 'failed to load user favorite items' })
  async getFavorites(@Headers('Authorization') authHeader: string) {
    const token = authHeader?.split('Bearer ')[1];
    const userId = await this.validateUser(token);
    return this.favoritesService.getUserFavorites(userId);
  }
}
