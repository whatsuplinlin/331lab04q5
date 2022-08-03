<template>
  <h1>Airline ID: {{ airline.id }} {{ airline.AirlineName }}</h1>
  <p>Email: {{ airline.email }} | Address: {{ airline.address }}</p>
</template>
<script>
export default {
  props: ['airline']
}
</script>
