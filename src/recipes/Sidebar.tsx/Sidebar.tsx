import RecipeAddForm from "./RecipeAddForm";
import { Card, Col } from "react-bootstrap";
import { recipe } from "../../../types";

type Props = {
  handleAddRecipe: (newRecipe: recipe) => void;
};

export default function Sidebar({ handleAddRecipe }: Props) {
  return (
    <Col
      sm={12}
      md={4}
      lg={3}
      className="d-flex justify-content-center h-75 g-0"
    >
      <Card className="m-3 bg-light" style={{ width: 18 + "rem" }}>
        <Card.Body>
          <Card.Title className="text-center">
            <h4>Add A New Recipe:</h4>
          </Card.Title>
          <RecipeAddForm handleAddRecipe={handleAddRecipe} />
        </Card.Body>
      </Card>
    </Col>
  );
}
