<template>
  <ul v-if="ingredient">
    <li><label><input type="number" :value="ingredient.calories" @change="emitChange($event, 'calories')"/> Kalorien</label></li>
    <li><label><input type="number" :value="ingredient.carbs" @change="emitChange($event, 'carbs')"/> Kohlenhydrate</label></li>
    <li><label><input type="number" :value="ingredient.protein" @change="emitChange($event, 'protein')"/> Eiweiss</label></li>
    <li><label><input type="number" :value="ingredient.fat" @change="emitChange($event, 'fat')"/> Fett</label></li>
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
