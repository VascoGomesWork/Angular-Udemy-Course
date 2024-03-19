import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../../shared/recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  @Input() recipeItem: Recipe
  @Input() index: number


  constructor(private recipeService: RecipeService){}


  

}
