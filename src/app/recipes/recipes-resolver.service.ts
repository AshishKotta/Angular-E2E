import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({providedIn:'root'})
export class RecipeResolverService implements Resolve<Recipe[]> {

    constructor(private dataService: DataStorageService, private recService : RecipeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const recipes = this.recService.getRecipes();

        if(recipes.length === 0) {
            return this.dataService.fetchRecipes();
        }
        else {
            return recipes;
        }
        
    }

}