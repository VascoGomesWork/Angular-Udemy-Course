import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Recipe } from '../shared/recipe.model';
import { RecipeService } from '../RecipeBook/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit{

  @Input() selectedRecipe: Recipe
  
  constructor(){}

  ngOnInit(){
    
  }

}
