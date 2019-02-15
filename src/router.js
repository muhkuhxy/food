import Vue from 'vue'
import VueRouter from 'vue-router'
import RecipesList from './components/RecipesList'
import RecipeDetail from './components/Recipe'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/', component: RecipesList },
    { path: '/recipe/:id', component: RecipeDetail, props: true },
  ]
})
