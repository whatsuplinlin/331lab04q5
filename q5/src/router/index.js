import { createRouter, createWebHistory } from 'vue-router'
import PassengerView from '../views/PassengerView.vue'
import AboutView from '../views/AboutView.vue'
import PassengerDetailView from '../views/event/PassengerDetailView.vue'
import PassengerLayoutView from '../views/event/PassengerLayoutView.vue'
import AirLineDetailView from '../views/event/AirLineDetailView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import EventService from '@/service/EventService.js'
import GStore from '@/store'
import NProgress from 'nprogress'
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
    beforeEnter: (to) => {
      return (
        EventService.getPassenger(to.params.id)
          .then((response) => {
            //Still need to set the data here
            GStore.passenger = response.data
          })
          .catch((error) => {
            if (error.response && error.response.status == 404) {
              return {
                name: '404Resource',
                params: { resource: 'passenger' }
              }
            } else {
              return { name: 'NetworkError' }
            }
          }),
        EventService.getAirLine(to.params.id) //Return and params.id
          .then((response) => {
            //Still need to set the data here
            GStore.airline = response.data
          })
          .catch((error) => {
            if (error.response && error.response.status == 404) {
              return {
                name: '404Resource',
                params: { resource: 'passenger' }
              }
            } else {
              return { name: 'NetworkError' }
            }
          })
      )
    },

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
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach(() => {
  NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
