import { Button, Card } from "react-bootstrap";
import type { recipe, mealplan } from "../../types";
import { useEffect, useState } from "react";
import MealPlannerCard from "./MealPlannerCard";


export default function MealPlanner({}) {
  const [mealPlan, setMealPlan] = useState<mealplan[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:3000/mealplan");
        if (!response.ok) {
          throw new Error("failed to fetch recipes");
        }
        const data = await response.json();
        setMealPlan(data);
        console.log(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "an error occured");
      }
    };
    fetchRecipes();
  }, []);
  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:3000/mealplan/${id}`, { method: "DELETE" });
    setMealPlan((prevMeal) => prevMeal.filter((item) => item.id !== id));
  };
  return (
    <div>
      {mealPlan.map((mealplan) => (
        <MealPlannerCard handleDelete={handleDelete} />
      ))}
    </div>
  );
}
