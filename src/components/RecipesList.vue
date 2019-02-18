<template>
  <div class="md-layout">
      <md-list class="md-double-line md-layout-item md-size-25">
        <md-list-item>
          <a @click.prevent="add" href="#" class="md-list-item-text md-accent">Neues Rezept</a>
        </md-list-item>
        <md-list-item v-for="(recipe, index) in recipes" :key="index">
          <span class="md-list-item-text">
            <router-link :to="{ path: `/recipe/${index}` }">{{ recipe.name }}</router-link>
            <span>{{ countCalories(recipe) }} kcal</span>
          </span>
          <md-button class="md-icon-button md-list-action md-accent" @click="removeRecipe(index)">
            <md-icon>delete</md-icon>
          </md-button>
        </md-list-item>
      </md-list>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import { caloriesPer100g } from '../foodMath'

export default {
  mounted () {
    if (!this.recipes.length) {
      this.load()
    }
  },
  methods: {
    add () {
      let id = this.recipes.length
      this.newRecipe('Rezept')
      this.$router.push({ path: `/recipe/${id}` })
    },
    ...mapMutations(['newRecipe', 'load', 'removeRecipe']),
    countCalories (recipe) {
      return caloriesPer100g(recipe.ingredients, this.ingredientsById)
    }
  },
  computed: {
    ...mapState(['recipes']),
    ...mapGetters(['ingredientsById'])
  }
}
</script>