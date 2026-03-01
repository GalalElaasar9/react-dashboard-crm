import axios from 'axios'

const api = axios.create({
  baseURL: "http://localhost:5000/api"
})

// Add a request interceptor
api.interceptors.request.use(
  (config)=>{
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export async function registerForm(values){
  const {data} = await api.post('/auth/register' , values)
  return data
}

export async function loginForm(values){
  const {data} = await api.post('/auth/login',values);
  return data
}

export default api;