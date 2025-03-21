import { Button, Card } from "react-bootstrap";
import type { recipe, mealplan } from "../../types";
import { useState } from "react";

type Props = {
  recipe: recipe;
  handleButtonClick: (recipe: recipe) => void;
  handleDelete: (recipeId: number) => void;
};

export default function RecipeViewCard({
  recipe,
  handleButtonClick,
  handleDelete,
}: Props) {
  const [mealPlan, setMealPlan] = useState<mealplan[]>([]);

  // Mark the function as async to handle fetch properly
  const handleAddToMealPlan = async (recipe: recipe) => {
    try {
      const mealplanData = {
        recipeid: recipe.id,
        name: recipe.name,
        description: recipe.description,
      };

      const response = await fetch("http://localhost:3000/mealplan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mealplanData),
      });

      if (response.ok) {
        const newRecipe = await response.json();
        const newMealPlan = [...mealPlan, newRecipe]; // Add the new recipe to meal plan
        setMealPlan(newMealPlan);
      } else {
        console.error("Failed to add recipe");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Card className="my-3">
        <Card.Body>
          <Card.Title>{recipe.name}</Card.Title>
          <Card.Text>{recipe.description}</Card.Text>
          <Button variant="outline-primary" onClick={() => handleButtonClick(recipe)}>
            Cook Now!
          </Button>
          <Button 
            className="mx-3"
            variant="outline-success"
            onClick={() => handleAddToMealPlan(recipe)} // Correctly invoke the function
          >
            Add To Meal Plan
          </Button>
          <Button variant="outline-danger" onClick={() => handleDelete(recipe.id)}>
            Delete
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}
