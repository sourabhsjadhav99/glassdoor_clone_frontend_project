import * as Yup from 'yup';

// Defining the validation schema using Yup
const signInvalidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .max(50, "Email must be less than 50 characters")
    .required("Email is required"),
});

// Exporting the validation schema for use in other files
export { signInvalidationSchema };
