import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { exhaustMap, map, take, tap } from 'rxjs/operators'
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    constructor(private _http: HttpClient, private recipeService: RecipeService,
        private authService: AuthService) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this._http.post("https://ng-recipe-shopping-store.firebaseio.com/recipes.json", recipes)
        .subscribe(response => {
            console.log(response);
        });
    }

    fetchRecipes() {
        // this.authService.user.pipe(take(1), exhaustMap(usr => {
        //     return this._http.get<{[key: string]: Recipe}>("https://ng-recipe-shopping-store.firebaseio.com/recipes.json",
        //     {
        //         params: new HttpParams().set('auth', usr.token)
        //     })
        // }),
        // map(responseData => {
        //     const recipes : Recipe[] = [];
        //     for (const key in responseData) {
        //         if (responseData.hasOwnProperty(key)) {
        //             recipes.push({...responseData[key]})
        //         }
        //     }
            
        //     return recipes.map(rec => {
        //         return {...rec, ings: rec.ings? rec.ings: []};
        //     })
        // }),
        // tap(recipes => {
        //     console.log(recipes);
        //     this.recipeService.setRecipes(recipes);
        // })
        // );
        // }
         return this._http.get<{[key: string]: Recipe}>("https://ng-recipe-shopping-store.firebaseio.com/recipes.json")
        .pipe(map(responseData => {
            const recipes : Recipe[] = [];
            for (const key in responseData) {
                if (responseData.hasOwnProperty(key)) {
                    recipes.push({...responseData[key]})
                }
            }
            
            return recipes.map(rec => {
                return {...rec, ings: rec.ings? rec.ings: []};
            })
        }),
        tap(recipes => {
            console.log(recipes);
            this.recipeService.setRecipes(recipes);
        })
        );
    }
}
        
    
