import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { recipe, mealplan } from '../../types'

type Props = {
    recipe: recipe
    mealplan: mealplan
    handleDelete: (id: number) => void
}

export default function MealPlannerCard({
    recipe,
    mealplan,
    handleDelete
}: Props) {
  return (
    <div>
        <Card className="my-3" key={mealplan.id}>
          <Card.Body>
            <Card.Title>{recipe.name}</Card.Title>
            <Card.Text>{recipe.description}</Card.Text>
            <Button
              variant="outline-primary"
              onClick={() => handleButtonClick(recipe)}
            >
              Cook Now!
            </Button>
            <Button
              variant="outline-danger"
              onClick={() => handleDelete(recipe.id)}
            >
              Delete
            </Button>
          </Card.Body>
        </Card>
    </div>
  )
}