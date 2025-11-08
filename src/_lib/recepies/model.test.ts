import { Recipe, phaseStep, type phase } from "./model"
import { RecipeCreateError } from "./error"

const pourOverPhase: phase = { step: phaseStep.POUR_OVER, proportion: 1 }
const bloomingPhase: phase = { step: phaseStep.BLOOMING, proportion: 0.2 }

const expectCreateError = (
    props: Parameters<typeof Recipe.create>[0],
    key: string,
    message: string
) => {
    try {
        Recipe.create(props)
        throw new Error("Expected Recipe.create to throw")
    } catch (error) {
        expect(error).toBeInstanceOf(RecipeCreateError)
        expect((error as RecipeCreateError).violations.get(key)).toBe(message)
    }
}

describe("Recipe.create", () => {
    it("returns a Recipe when all inputs are valid", () => {
        const recipe = Recipe.create({
            name: "Morning V60",
            phases: [bloomingPhase, pourOverPhase],
            waterPart: 16
        })

        expect(recipe.name).toBe("Morning V60")
        expect(recipe.phases).toEqual([bloomingPhase, pourOverPhase])
        expect(recipe.waterPart).toBe(16)
        expect(recipe.createdAt).toBeInstanceOf(Date)
        expect(recipe.modifiedAt).toBeNull()
    })

    it("requires a non-empty name", () => {
        expectCreateError(
            {
                name: "",
                phases: [pourOverPhase],
                waterPart: 16
            },
            "name",
            "name needs to be defined"
        )
    })

    it("requires at least one phase", () => {
        expectCreateError(
            {
                name: "Missing Phases",
                phases: [],
                waterPart: 15
            },
            "phases",
            "at least one phase is required"
        )
    })

    it("rejects single-phase recipes that only bloom", () => {
        expectCreateError(
            {
                name: "Bloom Only",
                phases: [bloomingPhase],
                waterPart: 14
            },
            "phases",
            `single phase recipes can only be ${phaseStep.POUR_OVER}`
        )
    })
})
