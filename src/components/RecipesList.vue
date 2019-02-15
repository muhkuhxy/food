<template>
  <div>
      <ul v-if="this.recipes.length">
        <li v-for="(r, index) in recipes" :key="index">
          <router-link :to="{ path: `/recipe/${index}` }">{{ r.name }}</router-link>
        </li>
      </ul>
      <div v-else>Keine Rezepte</div>
      <button @click="add">Neues Rezept</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

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
    ...mapMutations(['newRecipe', 'selectRecipe', 'load'])
  },
  computed: mapState(['recipes'])
}
</script>