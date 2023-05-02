 export function recipeFactory(recipe) {
    const {appliance, description, ingredients, name, servings, time, ustensils} = recipe

    function getRecipeDOM() {
        const recipeCol = document.createElement("div")
        recipeCol.className = "col"

        const recipeCard = document.createElement("div")
        recipeCard.className = "card"

        const recipeImg = document.createElement("div")
        recipeImg.classList.add("brown-gray")
        recipeImg.classList.add("img-placeholder")

        const recipeCardBody = document.createElement("div")
        recipeCardBody.classList.add("card-body")
        recipeCardBody.classList.add("light-gray")

        const recipeContainer = document.createElement("div")
        recipeContainer.className = "container"

        const nameTimeRow = document.createElement("div")
        nameTimeRow.className = "row"

        const titleCol = document.createElement("div")
        titleCol.className = "col"

        const recipeTitle = document.createElement("h5")
        recipeTitle.classList.add("card-title")
        recipeTitle.classList.add("recipe-title")
        recipeTitle.textContent = name

        const timeCol = document.createElement("div")
        timeCol.className = "col-4"

        const recipeTime = document.createElement("div")
        recipeTime.className = "recipe-time"

        const timeIcon = document.createElement("img")
        timeIcon.className = "time-icon"
        timeIcon.setAttribute("src", "assets/time.png")
        timeIcon.setAttribute("alt", "time icon")

        const timeText = document.createElement("p")
        timeText.className = "recipe-time"
        timeText.textContent = `${time} min`

        const ingredientsRecipeRow = document.createElement("div")
        ingredientsRecipeRow.className = "row"

        const ingredientsCol = document.createElement("div")
        ingredientsCol.className = "col"

        const ingredientsDiv = document.createElement("div")
        ingredientsDiv.classList.add("card-text")
        ingredientsDiv.classList.add("ingredients")

        for(let i = 0; i<ingredients.length; i++) {
            const ingredientDiv = document.createElement("div")
            ingredientDiv.className = "ingredient"

            const ingredientName = document.createElement("p")
            ingredientName.className = "ingredient-name"
    
            const ingredientQuantity = document.createElement("p")
            ingredientQuantity.className = "ingredient-quantity"

            const {ingredient, quantity, unit} = ingredients[i]
            ingredientName.textContent = ingredient

            if (quantity !== undefined && unit !== undefined) {
                ingredientQuantity.textContent = `${quantity} ${unit}`
            }
            ingredientDiv.appendChild(ingredientName)
            ingredientDiv.appendChild(ingredientQuantity)
            ingredientsDiv.appendChild(ingredientDiv)
        }

        const recipeTextCol = document.createElement("div")
        recipeTextCol.className = "col"

        const recipeText = document.createElement("p")
        recipeText.classList.add("card-text")
        recipeText.classList.add("recipe")
        recipeText.textContent = description

        recipeCol.appendChild(recipeCard)
        recipeCard.appendChild(recipeImg)
        recipeCard.appendChild(recipeCardBody)
        recipeCardBody.appendChild(recipeContainer)
        recipeContainer.appendChild(nameTimeRow)
        nameTimeRow.appendChild(titleCol)
        titleCol.appendChild(recipeTitle)
        nameTimeRow.appendChild(timeCol)
        timeCol.appendChild(recipeTime)
        recipeTime.appendChild(timeIcon)
        recipeTime.appendChild(timeText)
        recipeContainer.appendChild(ingredientsRecipeRow)
        ingredientsRecipeRow.appendChild(ingredientsCol)
        ingredientsCol.appendChild(ingredientsDiv)
        ingredientsRecipeRow.appendChild(recipeTextCol)
        recipeTextCol.appendChild(recipeText)

        return recipeCard
    }
    return {getRecipeDOM}
}