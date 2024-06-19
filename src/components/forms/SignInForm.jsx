import React from 'react';
import { useFormik } from 'formik';
import { signInvalidationSchema } from '../../utils/formValidation';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import { useFirebase } from '../../FirebaseProvider';
import { useNavigate } from 'react-router-dom';

function SignUpForm({onClose}) {
  const { signInUser } = useFirebase();
  let navigate =useNavigate()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: signInvalidationSchema,
    onSubmit: async (values, { resetForm }) => {
      const { email, password } = values;
      await signInUser(email, password);
      resetForm(); // Reset the form after successful submission
      onClose()
      
    },
  });

  return (
    <div className="">
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <InputField
          type="email"
          name="email"
          label="Enter Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.email}
          touched={formik.touched.email}
          className="w-full border-blue-500 border"
        />
        <InputField
          type="password"
          name="password"
          label="Enter Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.password}
          touched={formik.touched.password}
          className="w-full border-blue-500 border"
        />
        <Button
          type="submit"
          className="w-full bg-white text-black border border-black hover:bg-green-500 hover:text-white hover:border-0"
        >
          Signin With Email
        </Button>
      </form>
    </div>
  );
}

export default SignUpForm;
