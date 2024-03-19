import { Component, EventEmitter, Input, Output, AfterContentInit, OnDestroy } from '@angular/core';
import { Recipe } from '../../shared/recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnDestroy{

@Input() recipeDetails: Recipe

recipes: Recipe[] 
subscription: Subscription

constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute){}

ngOnInit(){
  this.subscription = this.recipeService.recipesChanged.subscribe((recipes: Recipe[]) => {
    this.recipes = recipes
  })
  this.recipes = this.recipeService.getRecipes()
}

ngOnDestroy(): void {
  this.subscription.unsubscribe()
}

onNewRecipe(){
  //Uses Router to navigate away and uses ActivatedRoute to say in witch page we are in
  this.router.navigate(['new'], {relativeTo: this.route})
}

}
