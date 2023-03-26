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

function displayUstensils(recipes) {
    let ustensilsArr = []
    for(let i = 0; i < recipes.length; i++) {
        let recipe = recipes[i]
        let ustensils = recipe.ustensils
        for(let j = 0; j < ustensils.length; j++) {
            let ustensil = ustensils[j]
            let ustensilsName = ustensil.toLowerCase()
            if(ustensilsArr.includes(ustensilsName) === false) {
                ustensilsArr.push(ustensilsName)
            }
        }
    }
    console.log(ustensilsArr)
    return ustensilsArr
}

function displayAppliance(recipes) {
    let applianceArr = []
    for(let i = 0; i < recipes.length; i++) {
        let recipe = recipes[i]
        let appliance = recipe.appliance
        let applianceName = appliance.toLowerCase()
        if(applianceArr.includes(applianceName) === false) {
            applianceArr.push(applianceName)
        }
    }
    console.log(applianceArr)
    return applianceArr
}

function displayData(recipes) {
    // reset div qui contient les recettes
    displayIngredients(recipes)
    displayUstensils(recipes)
    displayAppliance(recipes)
}

function init() {
    displayData(recipes)
}

init()