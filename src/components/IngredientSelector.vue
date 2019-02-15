<template>
  <div>
    <input type="text" :value="name" placeholder="Zutat" @input="updateName"/>
    <button v-if="exists" @click="$emit('saveIngredient', name)">+</button>
    <a v-if="name" :href="`https://www.google.com/search?q=${name}+n%C3%A4hrwerte`" target="_blank">Google</a>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  props: ['id'],
  data () {
    return {
      name: null
    }
  },
  methods: {
    updateName (event) {
      this.name = event.target.value
      if (this.ingredient) {
        this.$emit('matchingIngredient', this.ingredient)
      } else {
        this.$emit('noMatchingIngredient')
      }
    }
  },
  mounted () {
    if (this.id != null) {
      this.name = this.ingredientsById[this.id].name
    }
  },
  computed: {
    ...mapState(['ingredients']),
    ...mapGetters(['ingredientsById']),
    ...mapMutations(['addIngredient']),
    ingredient () {
      return this.ingredients.find(x => x.name === this.name)
    },
    exists () {
      return this.name && !this.ingredient
    }
  }
}
</script>

<style lang="css" scoped>
div {
  display: inline-block;
}
</style>