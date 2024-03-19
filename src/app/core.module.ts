import { NgModule } from "@angular/core";
import { RecipeService } from "./RecipeBook/recipe.service";
import { ShoppingListService } from "./ShoppingList/shopping-list.service";
import { DataStorageService } from "./shared/data-storage.service";
import { RecipesResolverService } from "./recipes/recipe-start/recipes-resolver.service";
import { AuthService } from "./auth/auth.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { AuthGuard } from "./auth/auth.guard";
import { LogginService } from "./logging.service";

@NgModule({
    providers: [
        RecipeService, 
        ShoppingListService, 
        DataStorageService, 
        RecipesResolverService, 
        AuthService, 
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}, 
        AuthGuard
    ]
})
export class CoreModule{

}