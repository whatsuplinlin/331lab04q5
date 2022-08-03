import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/se331-2022/passengerdb',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getPassengers(page, perPage) {
    return apiClient.get('/passenger?_page=' + page + '&_limit=' + perPage)
  },
  getPassenger(id) {
    return apiClient.get('/passenger/' + id)
  },
  getAirLine(id) {
    return apiClient.get('/airline/' + id)
  }
}
