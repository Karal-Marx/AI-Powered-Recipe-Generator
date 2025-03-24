import React from "react"
import Recipe from "./ClaudeRecipe"
import IngredientList from "./IngredientList"
import { getRecipeFromMistral } from "./ai"


export default function Main(){

    const [ingredient, setIngredient] = React.useState([])
    const [recipe, setRecipe] = React.useState("")
    const recipeSection = React.useRef(null)


    const ingredientlist = ingredient.map((items)=>{
        return(
            <li key={items}>{items}</li>
        )
        
    })
    
    function handleSubmit(event){
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const newIngredient = formData.get("ingredient")
        setIngredient(prevIngredients => [...prevIngredients, newIngredient])
        event.currentTarget.reset()
    }
    React.useEffect(()=>{
        if (recipe != "" && recipeSection.current != null){
            recipeSection.current.scrollIntoView()
        }
    },[recipe])
    async function getRecipe(event){
        event.preventDefault()
        const recipeIdea = await getRecipeFromMistral(ingredient)
        setRecipe(recipeIdea)
    }
    
    return(
        <main>
            <form className="add-ingredient-form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>
            {ingredient.length > 0 && 
                <IngredientList 
                    ref = {recipeSection}
                    length={ingredient.length} 
                    getRecipe={getRecipe} 
                    ingredientlist = {ingredientlist}
                />
            }
            {recipe && <Recipe recipe = {recipe}/>}
            
        </main>
    )
}