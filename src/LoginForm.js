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

  const checkForError = (type) => {
    return touched[type] && errors[type]
  }

  return (
    <div className="form-container">
      <Form className="main-form">
        <h1>Create Account</h1>
        <div className="errors"> 
          {checkForError('name') && <p className="error-text">{errors.name}</p>}
          {checkForError('email') && <p className="error-text">{errors.email}</p>}
          {checkForError('password') && <p className="error-text">{errors.password}</p>}
          {checkForError('tos') && <p className="error-text">{errors.tos}</p>}
        </div>
        <div>
          <Field 
            className={`text-field ${checkForError('name') && 'error-border'}`} 
            type="name" 
            name="name" 
            placeholder="Name" 
          />
        </div>
        <div>
          <Field 
            className={`text-field ${checkForError('email') && 'error-border'}`} 
            type="email" 
            name="email" 
            placeholder="Email" 
          />
        </div>
        <div>
          <Field 
            className={`text-field ${checkForError('password') && 'error-border'}`} 
            type="password" 
            name="password" 
            placeholder="Password" 
          />
        </div>
        <Field className="account-select" component="select" name="account">
          <option value="gold">Gold</option>
          <option value="silver">Silver</option>
          <option value="platinum">Platinum</option>
        </Field>
        <div className="hide">
          <TOS />
        </div>
        <label>
          <Field 
            type="checkbox" 
            name="tos" 
            className={`checkbox-field ${checkForError('tos') && 'tos-error-border'}`} 
            checked={values.tos} 
          />
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
      .required("Name is required"),
    email: Yup.string()
      .email("Email not valid")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be 6 characters or longer")
      .required("Password is required"),
    tos: Yup.bool()
      .oneOf([true], "Must agree to terms")
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
          // setUserList([...userList, values])
        })
        .catch(err => {
          console.log(err); 
          setSubmitting(false);
        });
    }
  }
})(LoginForm);

export default FormikLoginForm;