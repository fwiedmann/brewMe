import { Recipe } from "./model";

interface Repository {
  create(recipe: Recipe): void;
  findAll(): Recipe[];
}
