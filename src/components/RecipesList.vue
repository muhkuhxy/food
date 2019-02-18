<template>
  <div class="md-layout">
      <transition-group name="list" tag="md-list" class="md-double-line md-layout-item md-size-25">
        <md-list-item key="new">
          <a @click.prevent="add" href="#" class="md-list-item-text md-accent">Neues Rezept</a>
        </md-list-item>
        <md-divider key="divider"></md-divider>
        <md-list-item v-for="index in alphabeticalRecipeIndexes" :key="recipes[index].name">
          <span class="md-list-item-text">
            <router-link :to="{ path: `/recipe/${index}` }">{{ recipes[index].name }}</router-link>
            <span>{{ countCalories(recipes[index]) }} kcal</span>
          </span>
          <md-button class="md-icon-button md-list-action md-accent" @click="removeRecipe(index)">
            <md-icon>delete</md-icon>
          </md-button>
        </md-list-item>
      </transition-group>
  </div>
</template>

<style scoped>
.list-enter-active, .list-leave-active, .list-move {
  transition: all .5s ease;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: scaleY(0);
}
</style>

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
      this.newRecipe('Neues Rezept')
      this.$router.push({ path: `/recipe/${id}` })
    },
    ...mapMutations(['newRecipe', 'load', 'removeRecipe']),
    countCalories (recipe) {
      return caloriesPer100g(recipe.ingredients, this.ingredientsById)
    }
  },
  computed: {
    ...mapState(['recipes']),
    ...mapGetters(['ingredientsById']),
    alphabeticalRecipeIndexes () {
      let names = this.recipes.map((x, i) => ({ index: i, value: x.name.toLowerCase() }))
      names.sort((a, b) => a.value < b.value ? -1 : a.value > b.value ? 1 : 0)
      return names.map(x => x.index)
    }
  }
}
</script>