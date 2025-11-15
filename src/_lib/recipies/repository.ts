import { Recipe } from "./model";

export interface RecipeRepository {
  create(recipe: Recipe): Promise<void>;
  findAll(): Promise<Recipe[]>;
}
