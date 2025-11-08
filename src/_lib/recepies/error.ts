export class RecipeCreateError extends Error {
    constructor(public readonly violations: Map<string, string>) {
        super(`Validation failed during creation. Violations: ${violations}`)
        this.name = "RecipeCreateError"
    }
}