import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import mainLayout from '@/main.layout.vue'

import catalogRoutes from './catalogRoutes'
import priceRoutes from './priceRoutes'
import detailRoutes from './detailRoutes'
import seriesRouter from './seriesRouter'

const authLayout = () => import('@/auth.layout.vue')
const loginPage = () => import('@/components/auth/signIn.page.vue')
const signUpPage = () => import('@/components/auth/signUp.page.vue')

import homePage from '@/components/homePage'
import allImages from '@/components/allImages/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: mainLayout,
    children: [
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
    ],
    meta: {
      authRequired: true
    }
  },
  {
    path: '/auth',
    component: authLayout,
    children: [
      {
        path: 'login',
        component: loginPage
      },
      {
        path: 'signup',
        component: signUpPage
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired && !store.getters.isLoggedIn)) {
    next({
      path: '/auth/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
})
export default router
