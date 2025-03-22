import type { recipe, mealplan } from "../../types";
import { useEffect, useState } from "react";
import { Alert, Container, Spinner } from "react-bootstrap";
import Sunday from "./daily-recipies/Sunday";
import Monday from "./daily-recipies/Monday";
import Tuesday from "./daily-recipies/Tuesday";
import Wednesday from "./daily-recipies/Wednesday";
import Thursday from "./daily-recipies/Thursday";
import Friday from "./daily-recipies/Friday";
import Saturday from "./daily-recipies/Saturday";
import MealPlannerViewModal from "./daily-recipies/MealPlannerViewModal";

export default function MealPlanner({}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null)
  const [recipe, setRecipe] = useState<recipe[]>([])
  const [mealPlan, setMealPlan] = useState<mealplan[]>([])
  const [showModal, setShowModal] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState<recipe | undefined>(undefined)

  useEffect(() => {
    const fetchData = async () => {
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

        const [mealPlanData, recipeData] = await Promise.all([
          mealPlanResponse.json(),
          recipeResponse.json(),
        ]);

        setMealPlan(mealPlanData);
        setRecipe(recipeData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getRecipeById = (recipeId: number) => {
    return recipe.find((r) => recipeId === r.id);
  };

  // grab mealplan item by id and filter it out to delete it
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
    // Open Modal, set selected recipe
    setSelectedRecipe(recipe);
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false); // close modal
  return (
    <div className="bg-dark min-vh-100">
      <Container>
        {loading && (
          <div className="d-flex justify-content-center mt-5">
            <Spinner animation="border" variant="success" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}

        {error && <Alert variant="danger">{error}</Alert>}
        <Sunday
          handleDelete={handleDelete}
          mealPlanWithRecipes={mealPlanWithRecipes}
          handleButtonClick={handleButtonClick}
        />
        <Monday
          handleDelete={handleDelete}
          mealPlanWithRecipes={mealPlanWithRecipes}
          handleButtonClick={handleButtonClick}
        />
        <Tuesday
          handleDelete={handleDelete}
          mealPlanWithRecipes={mealPlanWithRecipes}
          handleButtonClick={handleButtonClick}
        />
        <Wednesday
          handleDelete={handleDelete}
          mealPlanWithRecipes={mealPlanWithRecipes}
          handleButtonClick={handleButtonClick}
        />
        <Thursday
          handleDelete={handleDelete}
          mealPlanWithRecipes={mealPlanWithRecipes}
          handleButtonClick={handleButtonClick}
        />
        <Friday
          handleDelete={handleDelete}
          mealPlanWithRecipes={mealPlanWithRecipes}
          handleButtonClick={handleButtonClick}
        />
        <Saturday
          handleDelete={handleDelete}
          mealPlanWithRecipes={mealPlanWithRecipes}
          handleButtonClick={handleButtonClick}
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
