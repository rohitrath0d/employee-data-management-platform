import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useEmployees } from '../hooks/useEmployees'
import { filterEmployees } from '../utils/helpers'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import EmployeeTable from '../components/EmployeeTable'
import EmptyState from '../components/EmptyState'
import SearchBar from '../components/SearchBar'

const EmployeeListPage = () => {
  const navigate = useNavigate()
  const { employees, loading, error, refetch, deleteEmployee } = useEmployees()
  const [searchTerm, setSearchTerm] = useState('')

  // Filter employees based on search term using memoization for performance
  const filteredEmployees = useMemo(() => {
    return filterEmployees(employees, searchTerm)
  }, [employees, searchTerm])

  const handleAddEmployee = () => {
    navigate('/employees/new')
  }

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const handleDeleteEmployee = async (id) => {
    const loadingToast = toast.loading('Deleting employee...')
    
    const result = await deleteEmployee(id)
    
    toast.dismiss(loadingToast)
    
    if (result.success) {
      toast.success('Employee deleted successfully!')
    } else {
      toast.error(`Failed to delete employee: ${result.error}`)
    }
    
    return result
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <LoadingSpinner message="Loading employees..." />
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <ErrorMessage message={error} onRetry={refetch} />
      </div>
    )
  }

  // Empty state (no employees at all)
  if (employees.length === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <EmptyState onAddClick={handleAddEmployee} />
      </div>
    )
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header Section */}
      <div className="text-center sm:text-left">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Team Members
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl">
              Manage your team efficiently with our modern employee management system
            </p>
          </div>
          <button
            onClick={handleAddEmployee}
            className="btn-primary inline-flex items-center bg-blue-500 justify-center px-6 py-3 text-white font-semibold rounded-xl hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg min-w-[160px]"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add Employee
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="card p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-600 uppercase tracking-wide mb-2">
                Total Employees
              </p>
              <p className="text-3xl font-bold text-slate-900 mb-1">
                {employees.length}
              </p>
              <p className="text-sm text-emerald-600 font-medium">
                Active team members
              </p>
            </div>
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="card p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-600 uppercase tracking-wide mb-2">
                Active Status
              </p>
              <p className="text-3xl font-bold text-slate-900 mb-1">
                {employees.length}
              </p>
              <p className="text-sm text-emerald-600 font-medium">
                All active
              </p>
            </div>
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="card p-6 hover:scale-105 transition-all duration-300 sm:col-span-2 lg:col-span-1">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-600 uppercase tracking-wide mb-2">
                Departments
              </p>
              <p className="text-3xl font-bold text-slate-900 mb-1">
                {new Set(employees.map((emp) => emp.position)).size}
              </p>
              <p className="text-sm text-purple-600 font-medium">
                Unique positions
              </p>
            </div>
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <SearchBar
        onSearch={handleSearch}
        placeholder="Search by name, email, position, or department..."
        totalResults={filteredEmployees.length}
      />

      {/* Employee Table or No Results */}
      {filteredEmployees.length > 0 ? (
        <div className="card overflow-hidden">
          <EmployeeTable employees={filteredEmployees} onDelete={handleDeleteEmployee} />
        </div>
      ) : (
        <div className="card p-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">No Results Found</h3>
          <p className="text-slate-600 mb-6 max-w-md mx-auto">
            No employees match your search criteria "{searchTerm}". Try adjusting your search terms.
          </p>
          <button
            onClick={() => setSearchTerm('')}
            className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-medium"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  )
}

export default EmployeeListPage
