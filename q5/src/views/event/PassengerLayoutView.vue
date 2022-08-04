<template>
  <div v-if="GStore.passenger">
    <div id="nav">
      <router-link :to="{ name: 'PassengerDetailView' }">
        Passenger Details
      </router-link>
      |
      <router-link :to="{ name: 'AirLineDetailView' }">
        AirLine Detail
      </router-link>
    </div>
    <router-view :passenger="GStore.passenger" :airline="GStore.airline" />
  </div>
</template>

<script>
export default {
  inject: ['GStore']
}
</script>

<style scoped>
#nav a {
  flex: 1;
  color: #1a7a2f;
  text-decoration: underline;
}
</style>
