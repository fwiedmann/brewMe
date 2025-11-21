import { findProps, findResult, Recipe } from "./model";

export interface RecipeRepository {
  create(recipe: Recipe): Promise<void>;
  find(props: findProps): Promise<findResult>;
}
