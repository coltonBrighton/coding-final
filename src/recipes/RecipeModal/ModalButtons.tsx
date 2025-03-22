import { Button } from "react-bootstrap";

type Props = {
  closeRecipeModal: () => void;
  handleSaveClick: () => void;
  handleEditClick: () => void;
  isEditMode: boolean;
};

export default function ModalButtons({
  closeRecipeModal,
  handleSaveClick,
  handleEditClick,
  isEditMode,
}: Props) {
  return (
    <>
      <Button variant="secondary" onClick={closeRecipeModal}>
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
    </>
  );
}
