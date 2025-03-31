const yup = require('yup')

// Schema for user registration
const registerSchema = yup.object({
    email: yup.string().email('Email is invalid').required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
    name: yup
        .string()
        .min(3, 'Name must be between 3 and 50 characters')
        .max(50, 'Name must be between 3 and 50 characters')
        .required('Name is required'),
    dateOfBirth: yup.date().required('Date of Birth is required'),
    gender: yup
        .string()
        .oneOf(['Male', 'Female', 'Other'])
        .required('Gender is required'),
    address: yup
        .string()
        .min(5, 'Address must be between 5 and 100 characters')
        .max(100, 'Address must be between 5 and 100 characters')
        .required('Address is required'),
    subscribeToNewsletter: yup
        .boolean()
        .required('Subscribe to newsletter must be a boolean'),
})

// Schema for profile update
const updateUserSchema = yup.object({
    dateOfBirth: yup.date().optional(),
    gender: yup.string().oneOf(['Male', 'Female', 'Other']).optional(),
    address: yup.string().min(5).max(100).optional(),
    subscribeToNewsletter: yup.boolean().optional(),
})

// Schema for password change
const changePasswordSchema = yup.object({
    currentPassword: yup.string().required('Current password is required'),
    newPassword: yup
        .string()
        .min(8, 'New password must be at least 8 characters')
        .required('New password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('newPassword')], 'Passwords must match')
        .required('Confirm password is required'),
})

module.exports = { registerSchema, updateUserSchema, changePasswordSchema }
