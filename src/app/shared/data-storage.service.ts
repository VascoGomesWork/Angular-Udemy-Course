import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../RecipeBook/recipe.service";
import { Recipe } from "./recipe.model";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";


@Injectable()

export class DataStorageService {

    //We are injecting the recipes service because it is easier to get the data from the recipeService
    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService){}

    storeRecipes(){
        const recipes = this.recipeService.getRecipes()
        //We are not subscribing in the component because we don't need a spinner component to be showned so the subscription will be treated here
        this.http.put("https://ng-course-recipe-book-5bfbe-default-rtdb.firebaseio.com/recipes.json", recipes).subscribe(response => {
            console.log(response)
        })
    }
//
    fetchRecipes() {
        return this.authService.user.pipe(
        take(1),
        exhaustMap(user => {
            return this.http.get<Recipe[]>(
                "https://ng-course-recipe-book-5bfbe-default-rtdb.firebaseio.com/recipes.json",
            {
                params: new HttpParams().set('auth', user.getToken())
            }
            );
        }),
        map(recipes => {
            return recipes.map(recipe => {
            return {
                ...recipe,
                ingredients: recipe.ingredients ? recipe.ingredients : []
            };
            });
        }),
        tap(recipes => {
            this.recipeService.setRecipes(recipes);
        })
        );
    }

}