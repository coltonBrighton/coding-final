import { FormEvent, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

type Props = {
  show: boolean;
  handleClose: () => void;
  handleAddRecipe: (newRecipe: any) => void
};

export default function RecipeAddForm({ show, handleClose, handleAddRecipe }: Props) {
    // State to store form data
  const [recipeName, setRecipeName] = useState("");
  const [recipeDescription, setRecipeDescription] = useState("");
  const [recipeIngredients, setRecipeIngredients] = useState("");
  const [recipeInstructions, setRecipeInstructions] = useState("");
  const [recipeCuisine, setRecipeCuisine] = useState("");

  // handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const recipeData = {
        name: recipeName,
        description: recipeDescription,
        ingredients: recipeIngredients,
        instructions: recipeInstructions,
        cuisine: recipeCuisine,
      };
      try {
        const response = await fetch("http://localhost:3000/recipe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(recipeData),
        });
  
        if (response.ok) {
          const newRecipe = await response.json()
          handleAddRecipe(newRecipe)
          handleClose(); // Close the modal after submitting
        } else {
          console.error("Failed to add recipe");
        }
      } catch (error) {
        console.error("Error:", error);
      }
  
  }
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add A New Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Label>Recipie Name:</Form.Label>
            <Form.Control 
                type="text" 
                aria-label="input recipe name" 
                placeholder="Recipe Name"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
            />
            <Form.Label>Breif Recipe Description:</Form.Label>
            <Form.Control 
                as="textarea" 
                aria-label="textarea for recipe description input" 
                placeholder="Recipe Description"
                value={recipeDescription}
                onChange={(e) => setRecipeDescription(e.target.value)}
                 />
            <Form.Label>Recipe Ingredients:</Form.Label>
            <Form.Control 
                as="textarea"
                aria-label="textarea for recipe ingredient input"
                placeholder="Recipe Ingredients"
                value={recipeIngredients}
                onChange={(e) => setRecipeIngredients(e.target.value)}
            />
            <Form.Label>Recipe Instructions:</Form.Label>
            <Form.Control 
                as="textarea"
                aria-label="textarea for recipe instruction input"
                placeholder="Recipe Instructions"
                value={recipeInstructions}
                onChange={(e) => setRecipeInstructions(e.target.value)}
            />
            <Form.Label>Recipie Cuisine:</Form.Label>
            <Form.Control 
                type="text"
                aria-label="input recipe cuisine"
                placeholder="Recipe Cuisine"
                value={recipeCuisine}
                onChange={(e) => setRecipeCuisine(e.target.value)}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add Recipe
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
