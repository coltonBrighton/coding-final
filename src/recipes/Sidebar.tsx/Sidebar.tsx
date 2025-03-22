import RecipeAddForm from "./RecipeAddForm"
import { Card, Col } from "react-bootstrap"
import { recipe } from "../../../types"

type Props = {
  handleAddRecipe: (newRecipe: recipe) => void;
};

export default function Sidebar({ handleAddRecipe }: Props) {
  return (
    <Col md={2}>
      <Card className="m-3 bg-light">
        <Card.Body>
          <Card.Title className="text-center"><h4>Add A New Recipe:</h4></Card.Title>
            <RecipeAddForm handleAddRecipe={handleAddRecipe} />
        </Card.Body>
      </Card>
    </Col>
  );
}
