"use server";

import { phase } from "@/src/_lib/recipies/model";
import recipeServiceInstance from "@/src/_lib/recipies/service";
import { revalidateTag } from "next/cache";

export type RecipeFormState = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
};
// TODO: add validation
export async function saveRecipe(
  phases: phase[],
  prevState: RecipeFormState,
  form: FormData
): Promise<RecipeFormState> {
  console.log(phases);
  console.log(form);

  await recipeServiceInstance.createRecipe({
    name: form.get("name") as string,
    phases: phases,
    waterPart: Number(form.get("waterPart") as string),
  });

  revalidateTag("recipes", { expire: 0 });
  return { success: true };
}
