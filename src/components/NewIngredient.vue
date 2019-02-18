<template>
  <md-dialog :md-active.sync="active" :md-click-outside-to-close="false">
    <md-dialog-title>{{ name }} anlegen</md-dialog-title>
    <md-button :href="`https://www.google.com/search?q=${this.name}+nährwerte`" target="_blank" class="md-primary">Google</md-button>
    <md-dialog-content>
      <md-field>
        <label>Kalorien</label>
        <md-input v-model="calories" @keyup.enter="save"></md-input>
      </md-field>
      <md-field>
        <label>Kohlenhydrate</label>
        <md-input v-model="carbs"></md-input>
      </md-field>
      <md-field>
        <label>Eiwei&szlig;</label>
        <md-input v-model="protein"></md-input>
      </md-field>
      <md-field>
        <label>Fett</label>
        <md-input v-model="fat"></md-input>
      </md-field>
    </md-dialog-content>
    <md-dialog-actions>
      <md-button class="md-accent" @click="$emit('close')">Abbrechen</md-button>
      <md-button class="md-primary" @click="save">Speichern</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<style>
.content {
  margin: 0 1.5rem;
}
</style>

<script>
export default {
 props: ['active', 'name'],
 data () {
   return {
     calories: null,
     carbs: null,
     protein: null,
     fat: null
   }
 },
 methods: {
   save () {
     this.$emit('save', { calories: this.calories, carbs: this.carbs, protein: this.protein, fat: this.fat })
   }
 }
}
</script>