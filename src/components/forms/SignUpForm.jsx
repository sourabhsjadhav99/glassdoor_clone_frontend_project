import React from "react";
import { useFormik } from "formik";
import { signInvalidationSchema } from "../../utils/formValidation";
import InputField from "../../components/InputField";
import Button from "../../components/Button";

function SignUpForm() {
  // Define formik object with initial values, validation schema, and onSubmit function
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: signInvalidationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <InputField
          type="text"
          name="email"
          label="Enter Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.email}
          touched={formik.touched.email}
          className={"w-[100%] border-blue-500 border"}
        />
        <Button type="submit" className="w-[100%] bg-white text-black border border-black hover:bg-green-500 hover:text-white hover:border-0">Continue With Email</Button>
      </form>
    </div>
  );
}

export default SignUpForm;
