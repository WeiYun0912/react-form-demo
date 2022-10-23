import { Formik, Form, useField, ErrorMessage } from "formik";
import * as yup from "yup";
import React from "react";
import "./style.css";
import { TextField } from "@mui/material";

const FormikForm = () => {
  const validate = yup.object({
    fullName: yup.string().max(10, "長度不得超過10").required("欄位不得為空"),
    email: yup.string().email("電子郵件的格式有誤").required("欄位不得為空"),
    age: yup.number().min(1, "年齡不得小於1").required("欄位不得為空"),
    password: yup.string().min(6).required("欄位不得為空"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "密碼匹配不一致"),
  });

  return (
    <Formik
      initialValues={{
        fullName: "",
        email: "",
        age: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      <Form>
        <InputField
          label="FullName"
          name="fullName"
          type="text"
          placeholder="FullName..."
        />

        <InputField
          label="Email"
          name="email"
          type="text"
          placeholder="Email..."
        />
        <InputField label="Age" name="age" type="number" placeholder="Age..." />
        <InputField
          label="Password"
          name="password"
          type="password"
          placeholder="Password..."
        />
        <InputField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password..."
        />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

const InputField = ({ ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <TextField
        {...props}
        {...field}
        error={meta.error && true}
        helperText={meta.error}
      />
      {/* <ErrorMessage component="p" name={field.name} /> */}
    </>
  );
};

export default FormikForm;
