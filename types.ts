export type recipe = {
  id: number;
  name: string;
  description: string;
  ingredients: string;
  instructions: string;
};

export type mealplan = {
  id: number;
  recipeId: number;
  day: string;
};
