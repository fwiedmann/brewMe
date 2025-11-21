import { findProps, findResult, Recipe, recipeProps } from "./model";
import { RecipeRepository } from "./repository";
import { RecipePrismaRepository } from "./db/RecepiePrismaRepository";

export class RecipeService {
  constructor(private readonly repo: RecipeRepository) {}

  async createRecipe(createProps: recipeProps): Promise<Recipe> {
    const r = Recipe.create(createProps);
    await this.repo.create(r);
    return r;
  }

  async find(query: findProps): Promise<findResult> {
    return this.repo.find(query);
  }
}

const recipeServiceInstance = new RecipeService(new RecipePrismaRepository());
export default recipeServiceInstance;
