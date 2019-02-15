<template>
  <div>
    <h2>Rezept</h2>
    <label>Name <input type="text" v-model="recipe.name" @change="changeName({ name: $event.target.value, id })"></label>
    <div>Gesamt: {{ totalAmount }}</div>
    <div>Kalorien pro 100g: {{ calsPer100 }}</div>
    <h3>Zutaten <button @click="addIngredient">+</button></h3>
    <div v-for="(ingredientRef, index) in recipe.ingredients" :key="index">
      <button @click="removeIngredient(index)">-</button>
      <IngredientSelector :id="ingredientRef.id" @matchingIngredient="ingredientMatched($event, index)" @noMatchingIngredient="unmatchedIngredient(index)"></IngredientSelector>
      <label>Menge <input type="number" v-model="ingredientRef.amount"/>
      </label>
      <Nutrients :id="ingredientRef.id"></Nutrients>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapMutations, mapGetters } from 'vuex'
import Nutrients from './Nutrients.vue'
import IngredientSelector from './IngredientSelector.vue'

function save () {
  this.changeRecipe({
    id: this.id,
    recipe: this.recipe,
  })
}

export default {
  props: ['id'],
  data () {
    return {
      recipe: {
        name: null,
        ingredients: []
      },
    }
  },
  created () {
    if (!this.recipes.length) {
      this.load()
    }
    this.recipe = this.recipes[this.id]
  },
  components: {
    Nutrients,
    IngredientSelector
  },
  computed: {
    ...mapState(['recipes', 'ingredients']),
    ...mapGetters(['ingredientsById']),
    totalAmount () {
      return this.recipe.ingredients.reduce((memo, ingredient) => {
        return ingredient.amount == null ? memo : memo + +ingredient.amount
      }, 0)
    },
    calsPer100 () {
      const total = this.totalAmount
      const exact = this.recipe.ingredients.reduce((memo, ingredient, index) => {
        if (ingredient.amount == null || ingredient.id == null) {
          return memo
        }
        else {
          return memo + (+ingredient.amount * this.ingredientsById[ingredient.id].calories / total)
        }
      }, 0)
      return (isNaN(exact) ? 0 : exact).toFixed(2)
    }
  },
  methods: {
    ...mapMutations(['load', 'changeName', 'changeRecipe']),
    changeIngredient (event, index) {
      // console.log(`changing ${index}'s ${event.field} to ${event.value}`)
      this.recipe.ingredients[index][event.field] = event.value
      save.call(this)
    },
    addIngredient () {
      if (!this.recipe.ingredients) {
        Vue.set(this.recipe, 'ingredients', [])
      }
      this.recipe.ingredients.push({
        id: null,
        amount: null
      })
      save.call(this)
    },
    removeIngredient (index) {
      this.recipe.ingredients.splice(index, 1)
      save.call(this)
    },
    ingredientMatched (ingredient, index) {
      this.recipe.ingredients[index].id = ingredient.id
    },
    unmatchedIngredient (index) {
      this.recipe.ingredients[index].id = null
    }
  }
}
</script>

