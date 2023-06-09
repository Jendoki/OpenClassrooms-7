import { recipes } from "./recipes.js";
import { recipeFactory } from "./factories/recipeFactory.js";
import { ingredientFactory } from "./factories/ingredientFactory.js";
import { ustensilFactory } from "./factories/ustensilFactory.js";
import { applianceFactory } from "./factories/applianceFactory.js";

let filter = ""
let selectedIngredients = []
let selectedUstensils = []
let selectedAppliances = ""
let displayedRecipes = recipes 

// ------------------ DISPLAY & SEARCH ----------------------
function search(filter, ingredients, ustensils, appliances) {
    let recipesToDisplay = []

    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i]

        if (isRecipeMatchingInput(filter, recipe) && isRecipeMatchingIngredientsTags(ingredients, recipe) && isRecipeMatchingUstensilsTags(ustensils, recipe) && isRecipeMatchingApplianceTags(appliances, recipe)) {
            recipesToDisplay.push(recipe)
        }
    }
    return recipesToDisplay
}

function displayData(recipes) {
    displayIngredientsFromRecipe(recipes)
    displayUstensilsFromRecipe(recipes)
    displayApplianceFromRecipe(recipes)
    displayRecipes(recipes) 
}

function searchAndDisplay(filter, selectedIngredients, selectedUstensils, selectedAppliances) {
    const recipesToDisplay = search(filter, selectedIngredients, selectedUstensils, selectedAppliances)
    displayedRecipes = recipesToDisplay
    displayData(recipesToDisplay)
}

// ------------------ ONKEYUP ----------------------
function onKeyUp(event) {
    filter = event.target.value.toLowerCase()
    searchAndDisplay(filter, selectedIngredients, selectedUstensils, selectedAppliances)
}

function onKeyUpIngredients(event) {
    let ingredientsFilter = event.target.value.toLowerCase()
    let ingredientsToDisplay = []
    for (let i = 0; i < displayedRecipes.length; i++) {
        const recipe = displayedRecipes[i]
        let ingredients = recipe.ingredients
        for(let j = 0; j < ingredients.length; j++) {
            let ingredient = ingredients[j]
            let ingredientName = ingredient.ingredient.toLowerCase()
            if(ingredientName.includes(ingredientsFilter)) {
                if(ingredientsToDisplay.includes(ingredientName) === false && selectedIngredients.includes(ingredientName) === false) {
                    ingredientsToDisplay.push(ingredientName)
                }
            }
        }
    }
    displayIngredients(ingredientsToDisplay)
}

function onKeyUpAppliances(event) {
    let appliancesFilter = event.target.value.toLowerCase()
    let appliancesToDisplay = []
    for (let i = 0; i < displayedRecipes.length; i++) {
        const recipe = displayedRecipes[i]
        let appliance = recipe.appliance
        let applianceName = appliance.toLowerCase()
        if(applianceName.includes(appliancesFilter)) {
            if(appliancesToDisplay.includes(applianceName) === false && selectedAppliances.includes(applianceName) === false) {
                appliancesToDisplay.push(applianceName)
            }
        }
    }
    displayAppliance(appliancesToDisplay)
}

function onKeyUpUstensils(event) {
    let ustensilsFilter = event.target.value.toLowerCase()
    let ustensilsToDisplay = []
    for (let i = 0; i < displayedRecipes.length; i++) {
        const recipe = displayedRecipes[i]
        let ustensils = recipe.ustensils
        for(let j = 0; j < ustensils.length; j++) {
            let ustensil = ustensils[j]
            let ustensilName = ustensil.toLowerCase()
            if(ustensilName.includes(ustensilsFilter)) {
                if(ustensilsToDisplay.includes(ustensilName) === false && selectedUstensils.includes(ustensilName) === false) {
                    ustensilsToDisplay.push(ustensilName)
                }
            }
        }
    }
    displayUstensils(ustensilsToDisplay)
}


// ------------------ TAGS ----------------------
function onClickIngredientTag(removedIngredient) {
    selectedIngredients = selectedIngredients.filter(selectedIngredient => selectedIngredient !== removedIngredient)
    searchAndDisplay(filter, selectedIngredients, selectedUstensils, selectedAppliances)
    document.getElementById(removedIngredient).remove()
}

function onClickUstensilTag(removedUstensil) {
    selectedUstensils = selectedUstensils.filter(selectedUstensil => selectedUstensil !== removedUstensil)
    searchAndDisplay(filter, selectedIngredients, selectedUstensils, selectedAppliances)
    document.getElementById(removedUstensil).remove()
}

