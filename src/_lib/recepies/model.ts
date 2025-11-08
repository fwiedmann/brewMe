import { RecipeCreateError } from "./error"

type recipeProps = {
    name: string
    phases: phase[]
    waterPart: number
}

export class Recipe {
    private constructor(
        public readonly name: string,

        public readonly phases: phase[],
        public readonly waterPart: number,

        public readonly createdAt: Date,
        public readonly modifiedAt: Date | null
    ) { }

    static create({ name, phases = [], waterPart }: recipeProps) {
        const violations = new Map<string, string>()
        if (!name || name === "") {
            violations.set("name", "name needs to be defined")
        }

        if (!phases || phases.length === 0) {
            violations.set("phases", "at least one phase is required")
        }

        if (phases.length === 1 && phases.at(0)?.step === phaseStep.BLOOMING) {
            violations.set("phases", `single phase recipes can only be ${phaseStep.POUR_OVER}`)
        }

        if (violations.size !== 0) {
            throw new RecipeCreateError(violations)
        }

        return new Recipe(name, phases, waterPart, new Date(), null)
    }
}



export type phase = {
    step: phaseStep
    proportion: number
}

export enum phaseStep {
    BLOOMING,
    POUR_OVER
}
