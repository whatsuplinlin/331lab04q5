<template>
  <div class="home">
    <EventCard
      v-for="passenger in passengers"
      :key="passenger.id"
      :passenger="passenger"
    ></EventCard>
    <div class="pagination">
      <router-link
        id="page-prev"
        :to="{
          name: 'PassengerView',
          query: { page: page - 1 }
        }"
        rel="prev"
        v-if="page != 1"
      >
        Prev Page</router-link
      >
      <router-link
        id="page-next"
        :to="{
          name: 'PassengerView',
          query: { page: page + 1 }
        }"
        rel="next"
        v-if="hasNextPage"
      >
        Next Page</router-link
      >
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from '../components/EventCard.vue'
import EventService from '../service/EventService.js'
// import { watchEffect } from '@vue/runtime-core'

export default {
  name: 'PassengerView',
  props: {
    page: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    }
  },
  components: {
    EventCard
  },
  data() {
    return {
      passengers: null,
      totalPassenger: 0
    }
  },
  // eslint-disable-next-line no-unused-vars
  beforeRouteEnter(routeTo, routeFrom, next) {
    EventService.getPassengers(
      parseInt(routeTo.query.page) || 1,
      parseInt(routeTo.query.perPage) || 3
    )
      .then((response) => {
        next((comp) => {
          comp.passengers = response.data
          comp.totalPassenger = response.headers['x-total-count']
        })
      })

      .catch(() => {
        next({ name: 'NetworkError' })
      })
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    EventService.getPassengers(
      parseInt(routeTo.query.page) || 1,
      parseInt(routeTo.query.perPage) || 3
    )
      .then((response) => {
        this.passengers = response.data
        this.totalPassenger = response.headers['x-total-count']
        next()
      })
      .catch(() => {
        next({ name: 'NetworkError' })
      })
  },
  // created() {
  //   watchEffect(() => {
  //     EventService.getPassengers(this.page, this.perPage)
  //       .then((response) => {
  //         this.passengers = response.data
  //         this.totalPassenger = response.headers['x-total-count'] //<--- Store it
  //       })
  //       .catch((error) => {
  //         console.log(error)
  //       })
  //   })
  // },
  computed: {
    hasNextPage() {
      //First, calculate total pages
      let totalPages = Math.ceil(this.totalPassenger / 3)

      //Then check to see if the current page is less than the total pages
      return this.page < totalPages
    }
  }
}
</script>
<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}
h4 {
  font-size: 20px;
}
.pagination {
  display: flex;
  width: 290px;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
