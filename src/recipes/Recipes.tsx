import { useEffect, useState } from "react"
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap"
import type { recipe } from "../../types"
import RecipeViewModal from "./RecipeModal/RecipeViewModal"
import RecipeViewCard from "./RecipeViewCard"
import Sidebar from "./Sidebar.tsx/Sidebar"

export default function Recipes() {
  const [loading, setLoading] = useState(true)
  const [recipe, setRecipe] = useState<recipe[]>([])
  const [error, setError] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState<recipe | null>(null)

  useEffect(() => {
    // fetch recipes from backend
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:3000/recipe")
        if (!response.ok) {
          // throw error if one occures
          throw new Error("failed to fetch recipes")
        }
        // parse to json
        const data = await response.json()
        // update state with the parsed recipe
        setRecipe(data)
      } catch (err) {
        // if error occurs update error state
        setError(err instanceof Error ? err.message : "an error occured")
      } finally {
        // update loading state after either an erorr or recipes fetched from backend
        setLoading(false)
      }
    }
    fetchRecipes()
  }, [])

  const handleDelete = async (id: number) => {
    // grab recipe.id to delete it from backend.
    await fetch(`http://localhost:3000/recipe/${id}`, { method: "DELETE" })
    // update state to show all recipes but the one deleted
    setRecipe((prevRecipes) => prevRecipes.filter((item) => item.id !== id))
  }

  const handleAddRecipe = (newRecipe: recipe) => {
    // update recipe state with the new recipe that has been added
    setRecipe([...recipe, newRecipe])
  }

  const updatedRecipe = async (updatedRecipe: recipe) => {
    // update recipe on backend
    try {
      const response = await fetch(
        `http://localhost:3000/recipe/${updatedRecipe.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedRecipe),
        }
      )
      if (!response.ok) {
        // update state with error message if error occurs
        setError("Failed to update recipe")
      }

      // update the recipe in state for the front end using map
      setRecipe(
        (
          prevRecipes //update recipe in state
        ) =>
          prevRecipes.map((recipe: recipe) =>
            recipe.id === updatedRecipe.id ? updatedRecipe : recipe
          )
      )
    } catch (err) {
      // update error state if error occurs
      setError(err instanceof Error ? err.message : "An error occurred")
    }
  }

  const handleButtonClick = (recipe: recipe) => {
    // setShowModal to true, setSelectedRecipe to the current recipe
    setSelectedRecipe(recipe)
    setShowModal(true)
  }

  const closeRecipeModal = () => setShowModal(false) // close modal

  return (
    <div className="bg-dark">
      <Row className="d-flex min-vh-100">
        <Sidebar handleAddRecipe={handleAddRecipe} />
        <Col md={6} className="p-0">
          <Container className="p-0">
            {loading && (
              <div className="d-flex justify-content-center my-5">
                <Spinner animation="border" variant="success" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )}
            {error && <Alert>Recipe Not Found</Alert>}
            <Row>
              {recipe?.map((recipe, index) => (
                <Col
                  key={recipe.id}
                  sm={12}
                  md={6}
                  lg={4}
                  className="d-flex justify-content-center"
                >
                  <RecipeViewCard
                    key={index}
                    recipe={recipe}
                    handleButtonClick={handleButtonClick}
                    handleDelete={() => handleDelete(recipe.id)}
                  />
                </Col>
              ))}
            </Row>
          </Container>
        </Col>
      </Row>
      {selectedRecipe && (
        <RecipeViewModal
          showModal={showModal}
          selectedRecipe={selectedRecipe}
          closeRecipeModal={closeRecipeModal}
          updateRecipe={updatedRecipe}
        />
      )}
    </div>
  )
}
