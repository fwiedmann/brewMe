import { phaseStep, Recipe, recipeProps } from "@/src/_lib/recipies/model";
import { NextResponse } from "next/server";
import recipeServiceInstance from "@/src/_lib/recipies/service";
import { RecipeCreateError } from "@/src/_lib/recipies/error";

export async function POST(request: Request) {
  try {
    const r = recipeServiceInstance.createRecipe(
      Recipe.create({ ...request.body } as recipeProps)
    );
    return NextResponse.json(r, { status: 201 });
  } catch (e) {
    if (e instanceof RecipeCreateError) {
      return NextResponse.json(
        { message: e.message, violations: e.violations },
        { status: 400 }
      );
    }
  }
}
