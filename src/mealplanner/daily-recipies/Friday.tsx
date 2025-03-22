import type { recipe } from "../../../types";
import { Button, Col, Row, Stack } from "react-bootstrap";
import MealPlannerCard from "../MealPlannerCard";
import { useState } from "react";
type Props = {
  handleDelete: (id: number | undefined) => void;
  mealPlanWithRecipes: {
    mealRecipe: recipe | undefined;
    id: number;
    recipeId: number;
    day: string;
  }[];
  handleButtonClick: (recipe: recipe | undefined) => void
};

export default function Friday({
  handleDelete,
  mealPlanWithRecipes,
  handleButtonClick
}: Props) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed((prevState) => !prevState);
  };
  return (
    <div className="text-light">
      <Stack direction="horizontal">
        <h3 className="display-3 mx-3">Friday</h3>
        <Button
          variant="outline-light"
          className="text-light"
          onClick={toggleCollapse}
        >
          {collapsed ? "Show Meals" : "Hide Meals"}
        </Button>
      </Stack>
      <hr></hr>
      <Row>
        {!collapsed &&
          mealPlanWithRecipes
            .filter((meal) => meal.day === "friday")
            .map((meal) => (
              <Col
                key={meal.id}
                sm={12}
                md={8}
                lg={4}
                className="d-flex justify-content-center"
              >
                <MealPlannerCard
                  handleDelete={handleDelete}
                  recipe={meal.mealRecipe}
                  mealPlan={meal}
                  handleButtonClick={handleButtonClick}
                />
              </Col>
            ))}
      </Row>
    </div>
  );
}
