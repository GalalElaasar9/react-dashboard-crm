import axios from 'axios'

const api = axios.create({
  baseURL: "https://dummyjson.com",
  headers:{
    "Content-Type": "application/json"
  },
  // timeout:1000,
})
export default api;
