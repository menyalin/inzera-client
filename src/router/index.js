import Vue from 'vue'
import VueRouter from 'vue-router'
import catalog from '@/components/catalog/index'
import newCatalogGroup from '@/components/catalog/newCatalogGroup'
import newCatalogItem from '@/components/catalog/newCatalogItem'
import allImages from '@/components/allImages/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: catalog
  },
  {
    path: '/catalog/newItem',
    component: newCatalogItem
  },
  {
    path: '/catalog/newGroup',
    component: newCatalogGroup
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
