import { Controller, Get, NotFoundException, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ItemService } from "./items.service";

@ApiTags ('Items')
@Controller('items')
export class ItemController{
    constructor(private readonly itemService: ItemService){}

    @Get('search')
    @ApiOperation({ summary:'Search for item by name'})
    @ApiResponse({status:200,description:" Item has been found"})
    @ApiResponse({status:404,description:'Item has not been found'})
    async searchItem(@Query('normalizedName') normalizedName:string){
        const items = await this.itemService.searchItemByNormalizedName(normalizedName)
        {
            if(!items || items.length===0){
                throw new NotFoundException("!ites or items.len =0")
            }
            return items
        }
    }


    @Get()
    @ApiOperation({ summary: 'Get a paginated list of items' })
    @ApiResponse({status: 200,description:"List of items is loaded"})
    @ApiResponse({status: 404,description:"List of items is failed to load"})
    async getAllItems(
        @Query('page')page: number =1,
        @Query('limit') limit:number = 15
    ) {
        return await this.itemService.getAllItems(Number(page), Number(limit));
      }
}