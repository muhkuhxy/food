<template>
  <div>
    <h1>Rezept</h1>
    <label>Name <input type="text" v-model="recipe.name" @change="changeName({ name: $event.target.value, id })"></label>
    <!-- <div>Gesamt: {{ totalAmount }}</div> -->
    <div>Kalorien pro 100g: {{ calsPer100 }}</div>
    <div class="md-layout md-gutter">
      <div v-for="(ingredientRef, ingredientIndex) in recipe.ingredients" :key="ingredientIndex" class="md-layout-item md-size-20">
        <Ingredient :ingredientRef="ingredientRef"
          @removeIngredient="removeIngredient({ recipeId: id, ingredientIndex })"
          @newIngredient="newIngredient"
          @selectIngredient="selectIngredient({ recipeId: id, ingredientIndex: ingredientIndex, selectedId: $event.id })"
          @unselectIngredient="unselectIngredient({ recipeId: id, ingredientIndex: ingredientIndex })"
          @changeAmount="changeAmount({ recipeId: id, ingredientIndex: ingredientIndex, amount: $event })">
        </Ingredient>
      </div>
      <div class="md-layout-item md-size-20">
        <md-card md-with-hover>
          <md-card-header class="md-layout">
            <md-button @click="addIngredient({ recipeId: id })" class="md-layout-item">Zutat hinzufügen</md-button>
          </md-card-header>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import Ingredient from './Ingredient'

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
    Ingredient
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
      const exact = this.recipe.ingredients.reduce((memo, ingredient) => {
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
    ...mapMutations(['load', 'changeName', 'changeRecipe', 'saveIngredient', 'addIngredient', 'removeIngredient', 'newIngredient', 'selectIngredient', 'unselectIngredient', 'changeAmount']),
  }
}
</script>

