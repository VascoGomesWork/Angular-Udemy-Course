import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { RecipeService } from "src/app/RecipeBook/recipe.service";
import { DataStorageService } from "src/app/shared/data-storage.service";
import { Recipe } from "src/app/shared/recipe.model";

@Injectable()
export class RecipesResolverService implements Resolve<Recipe[]>{

    constructor(private dataStorageService: DataStorageService, private recipesService: RecipeService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any{
        const recipes = this.recipesService.getRecipes()
        
        if(recipes.length === 0){
            return this.dataStorageService.fetchRecipes()
        } else {
            return recipes
        }
        
    }

}