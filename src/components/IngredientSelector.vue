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
      let newName = event.target.value
      let ingredient = this.ingredients.find(x => x.name === newName)
      if (ingredient) {
        this.$emit('matchingIngredient', ingredient)
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
    ...mapGetters(['ingredientsById'])
  }
}
</script>