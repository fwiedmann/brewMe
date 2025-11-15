import { PrismaClient } from "@/src/generated/prisma/client";
import { phaseStep, Recipe } from "../model";
import { RecipeRepository } from "../repository";

export class RecipePrismaRepository implements RecipeRepository {
  private pc: PrismaClient = new PrismaClient();

  async create(recipe: Recipe): Promise<void> {
    await this.pc.recipe.create({
      data: {
        id: recipe.id,
        createdAt: recipe.createdAt,
        waterPart: recipe.waterPart,
        name: recipe.name,
        phases: {
          createMany: {
            data: recipe.phases.flatMap((p) => ({
              step: p.step.toString(),
              proportion: p.proportion,
            })),
          },
        },
      },
    });
  }

  async findAll(): Promise<Recipe[]> {
    const c = await this.pc.recipe.findMany({
      include: {
        phases: {},
      },
    });
    return c.map(
      (r) =>
        new Recipe(
          r.id,
          r.name,
          r.phases.flatMap((p) => ({
            step: p.step as unknown as phaseStep,
            proportion: p.proportion,
          })),
          r.waterPart,
          r.createdAt,
          r.modifiedAt
        )
    );
  }
}
