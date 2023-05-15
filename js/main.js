import { recipes } from "./recipes.js";
import { recipeFactory } from "./factories/recipeFactory.js";
import { ingredientFactory } from "./factories/ingredientFactory.js";
import { ustensilFactory } from "./factories/ustensilFactory.js";
import { applianceFactory } from "./factories/applianceFactory.js";

let filter = ""
let selectedIngredients = []
let selectedUstensils = []
let selectedAppliances = ""

function searchAndDisplay(filter, selectedIngredients, selectedUstensils, selectedAppliances) {
    const recipesToDisplay = search(filter, selectedIngredients, selectedUstensils, selectedAppliances)
    displayData(recipesToDisplay)
}

function onClickIngredientTag(removedIngredient) {
    selectedIngredients = selectedIngredients.filter(selectedIngredient => selectedIngredient !== removedIngredient)
    searchAndDisplay(filter, selectedIngredients, selectedUstensils, selectedAppliances)
    document.getElementById(removedIngredient).remove()
}

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

function displayIngredients(recipes) {
    const ingredientsDropdown = document.getElementById("ingredients-dropdown")
    ingredientsDropdown.innerHTML = ""

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
    for(let i = 0; i < ingredientsArr.length; i++) {
        const ingredientModel = ingredientFactory(ingredientsArr[i])
        const ingredientDom = ingredientModel.getIngredientDOM()
        ingredientDom.addEventListener("click", () => {
            onClickIngredient(ingredientsArr[i])
        })
        ingredientsDropdown.appendChild(ingredientDom)
    }

    return ingredientsArr
}

function onClickUstensilTag(removedUstensil) {
    selectedUstensils = selectedUstensils.filter(selectedUstensil => selectedUstensil !== removedUstensil)
    searchAndDisplay(filter, selectedIngredients, selectedUstensils, selectedAppliances)
    document.getElementById(removedUstensil).remove()
}

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

function displayUstensils(recipes) {
    const ustensilsDropdown = document.getElementById("ustensils-dropdown")
    ustensilsDropdown.innerHTML = ""

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
    for(let i = 0; i < ustensilsArr.length; i++) {
        const ustensilModel = ustensilFactory(ustensilsArr[i])
        const ustensilDom = ustensilModel.getUstensilDOM()
        ustensilDom.addEventListener("click", () => {
            onClickUstensil(ustensilsArr[i])
        })
        ustensilsDropdown.appendChild(ustensilDom)
    }

    return ustensilsArr
}

function onClickApplianceTag(removedAppliance) {
    if (selectedAppliances === removedAppliance) {
        selectedAppliances = ""
    }
    searchAndDisplay(filter, selectedIngredients, selectedUstensils, selectedAppliances)
    document.getElementById(removedAppliance).remove()
}

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

function displayAppliance(recipes) {
    const appliancesDropdown = document.getElementById("appliances-dropdown")
    appliancesDropdown.innerHTML = ""

    let applianceArr = []
    for(let i = 0; i < recipes.length; i++) {
        let recipe = recipes[i]
        let appliance = recipe.appliance
        let applianceName = appliance.toLowerCase()
        if(applianceArr.includes(applianceName) === false && selectedAppliances.includes(applianceName) === false) {
            applianceArr.push(applianceName)
        }
    }
    for(let i = 0; i < applianceArr.length; i++) {
        const applianceModel = applianceFactory(applianceArr[i])
        const applianceDom = applianceModel.getApplianceDOM()
        applianceDom.addEventListener("click", () => {
            onClickAppliance(applianceArr[i])
        })
        appliancesDropdown.appendChild(applianceDom)
    }

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

function displayData(recipes) {
    displayIngredients(recipes)
    displayUstensils(recipes)
    displayAppliance(recipes)
    displayRecipes(recipes) 
}

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

function search(filter, ingredients, ustensils, appliances) {
    // fonction à refaire pour la V2
    // utiliser find, filter, map...
    let recipesToDisplay = []

    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i]

        if (isRecipeMatchingInput(filter, recipe) && isRecipeMatchingIngredientsTags(ingredients, recipe) && isRecipeMatchingUstensilsTags(ustensils, recipe) && isRecipeMatchingApplianceTags(appliances, recipe)) {
            recipesToDisplay.push(recipe)
        }
    }
    return recipesToDisplay
}

function onKeyUp(event) {
    filter = event.target.value.toLowerCase()
    searchAndDisplay(filter, selectedIngredients, selectedUstensils, selectedAppliances)
}

function onKeyUpIngredients(event) {
    let ingredientsFilter = event.target.value.toLowerCase()
    console.log(ingredientsFilter)
    let recipesToDisplay = []
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i]
        let ingredients = recipe.ingredients
        for(let j = 0; j < ingredients.length; j++) {
            let ingredient = ingredients[j]
            let ingredientName = ingredient.ingredient.toLowerCase()
            if(ingredientName.includes(ingredientsFilter)) {
                recipesToDisplay.push(recipe)
            }
        }
    }

    let ingredientsArr = displayIngredients(recipesToDisplay)
    let result = ingredientsArr.filter(ingredient => ingredient.includes(ingredientsFilter))
    console.log(result)
    //j'ai le tableau avec les ingrédients à afficher... mais je ne comprend pas comment les afficher
}

function init() {
    searchAndDisplay(filter, selectedIngredients, selectedUstensils, selectedAppliances)
}

let input = document.getElementById("search")
input.addEventListener("keyup", onKeyUp)
let ingredientsInput = document.getElementById("ingredients-input")
ingredientsInput.addEventListener("keyup", onKeyUpIngredients)

init()