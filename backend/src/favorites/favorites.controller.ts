import { Controller, Post, Delete, Get, Body, Query, Req,UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { FavoritesService } from './favorites.service';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Favorites')
@ApiBearerAuth()
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  @ApiOperation({ summary: 'Add an item to favorites by name' })
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Item added to favorites' })
  @ApiResponse({ status: 404, description: 'Item was not added to favorites' })
  @ApiBody({ schema: { type: 'object', properties: { normalizedName: { type: 'string' } } } }) 
  async addFavorite(@Req() req, @Body('normalizedName') normalizedName: string) {
    return this.favoritesService.addFavoriteItem(req.user.uid, normalizedName);
  }

  @Delete()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Remove an item from favorites by name' })
  @ApiResponse({ status: 200, description: 'Item removed from favorites' })
  @ApiResponse({ status: 404, description: 'Item was not removed from favorites' })
  async removeFavorite(@Req() req, @Query('normalizedName') normalizedName: string) {
    return this.favoritesService.removeFavoriteItem(req.user.uid, normalizedName);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get user favorite items' })
  @ApiResponse({ status: 200, description: 'User favorite items' })
  @ApiResponse({ status: 404, description: 'Failed to download user fav items' })
  async getFavorites(@Req() req) {
    return this.favoritesService.getUserFavorites(req.user.uid);
  }
}
