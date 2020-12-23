import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  editForm: FormGroup;

  get controls() {
    return (<FormArray>this.editForm.get('ings')).controls;
  }

  constructor(private route: ActivatedRoute, private recipeService: RecipeService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params
      .subscribe((
        (params: Params) => {
          this.id= +params['id'];
          this.editMode = params['id']!=null;
          this.initForm();
        }
      ));
  }

  onSubmit() {
    
    if(this.editMode) {
      this.recipeService.UpdateRecipe(this.id, this.editForm.value);
    }
    else {
      this.recipeService.AddRecipe(this.editForm.value);
    }
    this.onEditCancel();
  }

  private initForm() {
    let recipeName = '';
    let recipeImgPath = '';
    let recipeDesc = '';
    let recipeIngredients = new FormArray([]);
    
    if(this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImgPath = recipe.imagePath;
      recipeDesc = recipe.description;  
      
      if(recipe['ings']) {
        for (let ing of recipe.ings) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ing.name, Validators.required),
              'amount': new FormControl(ing.amount, [
                Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
    }

    this.editForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImgPath, Validators.required),
      'description': new FormControl(recipeDesc, Validators.required),
      'ings': recipeIngredients
    });
  }

  onAddIngredients() {
    (<FormArray>this.editForm.get('ings')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  onEditCancel() {
    this.router.navigate(['../'],{relativeTo: this.route});
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.editForm.get('ings')).removeAt(index);
  }

}
