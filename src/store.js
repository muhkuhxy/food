import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const util = {
  load: () => JSON.parse(window.localStorage.getItem('recipes') || '[]'),
  save: (recipes) => window.localStorage.setItem('recipes', JSON.stringify(recipes))
}

export default new Vuex.Store({
  state: {
    recipes: [],
    ingredients: [
      {
        id: 1,
        name: 'kekse',
        calories: 500
      },
      {
        id: 2,
        name: 'hahn',
        calories: 200
      }
    ]
  },
  mutations: {
    load (state) {
      state.recipes = util.load()
    },
    newRecipe (state, name) {
      state.recipes.push({
        name,
        ingredients: [],
        amounts: []
      })
      util.save(state.recipes)
    },
    changeName (state, { name, id }) {
      state.recipes[id].name = name
      util.save(state.recipes)
    },
    changeRecipe (state, { recipe, id }) {
      state.recipes[id] = recipe
      util.save(state.recipes)
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
