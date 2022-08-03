<template>
  <div v-if="passenger">
    <h1>Name: {{ passenger.first_name }} {{ passenger.last_name }}</h1>
    <p>Email: {{ passenger.email }} | Gender: {{ passenger.gender }}</p>
    <p>
      Source: {{ passenger.Source }} Destination : {{ passenger.Destination }}
    </p>
  </div>
</template>

<script>
import EventService from '../service/EventService.js'
export default {
  props: ['id'],
  data() {
    return {
      passenger: null
    }
  },
  created() {
    EventService.getPassenger(this.id)
      .then((response) => {
        this.passenger = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>
