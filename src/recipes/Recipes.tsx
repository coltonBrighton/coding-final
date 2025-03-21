import { useEffect, useState } from "react";
import { Button, Container} from "react-bootstrap";
import type { recipe } from "../../types";
import RecipeViewModal from "./RecipeViewModal";
import RecipeViewCard from "./RecipeViewCard";
import RecipeAddForm from "./RecipeAddForm";

export default function Recipes() {
  const [recipe, setRecipe] = useState<recipe[]>([])
  const [error, setError] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<recipe | null>(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // fetch recipes from backend
  useEffect(() => {
    const fetchRecipes = async () => {
        try{
            const response = await fetch("http://localhost:3000/recipe")
            if (!response.ok) {
                throw new Error("failed to fetch recipes")
            }
            const data = await response.json()
            setRecipe(data)
            console.log(data)
        } catch (err) {
            setError(err instanceof Error ? err.message: "an error occured")
        }
    }
    fetchRecipes()
  }, [])

  // handle delete
  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:3000/recipe/${id}`, { method: "DELETE" })
    setRecipe((prevRecipes) => prevRecipes.filter(item => item.id !== id))
  }

  // handle add
  const handleAddRecipe = (newRecipe: recipe) => {
    setRecipe([...recipe, newRecipe]);
  };

  //handle update recipe
  const updatedRecipe = async (updatedRecipe: recipe) => {
    try {
        const response = await fetch(`http://localhost:3000/recipe/${updatedRecipe.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedRecipe),
        });
        if (!response.ok) {
            throw new Error("Failed to update recipe")
        }

        //update recipe in state
        setRecipe((prevRecipes) => 
            prevRecipes.map((recipe:recipe) =>
              recipe.id === updatedRecipe.id ? updatedRecipe : recipe
            )
          );
        } catch (err) {
          setError(err instanceof Error ? err.message : "An error occurred");
        }
      };
    
  // Handle button click, open the modal and set selected recipe
  const handleButtonClick = (recipe: recipe) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="bg-dark min-vh-100">
        <Container>
            <div className="d-flex justify-content-center">
            <Button variant="info" onClick={handleShow}>Add a New recipe</Button>
            <RecipeAddForm 
                show={show} 
                handleClose={handleClose}
                handleAddRecipe={handleAddRecipe}
            />
            </div>
            {recipe?.map((recipe, index) => (
                <RecipeViewCard key={index} 
                    recipe={recipe} 
                    handleButtonClick={handleButtonClick}
                    handleDelete={() => handleDelete(recipe.id)}
                />
            ))}
        </Container>
        {selectedRecipe && (
        <RecipeViewModal 
            showModal={showModal}
            selectedRecipe={selectedRecipe}
            handleCloseModal={handleCloseModal}
            updateRecipe={updatedRecipe}
        />
)}
    </div>
  )
}
