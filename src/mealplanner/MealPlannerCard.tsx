import { Button, Card } from "react-bootstrap"
import { recipe, mealplan } from "../../types"

type Props = {
  handleDelete: (id: number | undefined) => void
  recipe: recipe | undefined
  mealPlan: mealplan
  handleButtonClick: (recipe: recipe | undefined) => void
}

export default function MealPlannerCard({
  handleDelete,
  recipe,
  mealPlan,
  handleButtonClick,
}: Props) {
  return (
    <div>
      <Card
        className="my-3 bg-light"
        key={mealPlan?.id}
        style={{ width: 18 + "rem", minHeight: 350 + "px" }}
      >
        <Card.Body>
          <Card.Title>{recipe?.name}</Card.Title>
          <Card.Text>{recipe?.description}</Card.Text>
        </Card.Body>
        <div className="d-flex flex-column mt-auto mx-3">
          <Button
            variant="outline-primary"
            className="mb-3"
            onClick={() => handleButtonClick(recipe)}
          >
            View Recipe
          </Button>
          <Button
            variant="outline-danger"
            className="mb-3"
            onClick={() => handleDelete(mealPlan?.id)}
          >
            Delete
          </Button>
        </div>
      </Card>
    </div>
  )
}
