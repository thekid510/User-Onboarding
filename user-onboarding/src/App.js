import './App.css';
import UserForm from "./Form"
import User from "./user"
import * as yup from "yup"
import axios from 'axios'
import React, { useState, useEffect } from "react"
import schema from "../src/validation/formSchema"


const initialFormValues = {
  username: "",
  email: "",
  password: "",
  role: "",
  Terms: false,
   
  
};
const initialFormErrors = {
  username: "",
  email: "",
  role: "",
  password: "",
  Terms: false,
 
};
const initialUsers = [];
const initialDisabled = true;

export default function App() {
  const [users, setUsers] = useState([initialUsers]); // array of user objects
  const [formValues, setFormValues] = useState(initialFormValues); // object
  const [formErrors, setFormErrors] = useState(initialFormErrors); // object
  const [disabled, setDisabled] = useState(initialDisabled); // boolean

  
 
  const postNewUser = (newUser) => {
    axios
      .post("https://reqres.in/api/users", newUser)
      .then((res) => {
        setUsers([res.data, ...users]);
        setFormValues(initialFormValues);
      })
      .catch((err) => {
        console.log(err);
        debugger;
      });
  };

  
  const inputChange = (name, value) => {
    yup
      .reach(schema, name) 
     
      .validate(value)
      .then(() => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });

    setFormValues({
      ...formValues,
      [name]: value, 
    });
  };

  const formSubmit = () => {
    const newUser = {
      username: formValues.username.trim(),
      email: formValues.email.trim(),
      role: formValues.role.trim(),
      Terms: ["agree"].filter(
        (hobby) => formValues[hobby]
      ),
    };
    
    postNewUser(newUser);
  };

  useEffect(() => {
   
    schema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <div className="container">
      <header>
        <h1>Onboarding App</h1>
      </header>

      <UserForm
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
     
     />
     
     {users.map((user) => {
        return <User key={user.id} role={user} />;
      })};
    </div>
  );
}
