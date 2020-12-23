import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();
    shoppingEdited = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
      ];

      getIngredients() {
          return this.ingredients.slice();
      }

      getIngredient(index: number) { 
        return this.ingredients[index];
      }

      updateIngredient(index: number, newIng: Ingredient) {
        this.ingredients[index] = newIng;
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      deleteIngredient(index: number) {
        this.ingredients.splice(index,1);
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      AddIngredient(ingredient : Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      AddIngredients(ingds : Ingredient[]) {
        //   for (let ing of ingds) {
        //       this.AddIngredient(ing);
        //   }
          this.ingredients.push(...ingds);
          this.ingredientsChanged.next(this.ingredients.slice());
      }
}