function onClickApplianceTag(removedAppliance) {
    if (selectedAppliances === removedAppliance) {
        selectedAppliances = ""
    }
    searchAndDisplay(filter, selectedIngredients, selectedUstensils, selectedAppliances)
    document.getElementById(removedAppliance).remove()
}

// ------------------ INGREDIENTS ----------------------
function onClickIngredient(ingredient) {
    selectedIngredients.push(ingredient)
    searchAndDisplay(filter, selectedIngredients, selectedUstensils, selectedAppliances)
    const tagsRow = document.getElementById("tags-row")
    const ingredientModel = ingredientFactory(ingredient)
    const ingredientDom = ingredientModel.createIngredientTag()
    tagsRow.appendChild(ingredientDom)
    const ingredientTag = document.getElementById(ingredient)
    ingredientTag.addEventListener("click", () => {
        onClickIngredientTag(ingredient)
    })
}

function displayIngredients(ingredients) {
    const ingredientsDropdown = document.getElementById("ingredients-dropdown")
    ingredientsDropdown.innerHTML = ""
    
    for(let i = 0; i < ingredients.length; i++) {
        const ingredientModel = ingredientFactory(ingredients[i])
        const ingredientDom = ingredientModel.getIngredientDOM()
        ingredientDom.addEventListener("click", () => {
            onClickIngredient(ingredients[i])
        })
        ingredientsDropdown.appendChild(ingredientDom)
    }
}

function displayIngredientsFromRecipe(recipes) {
    let ingredientsArr = []
    for(let i = 0; i < recipes.length; i++) {
        let recipe = recipes[i]
        let ingredients = recipe.ingredients
        for(let j = 0; j < ingredients.length; j++) {
            let ingredient = ingredients[j]
            let ingredientName = ingredient.ingredient.toLowerCase()
            if(ingredientsArr.includes(ingredientName) === false && selectedIngredients.includes(ingredientName) === false) {
                ingredientsArr.push(ingredientName)
            }
        }
    }
    displayIngredients(ingredientsArr)

    return ingredientsArr
}

// ------------------ USTENSILS ----------------------
function onClickUstensil(ustensil) {
    selectedUstensils.push(ustensil)
    searchAndDisplay(filter, selectedIngredients, selectedUstensils, selectedAppliances)
    const tagsRow = document.getElementById("tags-row")
    const ustensilModel = ustensilFactory(ustensil)
    const ustensilDom = ustensilModel.createUstensilTag()
    tagsRow.appendChild(ustensilDom)
    const ustensilTag = document.getElementById(ustensil)
    ustensilTag.addEventListener("click", () => {
        onClickUstensilTag(ustensil)
    })
}

function displayUstensils(ustensils) {
    const ustensilsDropdown = document.getElementById("ustensils-dropdown")
    ustensilsDropdown.innerHTML = ""
    
    for(let i = 0; i < ustensils.length; i++) {
        const ustensilModel = ustensilFactory(ustensils[i])
        const ustensilDom = ustensilModel.getUstensilDOM()
        ustensilDom.addEventListener("click", () => {
            onClickUstensil(ustensils[i])
        })
        ustensilsDropdown.appendChild(ustensilDom)
    }
}

function displayUstensilsFromRecipe(recipes) {
    let ustensilsArr = []
    for(let i = 0; i < recipes.length; i++) {
        let recipe = recipes[i]
        let ustensils = recipe.ustensils
        for(let j = 0; j < ustensils.length; j++) {
            let ustensil = ustensils[j]
            let ustensilName = ustensil.toLowerCase()
            if(ustensilsArr.includes(ustensilName) === false && selectedUstensils.includes(ustensilName) === false) {
                ustensilsArr.push(ustensilName)
            }
        }
    }
    displayUstensils(ustensilsArr)
    return ustensilsArr
}

// ------------------ APPLIANCES ----------------------
function onClickAppliance(appliance) {
    selectedAppliances = appliance
    searchAndDisplay(filter, selectedIngredients, selectedUstensils, selectedAppliances)
    const tagsRow = document.getElementById("tags-row")
    const applianceModel = applianceFactory(appliance)
    const applianceDom = applianceModel.createApplianceTag()
    tagsRow.appendChild(applianceDom)
    const applianceTag = document.getElementById(appliance)
    applianceTag.addEventListener("click", () => {
        onClickApplianceTag(appliance)
    })
}

