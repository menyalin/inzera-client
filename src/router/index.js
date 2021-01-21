import Vue from 'vue'
import VueRouter from 'vue-router'

import catalogRoutes from './catalogRoutes'
import priceRoutes from './priceRoutes'
import detailRoutes from './detailRoutes'
import seriesRouter from './seriesRouter'

import homePage from '@/components/homePage'
import allImages from '@/components/allImages/index.vue'

Vue.use(VueRouter)

const routes = [
  ...catalogRoutes,
  ...priceRoutes,
  ...detailRoutes,
  ...seriesRouter,
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
