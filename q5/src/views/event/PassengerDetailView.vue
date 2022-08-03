<template>
  <h1>Name: {{ passenger.first_name }} {{ passenger.last_name }}</h1>
  <p>Email: {{ passenger.email }} | Gender: {{ passenger.gender }}</p>
  <p>
    Source: {{ passenger.Source }} to Destination: {{ passenger.Destination }}
  </p>
</template>
<script>
export default {
  props: ['passenger']
}
</script>
