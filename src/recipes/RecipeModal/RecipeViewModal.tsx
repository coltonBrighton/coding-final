import { Modal } from "react-bootstrap";
import { recipe } from "../../../types";
import { ChangeEvent, useEffect, useState } from "react";
import ModalButtons from "./ModalButtons";
import ModalForm from "./ModalForm";

type Props = {
  showModal: boolean;
  selectedRecipe: recipe;
  closeRecipeModal: () => void;
  updateRecipe: (updatedRecipe: recipe) => void;
};

export default function RecipeViewModal({
  showModal,
  selectedRecipe,
  closeRecipeModal,
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
    closeRecipeModal(); // Close modal after saving
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
      <Modal show={showModal} onHide={closeRecipeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedRecipe.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isEditMode ? (
            <ModalForm 
              handleChange={handleChange}
              editedRecipe={editedRecipe}
            />
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
          <ModalButtons  
            isEditMode={isEditMode} 
            closeRecipeModal={closeRecipeModal} 
            handleSaveClick={handleSaveClick} 
            handleEditClick={handleEditClick} 
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
}
