import axios from 'axios'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for adding auth tokens if needed
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data?.message || error.message || 'An error occurred'
    return Promise.reject(new Error(errorMessage))
  }
)

// Employee API endpoints
export const employeeAPI = {
  // Get all employees
  getAllEmployees: async () => {
    const response = await api.get('/employees')
    return response.data
  },

  // Get employee by ID
  getEmployeeById: async (id) => {
    const response = await api.get(`/employees/${id}`)
    return response.data
  },

  // Create new employee
  createEmployee: async (employeeData) => {
    const response = await api.post('/employees', employeeData)
    return response.data
  },

  // Update employee
  updateEmployee: async (id, employeeData) => {
    const response = await api.put(`/employees/${id}`, employeeData)
    return response.data
  },

  // Delete employee
  deleteEmployee: async (id) => {
    const response = await api.delete(`/employees/${id}`)
    return response.data
  },
}

export default api
