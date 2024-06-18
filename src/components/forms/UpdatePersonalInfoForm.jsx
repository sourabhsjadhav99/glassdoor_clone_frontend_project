import React, { useEffect } from "react";
import { useFormik } from "formik";
import { personalInfoValidationSchema } from "../../utils/formValidation";
import InputField from "../InputField";
import Button from "../Button";
import { useFirebase } from "../../FirebaseProvider";
import { useNavigate } from "react-router-dom";

function UpdatePersonalInfoForm() {
  const { userData, updateUserInfo } = useFirebase();
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      mobile: "",
      role: "",
      pdfFile: null,
    },
    validationSchema: personalInfoValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      const { firstname, lastname, mobile, role } = values;
      await updateUserInfo({ firstname, lastname, mobile, role }, userData.userId);
      navigate("/personalinfo");
      resetForm();
    },
  });

  useEffect(() => {
    if (userData) {
      formik.setValues({
        firstname: userData.firstname,
        lastname: userData.lastname,
        mobile: userData.mobile,
        role: userData.role,
      });
    }
  }, [userData]);

  return (
    <div className="">
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <InputField
          type="text"
          name="firstname"
          label="Enter First Name"
          value={formik.values.firstname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.firstname}
          touched={formik.touched.firstname}
          className="w-full border-blue-500 border"
        />
        <InputField
          type="text"
          name="lastname"
          label="Enter Last Name"
          value={formik.values.lastname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.lastname}
          touched={formik.touched.lastname}
          className="w-full border-blue-500 border"
        />
        <InputField
          type="text"
          name="mobile"
          label="Enter Mobile Number"
          value={formik.values.mobile}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.mobile}
          touched={formik.touched.mobile}
          className="w-full border-blue-500 border"
        />
        <InputField
          type="text"
          name="role"
          label="Enter Role"
          value={formik.values.role}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.role}
          touched={formik.touched.role}
          className="w-full border-blue-500 border"
        />
        <Button
          type="submit"
          className="w-full bg-white text-black border border-black hover:bg-green-500 hover:text-white hover:border-0"
        >
          Update
        </Button>
      </form>
    </div>
  );
}

export default UpdatePersonalInfoForm;
