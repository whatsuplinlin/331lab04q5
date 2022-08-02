<template>
  <h1>Events For Good</h1>
  <div class="passenger">
    <EventCard
      v-for="passenger in passengers"
      :key="passenger.id"
      :passenger="passenger"
    ></EventCard>
    <div class="pagination">
      <router-link
        id="page-prev"
        :to="{ name: 'EventList', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
      >
        Prev Page</router-link
      >
      <router-link
        id="page-next"
        :to="{ name: 'EventList', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
      >
        Next Page</router-link
      >
    </div>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'
import { watchEffect } from '@vue/runtime-core'
export default {
  name: 'EventListView',
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
      totalEvents: 0 //<--- Added this to store totalEvents
    }
  },
  created() {
    watchEffect(() => {
      EventService.getPassengers(this.perPage, this.page)
        .then((response) => {
          this.passengers = response.data
          this.totalEvents = response.headers['x-total-count'] //<--- Store it
        })
        .catch((error) => {
          console.log(error)
        })
    })
  },
  computed: {
    hasNextPage() {
      //First, calculate total pages
      let totalPages = Math.ceil(this.totalEvents / this.perPage) // 2 is events per page

      //Then check to see if the current page is less than the total pages
      return this.page < totalPages
    }
  }
}
</script>
<style scoped>
.passenger {
  display: flex;
  flex-direction: column;
  align-items: center;
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
