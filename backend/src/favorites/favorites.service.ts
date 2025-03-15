import { Injectable, NotFoundException } from "@nestjs/common";
import { FirebaseService } from "src/auth/firebase.service";

@Injectable()
export class FavoritesService{
    private db

    constructor(private readonly firebaseService:FirebaseService){
        this.db = this.firebaseService.getFirestore()
    }

    async addFavoriteItem(userId:string,normalizedName: string){
        const userRef= this.db.collection('favorites').doc(userId)
        const userFavorites = await userRef.get()

    if(!userFavorites.exists){
        await userRef.set({items:[normalizedName]})
    }else{
        const favorites=userFavorites.data()?.items || []
        if(!favorites.includes(normalizedName)){
            favorites.push(normalizedName);
            await userRef.update({items:favorites})
        }
    }
    return {message:'Item hase been added to favorites'}
    }

    async removeFavoriteItem(userId:string,normalizedName: string){
        const userRef = this.db.collection('favorites').doc(userId)
        const userFavorites = await userRef.get()


        if(!userFavorites.exists)
        {
            throw new NotFoundException('User has nop favorite items')
        }

        const favorites = userFavorites.data()?.items || [];
    const updatedFavorites = favorites.filter((fav: string) => fav !== normalizedName);

    await userRef.update({ items: updatedFavorites });
    return { message: `Item "${normalizedName}" removed from favorites` };
    }

    async getUserFavorites(userId: string) {
        const userRef = this.db.collection('favorites').doc(userId);
        const userFavorites = await userRef.get();
    
        if (!userFavorites.exists) {
          return { items: [] };
        }
    
        return { items: userFavorites.data()?.items || [] };
      }

}