import { createRouter, createWebHistory } from 'vue-router'
import PassengerView from '../views/PassengerView.vue'
import AboutView from '../views/AboutView.vue'
import PassengerDetailView from '../views/event/PassengerDetailView.vue'
import PassengerLayoutView from '../views/event/PassengerLayoutView.vue'
import AirLineDetailView from '../views/event/AirLineDetailView.vue'
import NotFoundView from '../views/NotFoundView.vue'
const routes = [
  {
    path: '/',
    name: 'PassengerView',
    component: PassengerView,
    props: (route) => ({
      page: parseInt(route.query.page) || 1,
      perPage: parseInt(route.query.perPage) || 4
    })
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/',
    name: 'PassengerLayout',
    props: true,
    component: PassengerLayoutView,
    children: [
      {
        path: 'passenger',
        name: 'PassengerDetailView',
        component: PassengerDetailView,
        props: true
      },
      {
        path: 'airline',
        name: 'AirLineDetailView',
        component: AirLineDetailView,
        props: true
      }
    ]
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFoundView,
    props: true
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFoundView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
