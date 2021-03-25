import React, { useState, useEffect } from "react";

import FriendForm from "../src/form";

import schema from "./validation/formSchema";
import axios from "axios";
import * as yup from "yup";


export function Friend({ details }) {
  if (!details) {
    return <h3>Working fetching your friend&apos;s details...</h3>
  }

  return (
    <div className='friend container'>
      <h2>{details.password}</h2>
      <p>Email: {details.email}</p>
      <p>Role: {details.role}</p>

      
    </div>
  )
}




const initialFormValues = {
  password: "",
  email: "",
  role: "",
 Terms: false,
  
};
const initialFormErrors = {
  password: "",
  email: "",
  role: "",
};
const initialFriends = [];
const initialDisabled = true;

export default function App() {
 
  const [friends, setFriends] = useState(initialFriends); // array of friend objects
  const [formValues, setFormValues] = useState(initialFormValues); // object
  const [formErrors, setFormErrors] = useState(initialFormErrors); // object
  const [disabled, setDisabled] = useState(initialDisabled); // boolean

  const getFriends = () => {

    axios
      .get("http://buddies.com/api/friends")
      .then((res) => {
        setFriends(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postNewFriend = (newFriend) => {
    
    axios
      .post("http://buddies.com/api/friends", newFriend)
      .then((res) => {
        setFriends([res.data, ...friends]);
        setFormValues(initialFormValues);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const inputChange = (password, value) => {
    yup
    .reach(schema, password) 
    .validate(value) 
    .then(() => {
     
      setFormErrors({
        ...formErrors,
        [password]: "",
      });
    })
    .catch((err) => {
      setFormErrors({
        ...formErrors,
        [password]: err.errors[0],
      });
    });
    
    setFormValues({
      ...formValues,
      [password]: value, 
    });
  };

  const formSubmit = () => {
    const newFriend = {
      password: formValues.password.trim(),
      email: formValues.email.trim(),
      role: formValues.role.trim(),
      civil: formValues.civil.trim(),
      Terms: ["agree"].filter(
        (hobby) => formValues[hobby]
      ),
    };
    postNewFriend(newFriend);
  };

  useEffect(() => {
    getFriends();
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

      {friends.map((friend) => {
        return <Friend key={friend.id} details={friend} />;
      })}
    </div>
  );
}

