import { Form } from "react-bootstrap";
import { recipe } from "../../../types";
import { ChangeEvent } from "react";

type Props = {
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  editedRecipe: recipe;
};

export default function ModalForm({ handleChange, editedRecipe }: Props) {
  return (
    <>
      <Form>
        <Form.Group controlId="recipeName">
          <Form.Label>Recipe Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={editedRecipe.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="recipeDescription">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            rows={3}
            value={editedRecipe.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="recipeIngredients">
          <Form.Label>Ingredients:</Form.Label>
          <Form.Control
            as="textarea"
            name="ingredients"
            rows={3}
            value={editedRecipe.ingredients}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="recipeInstructions">
          <Form.Label>Instructions:</Form.Label>
          <Form.Control
            as="textarea"
            name="instructions"
            rows={5}
            value={editedRecipe.instructions}
            onChange={handleChange}
          />
        </Form.Group>
      </Form>
    </>
  );
}
