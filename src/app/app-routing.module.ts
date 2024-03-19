import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

const appRoutes: Routes = [
    { path: "", redirectTo:"/recipes", pathMatch: "full"}, //Recirects to the /recipes path if after the / is empty
    //Bug Fix -> https://stackoverflow.com/questions/70313032/type-string-is-not-assignable-to-type-loadchildrencallback
    { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(x=> x.RecipesModule)},
    { path: 'shopping-list', loadChildren: () => import('./ShoppingList/shopping-list.module').then(x=> x.ShoppingListModule)},
    { path: 'auth', loadChildren: () => import('./auth/auth.module').then(x=> x.AuthModule)}
    
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules}) //useHash is only used in production when server does not find the page
    ],
    exports: [RouterModule]
})

export class AppRoutingModule{}