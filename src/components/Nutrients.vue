<template>
  <ul v-if="ingredient">
    <li>Kalorien: {{ ingredient.calories }}</li>
    <li>Kohlenhydrate: {{ ingredient.carbs }}</li>
    <li>Eiweiss: {{ ingredient.protein }}</li>
    <li>Fett: {{ ingredient.fat }}</li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['id'],
  computed: {
    ...mapGetters(['ingredientsById']),
    ingredient () {
      return this.id == null ? null : this.ingredientsById[this.id]
    }
  }
}
</script>
