import { Prisma, PrismaClient } from "@/src/generated/prisma/client";
import { findProps, findResult, phaseStep, Recipe } from "../model";
import { RecipeRepository } from "../repository";
import { SortOrder } from "@/src/generated/prisma/internal/prismaNamespace";

type RecipeWithPhases = Prisma.RecipeGetPayload<{
  include: { phases: true };
}>;

const mapRecipeWithPhases = (recipe: RecipeWithPhases): Recipe =>
  new Recipe(
    recipe.id,
    recipe.name,
    recipe.phases.map((p) => ({
      step: p.step as unknown as phaseStep,
      proportion: p.proportion,
    })),
    recipe.waterPart,
    recipe.createdAt,
    recipe.modifiedAt
  );

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
        phases: true,
      },
    });
    return c.map(mapRecipeWithPhases);
  }

  async find(props: findProps): Promise<findResult> {
    const sort = (props.sort ? props.sort : "acs") as SortOrder;

    const c = await this.pc.recipe.count();
    const rcps = await this.pc.recipe.findMany({
      orderBy: {
        createdAt: props.sortBy === "createdAt" ? sort : undefined,
      },
      skip: props.skip,
      take: props.take,
      include: {
        phases: true,
      },
    });

    return {
      count: c,
      recipes: rcps.map(mapRecipeWithPhases),
    };
  }
}
