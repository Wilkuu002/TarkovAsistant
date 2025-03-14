import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { request, gql } from 'graphql-request';

@Injectable()
export class ItemService{

    

    private readonly API_URL = 'https://api.tarkov.dev/graphql';

    async searchItemByNormalizedName(normalizedName:string): Promise <any>{
        const query = gql`
      query SearchItem($normalizedName: String!) {
        item(normalizedName:$normalizedName) {
          name
          avg24hPrice
        }
      }
    `;

try {
    interface TarkovApiResponse{
        item:{
            name:string;
            avg24hPrice:number;
        } | null;
    }
    const data= await request<TarkovApiResponse>(this.API_URL,query,{normalizedName})
if(!data.item){
    throw new NotFoundException(`Item "${normalizedName}" was not found`)
}

    return data.item
}catch(error)
{
    console.error("Error fetching item", error)
    throw new InternalServerErrorException('Fail to fetch item data')
}

    }
    async getAllItems(page:number,limit:number):Promise <any>{
        const offset=(page-1)*limit

        const query =gql`
        query GetItems($limit: Int!, $offset: Int!){
        items(limit:$limit, offset:$offset){
        name
        avg24hPrice
        }
        }
        `;
        try{
            interface TarkovApiResponse{
                items:{
                    name:string;
                    avg24hPrice:number;
                }[];
            }
       
        const variables = { limit, offset };
        const data = await request<TarkovApiResponse>(this.API_URL, query, variables);
        return {
            currentPage: page,
            itemsPerPage: limit,
            items: data.items,
          };
        }catch(error){
            console.error("Error fetching page of items",error)
            throw new InternalServerErrorException("Failed to featch item data for item pages")
        }
    }
    //123
}