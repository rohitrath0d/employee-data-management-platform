export const debounce = (func, delay = 300) => {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

export const filterEmployees = (employees, searchTerm) => {
  if (!searchTerm.trim()) {
    return employees
  }

  const lowerSearchTerm = searchTerm.toLowerCase()

  return employees.filter((employee) => {
    const name = employee.name?.toLowerCase() || ''
    const email = employee.email?.toLowerCase() || ''
    const position = employee.position?.toLowerCase() || ''
    const department = employee.department?.toLowerCase() || ''

    return (
      name.includes(lowerSearchTerm) ||
      email.includes(lowerSearchTerm) ||
      position.includes(lowerSearchTerm) ||
      department.includes(lowerSearchTerm)
    )
  })
}

export const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
