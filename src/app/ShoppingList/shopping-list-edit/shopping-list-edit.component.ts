import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy{
  

  @ViewChild('f') shoppingListForm: NgForm

  constructor(private shoppingListService: ShoppingListService){}
  subscription: Subscription
  editMode = false
  editedItemIndex: number
  editedItem: Ingredient

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe((index: number) => {
      this.editMode = true
      this.editedItemIndex = index
      this.editedItem = this.shoppingListService.getIngredient(index)
      this.shoppingListForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
    })
  }

  

  onAddItem(form: NgForm){
    const newIngredient = new Ingredient(form.value.name, form.value.amount)
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient)
    } else {
      this.shoppingListService.addIngredient(newIngredient)
    }
    this.editMode = false
    form.reset()
  }


  onClear(){
    this.shoppingListForm.reset()
    this.editMode = false
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.editedItemIndex)
    this.onClear()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
