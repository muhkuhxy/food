<template>
  <ul>
    <li>Kalorien: {{ ingredient ? ingredient.calories : null }}</li>
    <li>Kohlenhydrate: {{ ingredient ? ingredient.carbs : null }}</li>
    <li>Eiweiss: {{ ingredient ? ingredient.protein : null }}</li>
    <li>Fett: {{ ingredient ? ingredient.fat : null }}</li>
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
