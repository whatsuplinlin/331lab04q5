<template>
  <div class="event-card">
    <h4>{{ event.first_name }} {{ event.last_name }}</h4>
  </div>
</template>

<script>
export default {
  name: 'EventCard',
  data() {
    return {
      event: {
        id: 1,
        first_name: 'Tiler',
        last_name: 'Peile',
        email: 'tpeile0@ycombinator.com',
        gender: 'Male',
        ip_address: '176.3.147.168',
        Source: 'Oshnavīyeh',
        Destination: 'Caobi',
        travelDate: '6/16/2022',
        airlineId: 2
      }
    }
  }
}
</script>

<style scoped>
.event-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}

.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
</style>
