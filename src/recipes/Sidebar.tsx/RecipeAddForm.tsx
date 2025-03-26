import { FormEvent, useState } from "react"
import { Alert, Button, Form } from "react-bootstrap"

type Props = {
  handleAddRecipe: (newRecipe: any) => void
}

export default function RecipeAddForm({ handleAddRecipe }: Props) {
  // State to store form data
  const [recipeName, setRecipeName] = useState("")
  const [recipeDescription, setRecipeDescription] = useState("")
  const [recipeIngredients, setRecipeIngredients] = useState("")
  const [recipeInstructions, setRecipeInstructions] = useState("")
  const [error, setError] = useState<string | null>(null)

  // handle form submission
  const handleSubmit = async (e: FormEvent) => {
    // prevent page refresh
    e.preventDefault()
    // make recipe object
    const recipeData = {
      name: recipeName,
      description: recipeDescription,
      ingredients: recipeIngredients,
      instructions: recipeInstructions,
    }
    try {
      // add to backend
      const response = await fetch("http://localhost:3000/recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
      })

      if (response.ok) {
        // parse to json
        const newRecipe = await response.json()
        // update state with new recipe
        handleAddRecipe(newRecipe)

        // Clear the form fields after successful submission
        setRecipeName("")
        setRecipeDescription("")
        setRecipeIngredients("")
        setRecipeInstructions("")
      } else {
        setError("Failed to add recipe")
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "an error occured")
    }
  }
  return (
    <div className="m-1">
      {error && <Alert>Recipe could not be added!</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Label>Recipie Name:</Form.Label>
        <Form.Control
          type="text"
          aria-label="input recipe name"
          placeholder="Recipe Name"
          className="mb-3"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
        />
        <Form.Label>Breif Recipe Description:</Form.Label>
        <Form.Control
          as="textarea"
          aria-label="textarea for recipe description input"
          placeholder="Recipe Description"
          className="mb-3"
          value={recipeDescription}
          onChange={(e) => setRecipeDescription(e.target.value)}
        />
        <Form.Label>Recipe Ingredients:</Form.Label>
        <Form.Control
          as="textarea"
          aria-label="textarea for recipe ingredient input"
          placeholder="Recipe Ingredients"
          className="mb-3"
          value={recipeIngredients}
          onChange={(e) => setRecipeIngredients(e.target.value)}
        />
        <Form.Label>Recipe Instructions:</Form.Label>
        <Form.Control
          as="textarea"
          aria-label="textarea for recipe instruction input"
          placeholder="Recipe Instructions"
          className="mb-3"
          value={recipeInstructions}
          onChange={(e) => setRecipeInstructions(e.target.value)}
        />
      </Form>
      <div className="d-flex justify-content-center">
        <Button
          className="mt-3 flex-grow-1"
          variant="primary"
          onClick={handleSubmit}
        >
          Add Recipe
        </Button>
      </div>
    </div>
  )
}
