import * as Yup from 'yup'

export const employeeValidationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters')
    .required('Name is required')
    .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),

  email: Yup.string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email is required')
    .max(100, 'Email must not exceed 100 characters'),

  position: Yup.string()
    .trim()
    .min(2, 'Position must be at least 2 characters')
    .max(50, 'Position must not exceed 50 characters')
    .required('Position is required'),

  phone: Yup.string()
    .trim()
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
    .nullable(),

  department: Yup.string()
    .trim()
    .min(2, 'Department must be at least 2 characters')
    .max(50, 'Department must not exceed 50 characters')
    .nullable(),
})

export const validateEmployeeForm = async (data) => {
  try {
    await employeeValidationSchema.validate(data, { abortEarly: false })
    return { isValid: true, errors: {} }
  } catch (err) {
    const errors = {}
    err.inner.forEach((error) => {
      errors[error.path] = error.message
    })
    return { isValid: false, errors }
  }
}

export const validateField = async (fieldName, value) => {
  try {
    await Yup.reach(employeeValidationSchema, fieldName).validate(value)
    return null
  } catch (err) {
    return err.message
  }
}
