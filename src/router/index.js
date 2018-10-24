import Vue from 'vue'
import Router from 'vue-router'
import Home from '@page/home/Home'
import Search from '@page/search/Search'
import Cart from '@page/cart/Cart'
import Mine from '@page/mine/Mine'
import PlantInfo from '@page/plantInfo/PlantInfo'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/mine',
      name: 'mine',
      component: Mine
    },
    {
      path: '/plantInfo',
      name: 'PlantInfo',
      component: PlantInfo
    }
  ],
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active'
})
