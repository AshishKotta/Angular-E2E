
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    // https://ng-recipe-shopping-store.firebaseio.com/
    private recipes: Recipe[] = [
        new Recipe('A Test Recipe', 'This is simply a test',
            'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
            [
                new Ingredient('Buns', 4),
                new Ingredient('Eggs', 6)
            ], null),
        new Recipe('Another Test Recipe', 'This is simply a test',
            'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
            [
                new Ingredient('MilkMaid', 5),
                new Ingredient('Eggs', 6)
            ], null)
    ];

    // private recipes: Recipe[] = [];

    constructor(private slService : ShoppingListService) {}

    getRecipes() {
        return this.recipes.slice();
    }

    setRecipes(recipes : Recipe[]){
        console.log(recipes);
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    AddIngtoShopping(ingredients : Ingredient[]) {
        this.slService.AddIngredients(ingredients);
    }

    getRecipe(id: number) {
        return this.recipes[id];
    }

    AddRecipe(newrecipe: Recipe) {
        this.recipes.push(newrecipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    UpdateRecipe(id: number, updtrecipe: Recipe) {
        this.recipes[id] = updtrecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    DeleteRecipe(index: number) {
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
    }

}