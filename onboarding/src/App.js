import React, { useState, useEffect } from "react";

import FriendForm from "../src/form";

import schema from "./validation/formSchema";
import axios from "axios";
import * as yup from "yup";


export function Friend({ details }) {
  if (!details) {
    return <h3>Working fetching your user form &apos;s details...</h3>
  }

  return (
    <div className='friend container'>
      <h1>{details.username} </h1>
      <h2>{details.password}</h2>
      <p>Email: {details.email}</p>
      <p>Role: {details.role}</p>

      
    </div>
  )
}




const initialFormValues = {
  username:"",
  password: "",
  email: "",
  role: "",
 Terms: false,
  
};
const initialFormErrors = {
  username:"",
  password: "",
  email: "",
  role: "",
  Terms: false,
};
const initialusers = [];
const initialDisabled = true;

export default function App() {
 
  const [users, setusers] = useState(initialusers);  
  const [formValues, setFormValues] = useState(initialFormValues);  
  const [formErrors, setFormErrors] = useState(initialFormErrors);  
  const [disabled, setDisabled] = useState(initialDisabled);  

  const getusers = () => {

    axios
      .get("http:buddies.com/api/users")
      .then((res) => {
        setusers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postNewFriend = (newFriend) => {
    
    axios
      .post("http:buddies.com/api/users", newFriend)
      .then((res) => {
        setusers([res.data, ...users]);
        setFormValues(initialFormValues);
      })
      .catch((err) => {
        console.log(err);
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
    setFormValues(initialFormValues)
    const newFriend = {
      username: formValues.username.trim(),
      password: formValues.password.trim(),
      email: formValues.email.trim(),
      role: formValues.role.trim(),
      
      Terms: ["agree"].filter(
        (hobby) => formValues[hobby]
      ),
    };
    
    postNewFriend(newFriend);
  };

  useEffect(() => {
    getusers();
  }, []);

  
  useEffect(() => {
    
    schema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <div className="container">
      <header>
        <h1>Users App</h1>
      </header>

      <FriendForm
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />

      {users.map((friend) => {
        return <Friend key={friend.id} details={friend} />;
      })}
    </div>
  );
}

