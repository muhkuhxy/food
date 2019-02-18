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
        ingredients: [],
        amounts: []
      })
      util.save(state)
    },
    changeName (state, { name, id }) {
      state.recipes[id].name = name
      util.save(state)
    },
    changeRecipe (state, { recipe, id }) {
      state.recipes[id] = recipe
      util.save(state)
    },
    changeAmount (state, { recipeId, ingredientIndex, amount } ) {
      state.recipes[recipeId].ingredients[ingredientIndex].amount = amount
      util.save(state)
    },
    addIngredient (state, { recipeId }) {
      let recipe = state.recipes[recipeId]
      if (!recipe.ingredients) {
        Vue.set(recipe, 'ingredients', [])
      }
      recipe.ingredients.push({
        id: null,
        amount: null
      })
      util.save(state)
    },
    removeIngredient (state, { recipeId, ingredientIndex }) {
      state.recipes[recipeId].ingredients.splice(ingredientIndex, 1)
      util.save(state)
    },
    selectIngredient (state, { recipeId, ingredientIndex, selectedId }) {
      state.recipes[recipeId].ingredients[ingredientIndex].id = selectedId
      util.save(state)
    },
    unselectIngredient (state, { recipeId, ingredientIndex }) {
      state.recipes[recipeId].ingredients[ingredientIndex].id = null
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
