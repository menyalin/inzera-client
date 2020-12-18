
import Vue from 'vue'
import VueRouter from 'vue-router'

import catalogRoutes from './catalogRoutes'

import homePage from '@/components/homePage'
import allImages from '@/components/allImages/index.vue'

Vue.use(VueRouter)

const routes = [
  ...catalogRoutes,
  {
    path: '/',
    name: 'homePage',
    component: homePage
  },
  {
    path: '/images',
    component: allImages
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
