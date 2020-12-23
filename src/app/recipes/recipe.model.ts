import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;
  public ings: Ingredient[];
  public id ?: String;

  constructor(name: string, desc: string, imagePath: string, ings: Ingredient[], id: String) {
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.ings=ings;
    this.id = id;
  }
}
