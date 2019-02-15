<template>
  <label><input type="text" :value="name" placeholder="Zutat" @input="updateName"/></label>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

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
    ingredient () {
      return this.ingredients.find(x => x.name === this.name)
    }
  }
}
</script>