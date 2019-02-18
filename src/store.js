import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const util = {
  load: () => JSON.parse(window.localStorage.getItem('recipes') || '{}'),
  save: (recipes) => window.localStorage.setItem('recipes', JSON.stringify(recipes))
}

export default new Vuex.Store({
  state: {
    recipes: [],
    ingredients: []
  },
  mutations: {
    load (state) {
      let { recipes, ingredients } = util.load()
      state.recipes = recipes || []
      state.ingredients = ingredients || []
    },
    newRecipe (state, name) {
      state.recipes.push({
        name,
        ingredients: []
      })
      util.save(state)
    },
    removeRecipe (state, recipeIndex) {
      state.recipes.splice(recipeIndex, 1)
      util.save(state)
    },
    changeName (state, { name, recipeIndex }) {
      state.recipes[recipeIndex].name = name
      util.save(state)
    },
    changeRecipe (state, { recipe, recipeIndex }) {
      state.recipes[recipeIndex] = recipe
      util.save(state)
    },
    changeAmount (state, { recipeIndex, ingredientIndex, amount } ) {
      state.recipes[recipeIndex].ingredients[ingredientIndex].amount = amount
      util.save(state)
    },
    addIngredient (state, { recipeIndex }) {
      let recipe = state.recipes[recipeIndex]
      if (!recipe.ingredients) {
        Vue.set(recipe, 'ingredients', [])
      }
      recipe.ingredients.push({
        id: null,
        amount: null
      })
      util.save(state)
    },
    removeIngredient (state, { recipeIndex, ingredientIndex }) {
      state.recipes[recipeIndex].ingredients.splice(ingredientIndex, 1)
      util.save(state)
    },
    selectIngredient (state, { recipeIndex, ingredientIndex, selectedId }) {
      state.recipes[recipeIndex].ingredients[ingredientIndex].id = selectedId
      util.save(state)
    },
    unselectIngredient (state, { recipeIndex, ingredientIndex }) {
      state.recipes[recipeIndex].ingredients[ingredientIndex].id = null
      util.save(state)
    },
    newIngredient (state, ingredient) {
      state.ingredients.push(ingredient)
      util.save(state)
    }
  },
  getters: {
    ingredientsById (state) {
      return state.ingredients.reduce((map, value) => {
        map[value.id] = value
        return map
      }, {})
    },
  }
})
