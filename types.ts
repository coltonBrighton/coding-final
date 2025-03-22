export type recipe = {
    id: number
    name: string
    description: string
    ingredients: string
    instructions: string
    cuisine: string
    course: string
    tags: string[]
}

export type mealplan = {
    id: number
    recipeId: number
    day: string
}