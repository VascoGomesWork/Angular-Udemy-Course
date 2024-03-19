import { NgModule } from "@angular/core";
import { RecipeListComponent } from "../RecipeBook/recipe-list/recipe-list.component";
import { RecipeItemComponent } from "../RecipeBook/recipe-item/recipe-item.component";
import { RecipeDetailComponent } from "../RecipeBook/recipe-detail/recipe-detail.component";
import { RecipesComponent } from "./recipes.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        RecipeListComponent,
        RecipeItemComponent,
        RecipeDetailComponent,
        RecipesComponent,
        RecipeStartComponent,
        RecipeEditComponent,
    ],
    imports: [RouterModule, SharedModule, ReactiveFormsModule, RecipesRoutingModule],
    
})

export class RecipesModule{

}