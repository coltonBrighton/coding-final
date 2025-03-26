import { Button, Modal } from "react-bootstrap";
import type { recipe } from "../../../types";
type Props = {
  showModal: boolean;
  closeModal: () => void;
  selectedRecipe: recipe;
};

export default function MealPlannerViewModal({
  showModal,
  closeModal,
  selectedRecipe,
}: Props) {
  return (
    <div>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedRecipe.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Ingredients:</h5>
          <p>{selectedRecipe.ingredients}</p>
          <h5>Instructions:</h5>
          <p>{selectedRecipe.instructions}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
