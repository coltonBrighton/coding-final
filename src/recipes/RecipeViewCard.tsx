import { Button, Card, Dropdown } from "react-bootstrap";
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
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  // Mark the function as async to handle fetch properly
  const handleAddToMealPlan = async (recipe: recipe, day: string) => {
    try {
      const mealplanData = {
        recipeId: recipe.id,
        day: day
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
        setSelectedDay("")
      } else {
        throw new Error("Failed to add recipe")
      }
    } catch (error) {
      throw new Error("Failed to add recipe")
    }
  };

  return (
    <>
      <Card className="my-3 bg-light" style={{ width: 18 +"rem", minHeight: 400 + "px" }}>
        <Card.Body>
          <Card.Title>{recipe.name}</Card.Title>
          <Card.Text>{recipe.description}</Card.Text>
        </Card.Body>
        <div className="d-flex flex-column mt-auto mx-3">
          <Button
            variant="outline-primary"
            className="mb-3"
            onClick={() => handleButtonClick(recipe)}
          >
            View Recipe
          </Button>
          <Dropdown className="d-flex">
            <Dropdown.Toggle variant="outline-success" id="dropdown-basic" className="flex-grow-1 mb-3">
              {selectedDay || "Select a Day"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setSelectedDay("Sunday")}>Sunday</Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedDay("Monday")}>Monday</Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedDay("Tuesday")}>Tuesday</Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedDay("Wednesday")}>Wednesday</Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedDay("Thursday")}>Thursday</Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedDay("Friday")}>Friday</Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedDay("Saturday")}>Saturday</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button
          variant="outline-success"
          className="mb-3"
          onClick={() => handleAddToMealPlan(recipe, selectedDay || "")}
        >
          Add to Meal Plan
        </Button>
          <Button
            variant="outline-danger"
            className="mb-3"
            onClick={() => handleDelete(recipe.id)}
          >
            Delete
          </Button>
        </div>
      </Card>
    </>
  );
}
