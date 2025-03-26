import type { recipe, mealplan } from "../../types";
import { useEffect, useState } from "react";
import { Alert, Container, Spinner } from "react-bootstrap";

import MealPlannerViewModal from "./daily-recipies/MealPlannerViewModal";
import MealPlannerDetails from "./daily-recipies/MealPlannerDetails";

export default function MealPlanner({}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recipe, setRecipe] = useState<recipe[]>([]);
  const [mealPlan, setMealPlan] = useState<mealplan[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<recipe | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchData = async () => {
      // update backend
      try {
        const [mealPlanResponse, recipeResponse] = await Promise.all([
          fetch("http://localhost:3000/mealplan"),
          fetch("http://localhost:3000/recipe"),
        ]);

        if (!mealPlanResponse.ok) {
          throw new Error("Failed to fetch Meal Plans");
        }
        if (!recipeResponse.ok) {
          throw new Error("Failed to fetch recipes");
        }

        // parse to json
        const [mealPlanData, recipeData] = await Promise.all([
          mealPlanResponse.json(),
          recipeResponse.json(),
        ]);

        // update mealPlan and recipe state
        setMealPlan(mealPlanData);
        setRecipe(recipeData);
      } catch (err) {
        // update error state if error occurs
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        // update loading state
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // find the recipe.id with its corresponding recipeId in the mealplan data
  const getRecipeById = (recipeId: number) => {
    return recipe.find((r) => recipeId === r.id);
  };

  // grab mealplan item by id delete from backend and filter it out from frontend
  const handleDelete = async (id: number | undefined) => {
    await fetch(`http://localhost:3000/mealplan/${id}`, { method: "DELETE" });
    setMealPlan((prevMeal) => prevMeal.filter((item) => item.id !== id));
  };

  // Prepare mealPlan data with the associated recipes
  const mealPlanWithRecipes = mealPlan.map((meal) => {
    const mealRecipe = getRecipeById(meal.recipeId); // Find the recipe by recipeId
    return {
      ...meal,
      mealRecipe, // Add the found recipe to the mealPlan object
    };
  });

  const handleButtonClick = (recipe: recipe | undefined) => {
    // show modal and set recipe as selected recipe
    setSelectedRecipe(recipe);
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false); // close modal
  return (
    <div className="bg-dark min-vh-100">
      <Container className="mt-3">
        {loading && (
          <div className="d-flex justify-content-center mt-5">
            <Spinner animation="border" variant="success" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}

        {error && <Alert variant="danger">{error}</Alert>}
        <MealPlannerDetails
          handleDelete={handleDelete}
          mealPlanWithRecipes={mealPlanWithRecipes}
          handleButtonClick={handleButtonClick}
          dayOfTheWeek={"Sunday"}
        />
        <MealPlannerDetails
          handleDelete={handleDelete}
          mealPlanWithRecipes={mealPlanWithRecipes}
          handleButtonClick={handleButtonClick}
          dayOfTheWeek={"Monday"}
        />
        <MealPlannerDetails
          handleDelete={handleDelete}
          mealPlanWithRecipes={mealPlanWithRecipes}
          handleButtonClick={handleButtonClick}
          dayOfTheWeek={"Tuesday"}
        />
        <MealPlannerDetails
          handleDelete={handleDelete}
          mealPlanWithRecipes={mealPlanWithRecipes}
          handleButtonClick={handleButtonClick}
          dayOfTheWeek={"Wednesday"}
        />
        <MealPlannerDetails
          handleDelete={handleDelete}
          mealPlanWithRecipes={mealPlanWithRecipes}
          handleButtonClick={handleButtonClick}
          dayOfTheWeek={"Thursday"}
        />
        <MealPlannerDetails
          handleDelete={handleDelete}
          mealPlanWithRecipes={mealPlanWithRecipes}
          handleButtonClick={handleButtonClick}
          dayOfTheWeek={"Friday"}
        />
        <MealPlannerDetails
          handleDelete={handleDelete}
          mealPlanWithRecipes={mealPlanWithRecipes}
          handleButtonClick={handleButtonClick}
          dayOfTheWeek={"Saturday"}
        />
        {selectedRecipe && (
          <MealPlannerViewModal
            showModal={showModal}
            selectedRecipe={selectedRecipe}
            closeModal={closeModal}
          />
        )}
      </Container>
    </div>
  );
}
