import { ThrowStmt } from '@angular/compiler';
import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) slForm: NgForm;
  subscription: Subscription;
  editMode=false;
  editItemIndex : number;
  editItem: Ingredient;
    
  constructor(private slService : ShoppingListService) { }

  ngOnInit() {
    this.subscription= this.slService.shoppingEdited
      .subscribe(
        (index:number) => {
          this.editMode=true;
          this.editItemIndex=index;
          this.editItem = this.slService.getIngredient(index);
          this.slForm.setValue({
            ingName: this.editItem.name,
            ingAmount: this.editItem.amount
          })
        }
      );
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.ingName, value.ingAmount);
    if(this.editMode) {
      console.log(this.editItemIndex, this.editItem)
      this.slService.updateIngredient(this.editItemIndex, newIngredient);
    }
    else {
      this.slService.AddIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
    
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.slService.deleteIngredient(this.editItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
