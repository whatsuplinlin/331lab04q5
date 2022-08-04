<template>
  <h1>Name: {{ passenger.first_name }} {{ passenger.last_name }}</h1>
  <p>Email: {{ passenger.email }} | Gender: {{ passenger.gender }}</p>
  <p>
    Source: {{ passenger.Source }} to Destination: {{ passenger.Destination }}
  </p>
  <button @click="edit">Edit</button>
</template>
<script>
export default {
  props: ['passenger', 'resa'],
  inject: ['GStore'],
  methods: {
    edit() {
      this.GStore.flashMessage = 'The data is updating '
      setTimeout(() => {
        //After 3 secound remove it
        this.GStore.flashMessage = ''
      }, 5000)
      this.$router.push({
        name: 'PassengerView'
      })
    }
  }
}
</script>