function displayAppliance(appliances) {
    const appliancesDropdown = document.getElementById("appliances-dropdown")
    appliancesDropdown.innerHTML = ""


    for(let i = 0; i < appliances.length; i++) {
        const applianceModel = applianceFactory(appliances[i])
        const applianceDom = applianceModel.getApplianceDOM()
        applianceDom.addEventListener("click", () => {
            onClickAppliance(appliances[i])
        })
        appliancesDropdown.appendChild(applianceDom)
    }
}

function displayApplianceFromRecipe(recipes) {
    let applianceArr = []
    for(let i = 0; i < recipes.length; i++) {
        let recipe = recipes[i]
        let appliance = recipe.appliance
        let applianceName = appliance.toLowerCase()
        if(applianceArr.includes(applianceName) === false && selectedAppliances.includes(applianceName) === false) {
            applianceArr.push(applianceName)
        }
    }
    displayAppliance(applianceArr)
    return applianceArr
}

function displayRecipes(recipes) {
    const recipesRow = document.querySelector("#recipesRow")
    recipesRow.innerHTML = ""
    for(let i = 0; i < recipes.length; i++) {
        const recipeModel = recipeFactory(recipes[i])
        const recipeCardDom = recipeModel.getRecipeDOM()
        const recipeCol = document.createElement("div")
        recipeCol.className = "col-4"
        recipesRow.appendChild(recipeCol)
        recipeCol.appendChild(recipeCardDom)
    }
}

// ------------------ IS RECIPE MATCHING? ----------------------
function isRecipeMatchingInput(filter, recipe) {
    const recipeName = recipe.name.toLowerCase()
    const recipeIngredients = recipe.ingredients

    if (filter.length >= 3) {
        if (recipeName.includes(filter)) {
            return true
        }
        const recipeDesc = recipe.description
        if (recipeDesc.includes(filter)) {
            return true
        }
        for (let j = 0; j < recipeIngredients.length; j++) {
            const ingredientName = recipeIngredients[j].ingredient.toLowerCase()
            if (ingredientName.includes(filter)) {
                return true
            }
        }
        return false
    } 
    return true
}

function isRecipeMatchingIngredientsTags(ingredients, recipe) {
    const recipeIngredients = recipe.ingredients

    if (ingredients.length !== 0) {
        let ingredientIntersectionCount = 0
        for (let k = 0; k < recipeIngredients.length; k++) {
            const ingredientName = recipeIngredients[k].ingredient.toLowerCase()
            if (ingredients.includes(ingredientName)) {
                ingredientIntersectionCount += 1
            }
        }
        if (ingredientIntersectionCount === ingredients.length) {
            return true
        } 
        return false
    }
    return true
}

function isRecipeMatchingUstensilsTags(ustensils, recipe) {
    const recipeUstentils = recipe.ustensils
    if (ustensils.length !== 0) {
        let ustensilIntersectionCount = 0
        for (let k = 0; k < recipeUstentils.length; k++) {
            const ustensilName = recipeUstentils[k].toLowerCase()
            if (ustensils.includes(ustensilName)) {
                ustensilIntersectionCount += 1
            }
        }
        if (ustensilIntersectionCount === ustensils.length) {
            return true
        } 
        return false
    }
    return true
}

function isRecipeMatchingApplianceTags(appliances, recipe) {
    const recipeAppliance = recipe.appliance.toLowerCase()
    if (appliances.length !== 0) {
        let applianceIntersectionCount = 0
        for (let k = 0; k < recipeAppliance.length; k++) {
            const applianceName = recipeAppliance[k].toLowerCase()
            if (appliances.includes(applianceName)) {
                applianceIntersectionCount += 1
            }
        }
        if (applianceIntersectionCount === appliances.length) {
            return true
        } 
        return false
    }
    return true
}

// ------------------ INIT ----------------------
function init() {
    searchAndDisplay(filter, selectedIngredients, selectedUstensils, selectedAppliances)
}

let input = document.getElementById("search")
input.addEventListener("keyup", onKeyUp)
let ingredientsInput = document.getElementById("ingredients-input")
ingredientsInput.addEventListener("keyup", onKeyUpIngredients)
let appliancesInput = document.getElementById("appliances-input")
appliancesInput.addEventListener("keyup", onKeyUpAppliances)
let ustensilsInput = document.getElementById("ustensils-input")
ustensilsInput.addEventListener("keyup", onKeyUpUstensils)

init()