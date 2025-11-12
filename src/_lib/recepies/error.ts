export type Violation = {
  propertyName: string;
  finding: string;
};

export class RecipeCreateError extends Error {
  constructor(public readonly violations: Violation[]) {
    super(`Validation failed during creation. Violations: ${violations}`);
    this.name = "RecipeCreateError";
  }
}
