import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private chgSubscription: Subscription;

  constructor(private slService:ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.chgSubscription = this.slService.ingredientsChanged
                              .subscribe((ing : Ingredient[]) => {this.ingredients=ing});
  }

  onEditShoppingList(index: number) { 
    this.slService.shoppingEdited.next(index);
  }

  ngOnDestroy() {
    this.chgSubscription.unsubscribe();
  }

}
