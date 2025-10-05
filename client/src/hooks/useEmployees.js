import { useState, useEffect } from 'react'
import { employeeAPI } from '../services/employeeService'

export const useEmployees = () => {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchEmployees = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await employeeAPI.getAllEmployees()
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.employees)
        ? data.employees
        : Array.isArray(data?.data)
        ? data.data
        : []
      setEmployees(list)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  const deleteEmployee = async (id) => {
    try {
      await employeeAPI.deleteEmployee(id)
      setEmployees((prev) => prev.filter((emp) => emp.id !== id && emp._id !== id))
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  return {
    employees,
    loading,
    error,
    refetch: fetchEmployees,
    deleteEmployee,
  }
}

export const useEmployee = (id) => {
  const [employee, setEmployee] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) {
      setLoading(false)
      return
    }

    const fetchEmployee = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await employeeAPI.getEmployeeById(id)
        // Normalize response so callers get the employee object directly.
        // Support shapes: { employee: {...} } or { data: {...} } or the object itself.
        const normalized = data?.employee ?? data?.data ?? data
        setEmployee(normalized)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchEmployee()
  }, [id])

  return { employee, loading, error }
}
