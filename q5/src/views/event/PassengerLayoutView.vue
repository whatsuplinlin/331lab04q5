<template>
  <div v-if="passenger">
    <div id="nav">
      <router-link :to="{ name: 'PassengerDetailView' }">
        Passenger Details
      </router-link>
      |
      <router-link :to="{ name: 'AirLineDetailView' }">
        AirLine Detail
      </router-link>
    </div>
    <router-view :passenger="passenger" :airline="airline" />
  </div>
</template>

<script>
import EventService from '@/service/EventService.js'
export default {
  props: ['id'],
  data() {
    return {
      passenger: null,
      airline: null
    }
  },
  created() {
    EventService.getPassenger(this.id)
      .then((response) => {
        this.passenger = response.data
      })
      .catch((error) => {
        if (error.response) {
          this.$router.push({
            name: '404Resource',
            params: { resource: 'passenger' }
          })
        }
      })
    EventService.getAirLine(this.id)
      .then((response) => {
        this.airline = response.data
      })
      .catch((error) => {
        if (error.response) {
          this.$router.push({
            name: '404Resource',
            params: { resource: 'passenger' }
          })
        }
      })
  }
}
</script>
<style scoped>
#nav a {
  flex: 1;
  color: #1a7a2f;
  text-decoration: underline;
}
</style>
