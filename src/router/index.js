import Vue from 'vue'
import VueRouter from 'vue-router'
import catalog from '@/components/catalog/index'
import editCatalogGroup from '@/components/catalog/editCatalogGroup'
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
    component: editCatalogGroup
  },
  {
    path: '/catalog/editGroup/:id',
    component: editCatalogGroup
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
