import React from "react";
import { useFormik } from "formik";
import { personalInfoValidationSchema } from "../../utils/formValidation"; // Make sure this path is correct
import InputField from "../InputField";
import Button from "../Button";
import { useFirebase } from "../../FirebaseProvider";
import { useNavigate } from "react-router-dom";

function CreateProfileForm() {
  const {uploadUserInfo} = useFirebase();
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      mobile: "",
      role: "",
      pdfFile: null
    },
    validationSchema: personalInfoValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      const { firstname, lastname, mobile, role, pdfFile } = values;
      await uploadUserInfo(firstname, lastname, mobile, role, pdfFile)
      navigate("/profile");
      resetForm();
    },
  });
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    formik.setFieldValue("pdfFile", file);
  };

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
        <input
          type="file"
          name="pdfFile"
          onChange={handleFileChange}
          accept="application/pdf"
          className="w-full border-blue-500 border"
        />
        {formik.errors.pdfFile && formik.touched.pdfFile && (
          <div className="text-red-500">{formik.errors.pdfFile}</div>
        )}
        <Button
          type="submit"
          className="w-full bg-white text-black border border-black hover:bg-green-500 hover:text-white hover:border-0"
        >
          Upload
        </Button>
      </form>
    </div>
  );
}

export default CreateProfileForm;

