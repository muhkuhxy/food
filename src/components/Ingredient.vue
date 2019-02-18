<template>
  <md-card>
    <md-card-header>
      <md-autocomplete v-model="name" @input="updateName" :md-options="ingredientNames" :md-fuzzy-search="true">
        <label>Zutat</label>
      </md-autocomplete>
    </md-card-header>
    <md-card-content>
      <md-field>
        <label>Menge (in kg oder l)</label>
        <md-input type="number" :value="ingredientRef.amount" @input="$emit('changeAmount', $event)"/>
      </md-field>
    </md-card-content>
    <md-card-expand>
      <md-card-actions md-alignment="space-between">
        <div>
          <md-button @click="createNewIngredient" class="md-primary save-recipe" :disabled="!isNew">
            <md-icon>open_in_new</md-icon>
            <span class="save-recipe-label">Speichern</span>
          </md-button>
          <md-button class="md-accent" @click="$emit('removeIngredient')">Entfernen</md-button>
        </div>
        <md-card-expand-trigger>
          <md-button class="md-icon-button">
            <md-icon>keyboard_arrow_down</md-icon>
          </md-button>
        </md-card-expand-trigger>
      </md-card-actions>
      <md-card-expand-content>
        <md-card-content>
          <Nutrients :id="ingredientRef.id"></Nutrients>
        </md-card-content>
      </md-card-expand-content>
    </md-card-expand>
  </md-card>
</template>

<style scoped>
.save-recipe .md-button-content {
  display: flex;
}
.save-recipe-label {
  align-self: center;
  margin-left: 0.3em;
}
</style>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import Nutrients from './Nutrients.vue'

export default {
  props: [
    'ingredientRef'
  ],
  data () {
    return {
      name: null
    }
  },
  methods: {
    updateName (value) {
      this.name = value
      if (this.ingredient) {
        this.$emit('selectIngredient', this.ingredient)
      } else {
        this.$emit('unselectIngredient')
      }
    },
    createNewIngredient () {
      let id = this.ingredients.map(x => x.id).reduce(Math.max, 0) + 1
      this.$emit('newIngredient', {
        id,
        name: this.name,
        calories: id * 3 + 10
      })
      this.$emit('selectIngredient', { id })
    }
  },
  mounted () {
    if (this.ingredientRef.id != null) {
      this.name = this.ingredientsById[this.ingredientRef.id].name
    }
  },
  computed: {
    ...mapState(['ingredients']),
    ...mapGetters(['ingredientsById']),
    ...mapMutations(['changeAmount']),
    ingredient () {
      return this.ingredients.find(x => x.name === this.name)
    },
    isNew () {
      return this.name && !this.ingredient
    },
    ingredientNames () {
      return this.ingredients.map(x => x.name)
    }
  },
  components: {
    Nutrients,
    // IngredientSelector
  }
}
</script>