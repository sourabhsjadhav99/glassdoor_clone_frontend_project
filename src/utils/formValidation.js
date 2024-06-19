import * as Yup from 'yup';

// Defining the validation schema using Yup
const signInvalidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .max(50, "Email must be less than 50 characters")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(30, "Password must be less than 30 characters")
    .matches(
      /^(?=.*[!@#$%^&*])/, // Ensure at least one special character
      "Password must contain at least one special character"
    )
    .required("Password is required"),
});



const personalInfoValidationSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(3, "First name must be more than 3 characters")
    .max(30, "First name must be less than 30 characters")
    .required("First name is required"),
  lastname: Yup.string()
    .min(3, "Last name must be more than 3 characters")
    .max(30, "Last name must be less than 30 characters")
    .required("Last name is required"),
  mobile: Yup.string()
    .matches(
      /^(\+?\d{1,4}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?[\d\-.\s]{7,10}$/,
      "Invalid mobile number format"
    )
    .required("Mobile number is required"),
  role: Yup.string()
    .min(3, "Role must be more than 3 characters")
    .max(50, "Role must be less than 50 characters")
    .required("Role is required"),
    pdfFile: Yup.mixed()
    .required("PDF file is required")
    .test(
      "fileFormat",
      "PDF only",
      value => value && value.type === "application/pdf"
    )

});


const updatePersonalInfoValidationSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(3, "First name must be more than 3 characters")
    .max(30, "First name must be less than 30 characters")
    .required("First name is required"),
  lastname: Yup.string()
    .min(3, "Last name must be more than 3 characters")
    .max(30, "Last name must be less than 30 characters")
    .required("Last name is required"),
  mobile: Yup.string()
    .matches(
      /^(\+?\d{1,4}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?[\d\-.\s]{7,10}$/,
      "Invalid mobile number format"
    )
    .required("Mobile number is required"),
  role: Yup.string()
    .min(3, "Role must be more than 3 characters")
    .max(50, "Role must be less than 50 characters")
    .required("Role is required"),
   

});


// Exporting the validation schema for use in other files
export { signInvalidationSchema, personalInfoValidationSchema, updatePersonalInfoValidationSchema };
