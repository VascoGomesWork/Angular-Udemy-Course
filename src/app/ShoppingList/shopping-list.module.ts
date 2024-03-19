import { NgModule } from "@angular/core";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { ShoppingListEditComponent } from "./shopping-list-edit/shopping-list-edit.component";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { CommonModule } from "@angular/common";
import { LogginService } from "../logging.service";

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingListEditComponent,
    ],
    imports: [
        SharedModule,
        FormsModule,
        RouterModule.forChild([
            {path: "", component: ShoppingListComponent, children: [
                { path: ":id/edit", component: ShoppingListEditComponent}
            ]},
        ])
    ],
    providers: [LogginService]
})

export class ShoppingListModule{

}