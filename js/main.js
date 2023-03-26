import { recipes } from "./recipes.js";
console.log(recipes);

function displayIngredients(recipes) {
    let ingredientsArr = []
    for(let i = 0; i < recipes.length; i++) {
        let recipe = recipes[i]
        let ingredients = recipe.ingredients
        for(let j = 0; j < ingredients.length; j++) {
            let ingredient = ingredients[j]
            let ingredientName = ingredient.ingredient.toLowerCase()
            if(ingredientsArr.includes(ingredientName) === false) {
                ingredientsArr.push(ingredientName)
            }
        }
    }
    console.log(ingredientsArr)
    return ingredientsArr
}

function displayUstensils() {

}

function displayAppliance() {

}

function displayData(recipes) {
    // reset div qui contient les recettes
    displayIngredients(recipes)
}

function init() {
    displayData(recipes)
}

init()