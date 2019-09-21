import React, {useState} from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import Users from "./Users"
import TOS from "./TOS"
import axios from "axios"

function LoginForm({ values, errors, touched, isSubmitting }) {
  const [userList, setUserList] = useState({
    name: 'kyle richardson',
    email: 'kyle.r@me.com',
    password: '123456',
    account: 'gold'
  })

  return (
    <div className="form-container">
      <Form>
        <h1>Create Account</h1>
        <div>
          {touched.name && errors.name && <p>{errors.name}</p>}
          <Field type="name" name="name" placeholder="Name" />
        </div>
        <div>
          {touched.email && errors.email && <p>{errors.email}</p>}
          <Field type="email" name="email" placeholder="Email" />
        </div>
        <div>
          {touched.password && errors.password && <p>{errors.password}</p>}
          <Field type="password" name="password" placeholder="Password" />
        </div>
        <Field component="select" name="account">
          <option value="gold">Gold</option>
          <option value="silver">Silver</option>
          <option value="platinum">Platinum</option>
        </Field>
        <div className="hide">
          <TOS />
        </div>
        <label>
          <Field type="checkbox" name="tos" checked={values.tos} />
          Accept TOS
        </label>
        <button disabled={isSubmitting}>Submit!</button>
      </Form>
      <Users userList={userList}/>
    </div>
    
  );
}



const FormikLoginForm = withFormik({
  
  mapPropsToValues({ email, password, tos, account, name }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      tos: tos || false,
      account: account || "silver"
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string()
      .required(),
    email: Yup.string()
      .email("Email not valid")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be 6 characters or longer")
      .required()
  }),

  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    if (values.email === "waffle@syrup.com") {
      setErrors({ email: "That email is already taken" });
    } else {
      axios
        .post("https://reqres.in/api/users", values)
        .then(response => {
          console.log(response)
          resetForm();
          setSubmitting(false);
        })
        .catch(err => {
          console.log(err); 
          setSubmitting(false);
        });
    }
  }
})(LoginForm);

export default FormikLoginForm;