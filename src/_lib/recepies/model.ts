import { RecipeCreateError, Violation } from "./error";

type recipeProps = {
  name: string;
  phases: phase[];
  waterPart: number;
};

// TODO: Add a unique ID; validate the phase proportion to be not greater than 1 in total
// TODO: Use prisma ORM to spin up a postgres DB; implement repo
export class Recipe {
  private constructor(
    public readonly name: string,

    public readonly phases: phase[],
    public readonly waterPart: number,

    public readonly createdAt: Date,
    public readonly modifiedAt: Date | null
  ) {}

  static create({ name, phases = [], waterPart }: recipeProps) {
    const violations: Violation[] = [];
    if (!name || name === "") {
      violations.push({
        propertyName: "name",
        finding: "Name needs to be defined",
      });
    }

    violations.push(...validatePhases(phases));
    if (violations.length !== 0) {
      throw new RecipeCreateError(violations);
    }

    return new Recipe(name, phases, waterPart, new Date(), null);
  }
}

const validatePhases = (phases: phase[]): Violation[] => {
  const violations: Violation[] = [];
  if (!phases || phases.length === 0) {
    violations.push({
      propertyName: "phases",
      finding: "At least one phase is required",
    });
    return violations;
  }

  if (phases.length === 1 && phases.at(0)?.step === phaseStep.BLOOMING) {
    violations.push({
      propertyName: "phases",
      finding: `Single phase recipes can only be ${phaseStep.POUR_OVER}`,
    });
  }

  if (phases.map((p) => p.proportion).reduce((a, c) => a + c) !== 1) {
    violations.push({
      propertyName: "phases",
      finding: "Phases need to accumulate to a total of 1",
    });
  }
  return violations;
};

export type phase = {
  step: phaseStep;
  proportion: number;
};

export enum phaseStep {
  BLOOMING,
  POUR_OVER,
}
