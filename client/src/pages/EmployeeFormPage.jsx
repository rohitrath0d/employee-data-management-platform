import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { employeeAPI } from '../services/employeeService'
import { useEmployee } from '../hooks/useEmployees'
import { validateEmployeeForm, validateField } from '../utils/validation'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'

const EmployeeFormPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditMode = Boolean(id)

  // Fetch employee data if editing
  const { employee, loading: fetchLoading, error: fetchError } = useEmployee(id)

  console.log('Employee data:', employee)
  console.log('isEditMode:', isEditMode)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    phone: '',
    department: '',
  })

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Populate form when editing
  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || '',
        email: employee.email || '',
        position: employee.position || '',
        phone: employee.phone || '',
        department: employee.department || '',
      })
    }
  }, [employee])

  const handleChange = async (e) => {
    const { name, value } = e.target
    // Keep only digits for phone input to make it easy to convert to number later
    const sanitizedValue = name === 'phone' ? value.replace(/\D/g, '') : value
    setFormData((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }))

    // Real-time validation for touched fields
    if (touched[name]) {
      const error = await validateField(name, sanitizedValue)
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }))
    }
  }

  const handleBlur = async (e) => {
    const { name, value } = e.target
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }))

    // Validate field on blur
    const error = await validateField(name, value)
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true
      return acc
    }, {})
    setTouched(allTouched)

    // Validate form
    const validation = await validateEmployeeForm(formData)
    
    if (!validation.isValid) {
      setErrors(validation.errors)
      toast.error('Please fix the form errors before submitting')
      return
    }

    setIsSubmitting(true)

    try {
      if (isEditMode) {
        await employeeAPI.updateEmployee(id, formData)
        toast.success('Employee updated successfully!')
      } else {
        await employeeAPI.createEmployee(formData)
        toast.success('Employee added successfully!')
      }
      navigate('/employees')
    } catch (err) {
      // Handle API validation errors
      if (err.message.includes('email') && err.message.includes('exists')) {
        setErrors((prev) => ({ ...prev, email: 'This email is already registered' }))
        toast.error('Email already exists')
      } else {
        toast.error(err.message || 'Failed to save employee')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    navigate('/employees')
  }

  // Loading state when fetching employee data
  if (fetchLoading && isEditMode) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <LoadingSpinner message="Loading employee data..." />
      </div>
    )
  }

  // Error state when fetching employee data
  if (fetchError && isEditMode) {
    return (
      <div className="max-w-2xl mx-auto">
        <ErrorMessage 
          message={fetchError} 
          onRetry={() => navigate('/employees')} 
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={handleCancel}
            className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-6 transition-colors group bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm hover:shadow-md"
          >
            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Team
          </button>
          
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
              {isEditMode ? 'Edit Employee' : 'Add New Employee'}
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              {isEditMode
                ? 'Update employee information below'
                : 'Fill in the details to add a new team member'}
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white">Employee Information</h2>
            <p className="text-blue-100 mt-1">Please fill in all required fields marked with *</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Form Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Name Field */}
              <div className="lg:col-span-2">
                <label htmlFor="name" className="block text-sm font-bold text-slate-800 mb-3">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Full Name <span className="text-red-500 ml-1">*</span>
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-5 py-4 rounded-2xl text-slate-900 placeholder-slate-400 bg-slate-50 border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white text-lg font-medium ${
                      touched.name && errors.name 
                        ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-500/20' 
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                    placeholder="Enter full name"
                  />
                  {touched.name && errors.name && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                {touched.name && errors.name && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-sm text-red-700 flex items-center">
                      <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.name}
                    </p>
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-slate-800 mb-3">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                    Email Address <span className="text-red-500 ml-1">*</span>
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-5 py-4 rounded-2xl text-slate-900 placeholder-slate-400 bg-slate-50 border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white text-lg font-medium ${
                      touched.email && errors.email 
                        ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-500/20' 
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                    placeholder="john.doe@company.com"
                  />
                  {touched.email && errors.email && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                {touched.email && errors.email && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-sm text-red-700 flex items-center">
                      <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.email}
                    </p>
                  </div>
                )}
              </div>

              {/* Position Field */}
              <div>
                <label htmlFor="position" className="block text-sm font-bold text-slate-800 mb-3">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                    </svg>
                    Position <span className="text-red-500 ml-1">*</span>
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-5 py-4 rounded-2xl text-slate-900 placeholder-slate-400 bg-slate-50 border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white text-lg font-medium ${
                      touched.position && errors.position 
                        ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-500/20' 
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                    placeholder="Software Engineer"
                  />
                  {touched.position && errors.position && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                {touched.position && errors.position && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-sm text-red-700 flex items-center">
                      <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.position}
                    </p>
                  </div>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-bold text-slate-800 mb-3">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Phone Number
                    <span className="text-xs text-slate-500 ml-2 font-normal">(10 digits)</span>
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-5 py-4 rounded-2xl text-slate-900 placeholder-slate-400 bg-slate-50 border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white text-lg font-medium ${
                      touched.phone && errors.phone 
                        ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-500/20' 
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                    placeholder="1234567890"
                    maxLength="10"
                  />
                  {formData.phone && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                        {formData.phone.length}/10
                      </span>
                    </div>
                  )}
                  {touched.phone && errors.phone && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                {touched.phone && errors.phone && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-sm text-red-700 flex items-center">
                      <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.phone}
                    </p>
                  </div>
                )}
              </div>

              {/* Department Field */}
              <div>
                <label htmlFor="department" className="block text-sm font-bold text-slate-800 mb-3">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Department
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-5 py-4 rounded-2xl text-slate-900 placeholder-slate-400 bg-slate-50 border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white text-lg font-medium ${
                      touched.department && errors.department 
                        ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-500/20' 
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                    placeholder="Engineering"
                  />
                  {touched.department && errors.department && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                {touched.department && errors.department && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-sm text-red-700 flex items-center">
                      <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.department}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-slate-200">
              <button
                type="button"
                onClick={handleCancel}
                className="sm:flex-1 px-8 py-4 border-2 border-slate-300 rounded-2xl text-slate-700 hover:bg-slate-50 hover:border-slate-400 font-bold text-lg transition-all duration-300 hover:scale-105 order-2 sm:order-1"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="sm:flex-1 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 inline-flex items-center justify-center shadow-2xl hover:shadow-blue-500/25 min-h-[60px] order-1 sm:order-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {isEditMode ? 'Updating Employee...' : 'Adding Employee...'}
                  </>
                ) : (
                  <>
                    {isEditMode ? (
                      <>
                        <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Update Employee
                      </>
                    ) : (
                      <>
                        <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add Employee
                      </>
                    )}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EmployeeFormPage
