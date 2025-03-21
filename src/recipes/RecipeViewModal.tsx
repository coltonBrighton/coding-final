import { Button, Modal, Form } from "react-bootstrap";
import { recipe } from "../../types";
import { ChangeEvent, useEffect, useState } from "react";

type Props = {
  showModal: boolean;
  selectedRecipe: recipe;
  handleCloseModal: () => void;
  updateRecipe: (updatedRecipe: recipe) => void;
};

export default function RecipeViewModal({
  showModal,
  selectedRecipe,
  handleCloseModal,
  updateRecipe,
}: Props) {
  // State to hold edited recipe
  const [editedRecipe, setEditedRecipe] = useState<recipe>(selectedRecipe);
  const [isEditMode, setIsEditMode] = useState(false);

  // Update state when user updates input
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedRecipe({
      ...editedRecipe,
      [name]: value,
    });
  };

  const handleSaveClick = () => {
    // Pass the updated recipe object to updateRecipe
    updateRecipe(editedRecipe);  // This updates the parent state
    setIsEditMode(false);  // Exit edit mode
    handleCloseModal(); // Close modal after saving
  };

  // Sync editedRecipe state with selectedRecipe when selectedRecipe changes
  useEffect(() => {
    setEditedRecipe(selectedRecipe);  // Reset editedRecipe state when selectedRecipe changes
  }, [selectedRecipe]);

  const handleEditClick = () => {
    setIsEditMode(true); // Enable edit mode
  };

  return (
    <div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedRecipe.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isEditMode ? (
            <Form>
              <Form.Group controlId="recipeName">
                <Form.Label>Recipe Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={editedRecipe.name}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="recipeIngredients">
                <Form.Label>Ingredients</Form.Label>
                <Form.Control
                  as="textarea"
                  name="ingredients"
                  rows={3}
                  value={editedRecipe.ingredients}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="recipeInstructions">
                <Form.Label>Instructions</Form.Label>
                <Form.Control
                  as="textarea"
                  name="instructions"
                  rows={5}
                  value={editedRecipe.instructions}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          ) : (
            <>
              <h5>Ingredients:</h5>
              <p>{selectedRecipe.ingredients}</p>
              <h5>Instructions:</h5>
              <p>{selectedRecipe.instructions}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          {isEditMode ? (
            <Button variant="primary" onClick={handleSaveClick}>
              Save Changes
            </Button>
          ) : (
            <Button variant="info" onClick={handleEditClick}>
              Edit
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
