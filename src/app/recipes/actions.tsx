"use server";

import { phaseStep } from "@/src/_lib/recipies/model";
import recipeServiceInstance from "@/src/_lib/recipies/service";
import { revalidateTag } from "next/cache";

export type RecipeFormState = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
};
// TODO: add validation
export async function saveRecipe(
  prevState: RecipeFormState,
  form: FormData
): Promise<RecipeFormState> {
  await recipeServiceInstance.createRecipe({
    name: form.get("name") as string,
    phases: [
      {
        proportion: 1,
        step: phaseStep.POUR_OVER,
      },
    ],
    waterPart: Number(form.get("waterPart") as string),
  });

  revalidateTag("recipes", { expire: 0 });
  return { success: true };
}
