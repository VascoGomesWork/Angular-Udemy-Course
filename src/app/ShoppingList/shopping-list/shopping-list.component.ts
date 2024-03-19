import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs';
import { LogginService } from 'src/app/logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{

ingredientsArray: Ingredient[]
private subscrition: Subscription

constructor(private shoppingListService: ShoppingListService, private loggingService: LogginService){}

ngOnInit(){
  // Gets the data from service when the component is loaded
 this.ingredientsArray = this.shoppingListService.getIngredients()
 
  // Gets new data from the service once the event get's emitted with new data
  // It is then needed to be subscribed to get the flow of data to update the view
 this.subscrition = this.shoppingListService.ingredientsChanged.subscribe(
  (ingredients: Ingredient[]) => {
    this.ingredientsArray = ingredients
  }
 )

 this.loggingService.printLog("Hello from ShoppingList Component ngOnInit")
}

ngOnDestroy(): void {
  this.subscrition.unsubscribe()
}

onEditItem(index: number){
  //Emistting the index to shopping-list-edit component can use it
  this.shoppingListService.startedEditing.next(index)
}

}
