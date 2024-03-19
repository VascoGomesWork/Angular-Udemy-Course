import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "../shared/recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../ShoppingList/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()

export class RecipeService{

    recipesChanged = new Subject<Recipe[]>
    private recipes: Recipe[] = []
    /*private recipes: Recipe[] = [
        new Recipe(
            "A test recipe", 
            "this is a test", 
            "https://images.saymedia-content.com/.image/t_share/MTc0NjE4NDM3OTk2MzI0ODA5/how-to-write-original-food-recipes-10-tips-for-making-your-recipes-easy-to-follow.gif",
            [
                new Ingredient("Meat", 1),
                new Ingredient("French Fries", 20)
            ]),
        new Recipe(
            "Teste 2", 
            "A new REcipe TEst", 
            "https://th.bing.com/th/id/R.b7c886963e4859b6a45e713a56373b28?rik=nEVV2te1i99bjQ&pid=ImgRaw&r=0",
            [
                new Ingredient("Buns", 1),
                new Ingredient("Meat", 5)
            ])
    ]*/

    constructor(private shoppingListService: ShoppingListService){}

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes
        //Using the Subject to push a copy of our recipes to update in the front-end
        this.recipesChanged.next(this.recipes.slice())
    }

    getRecipes(){
        //Returns a copy of the recipes array to make sure it does not modify it
        return this.recipes.slice()
    }

    getRecipe(id: number){
        return this.recipes[id]
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.shoppingListService.addIngredients(ingredients)
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe)
        this.recipesChanged.next(this.recipes.slice())
    }

    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe
        this.recipesChanged.next(this.recipes.slice())
    }

    deleteRecipe(index: number){
        this.recipes.splice(index, 1)
        this.recipesChanged.next(this.recipes.slice())
    }

}