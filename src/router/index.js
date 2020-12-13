import Vue from 'vue'
import VueRouter from 'vue-router'
import catalog from '@/components/catalog/index'
import editCatalogItem from '@/components/catalog/editCatalogItem'
import allImages from '@/components/allImages/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'catalog',
    component: catalog
  },
  {
    path: '/catalog/newItem',
    name: 'newItem',
    component: editCatalogItem,
    props: {
      type: 'item'
    }
  },
  {
    path: '/catalog/newGroup',
    name: 'newGroup',
    component: editCatalogItem,
    props: {
      type: 'group'
    }
  },
  {
    path: '/catalog/editGroup/:id',
    component: editCatalogItem,
    props: {
      type: 'group'
    }
  },
  {
    path: '/catalog/editItem/:id',
    component: editCatalogItem,
    props: {
      type: 'item'
    }
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
