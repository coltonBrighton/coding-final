import type { recipe } from "../../../types"
import { Button, Col, Row, Stack } from "react-bootstrap"
import MealPlannerCard from "../MealPlannerCard"
import { useState } from "react"
type Props = {
  handleDelete: (id: number | undefined) => void
  mealPlanWithRecipes: {
    mealRecipe: recipe | undefined
    id: number
    recipeId: number
    day: string
  }[]
  handleButtonClick: (recipe: recipe | undefined) => void
  dayOfTheWeek: string
}

export default function MealPlannerDetails({
  handleDelete,
  mealPlanWithRecipes,
  handleButtonClick,
  dayOfTheWeek,
}: Props) {
  const [collapsed, setCollapsed] = useState(false)
  // function to show or hide reciepes
  const toggleCollapse = () => {
    setCollapsed((collapsed) => !collapsed)
  }
  return (
    <div className="text-light">
      <Stack direction="horizontal">
        <h3 className="display-1 ms-auto">{dayOfTheWeek}</h3>
        <Button
          variant="outline-light"
          className="text-light mt-3 me-auto ms-3"
          onClick={toggleCollapse}
        >
          {collapsed ? "Show Meals" : "Hide Meals"}
        </Button>
      </Stack>
      <hr></hr>
      <Row>
        {!collapsed &&
          mealPlanWithRecipes
            .filter((meal) => meal.day === dayOfTheWeek)
            .map((meal) => (
              <Col
                key={meal.id}
                sm={12}
                md={6}
                lg={4}
                className="d-flex justify-content-center p-0"
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
  )
}
