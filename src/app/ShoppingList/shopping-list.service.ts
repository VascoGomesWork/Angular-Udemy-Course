import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

@Injectable()

export class ShoppingListService{

    private ingredientsArray: Ingredient[] = [new Ingredient("Apples", 5), new Ingredient("Tomatos", 10)]
    startedEditing = new Subject<number>
    public ingredientsChanged = new Subject<Ingredient[]>()

    getIngredients(){
        return this.ingredientsArray.slice()
    }

    getIngredient(index: number){
        return this.ingredientsArray[index]
      }

    addIngredient(ingredient: Ingredient){
        this.ingredientsArray.push(ingredient)

        //Emits a new event to show that the data has been changed
        this.ingredientsChanged.next(this.ingredientsArray.slice())
    }

    addIngredients(ingredients: Ingredient[]){
        //We can push and array to another array by using spread
        this.ingredientsArray.push(...ingredients)
        this.ingredientsChanged.next(this.ingredientsArray.slice())
    }

    updateIngredient(index: number, newIngredient: Ingredient){
        this.ingredientsArray[index] = newIngredient
        this.ingredientsChanged.next(this.ingredientsArray.slice())
    }

    deleteIngredient(index: number){
        this.ingredientsArray.splice(index, 1)
        this.ingredientsChanged.next(this.ingredientsArray.slice())
    }

}
