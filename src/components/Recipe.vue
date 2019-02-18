<template>
  <div>
    <h1>{{ recipe.name }}</h1>
    <div class="md-layout md-gutter recipe-info">
      <md-field class="md-layout-item md-size-50 md-small-size-100">
        <label>Neues Rezept</label>
        <md-input v-model="recipe.name" @change="changeName({ name: $event.target.value, recipeIndex: id })"></md-input>
      </md-field>
      <div>Kalorien pro 100g: {{ calsPer100 }}</div>
    </div>
    <div class="md-layout md-gutter">
      <div v-for="(ingredientRef, ingredientIndex) in recipe.ingredients" :key="ingredientIndex" class="ingredient md-layout-item md-size-20 md-medium-size-25 md-small-size-50 md-xsmall-size-100">
        <Ingredient :ingredientRef="ingredientRef"
          @removeIngredient="removeIngredient({ recipeIndex: id, ingredientIndex })"
          @newIngredient="newIngredient"
          @selectIngredient="selectIngredient({ recipeIndex: id, ingredientIndex: ingredientIndex, selectedId: $event.id })"
          @unselectIngredient="unselectIngredient({ recipeIndex: id, ingredientIndex: ingredientIndex })"
          @changeAmount="changeAmount({ recipeIndex: id, ingredientIndex: ingredientIndex, amount: $event })">
        </Ingredient>
      </div>
      <div class="md-layout-item md-size-20 md-small-size-50 md-xsmall-size-100 ingredient">
        <md-card>
          <md-card-header class="md-layout">
            <md-button @click="addIngredient({ recipeIndex: id })" class="md-layout-item">Zutat hinzufügen</md-button>
          </md-card-header>
        </md-card>
      </div>
    </div>
  </div>
</template>

<style>
.recipe-info {
  flex-direction: column;
}
.ingredient {
  margin-top: 2rem;
}
</style>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import Ingredient from './Ingredient'
import { caloriesPer100g } from '../foodMath'

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
    calsPer100 () {
      return caloriesPer100g(this.recipe.ingredients, this.ingredientsById)
    }
  },
  methods: {
    ...mapMutations(['load', 'changeName', 'changeRecipe', 'saveIngredient', 'addIngredient', 'removeIngredient', 'newIngredient', 'selectIngredient', 'unselectIngredient', 'changeAmount']),
  }
}
</script>

