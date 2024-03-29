import { Component, Input } from '@angular/core';
import { ShoppingListService } from 'src/app/ShoppingList/shopping-list.service';
import { Recipe } from 'src/app/shared/recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  recipe: Recipe
  id: number

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router){}

  ngOnInit(){
    this.route.params.subscribe((params: Params) => {
      // + sign in front of the expression is a way to cast to integer
      this.id = +params['id']
      this.recipe = this.recipeService.getRecipe(this.id)
    })
  }

  onAddToShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
    
  }

  onEdit(){
    this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route})
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id)
    this.router.navigate(["/recipes"])
  }
}
