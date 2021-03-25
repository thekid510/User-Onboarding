import React from "react";

export default function UserForm(props) {
  const { values, submit, change, disabled, errors } = props;

  const onSubmit = (evt) => {
    evt.preventDefault();
    submit();
  };

  const onChange = (evt) => {
    
    const { name, value, type, checked } = evt.target;
    const valueToUse = type === "checkbox" ? checked : value;
    change(name, valueToUse);
  };

  return (
    <form className="form container" onSubmit={onSubmit}>
      <div className="form-group submit">
        <h2>Register</h2>
        <button disabled={disabled}>submit</button>
        <div className="errors">
         
          <div>{errors.password}</div>
          <div>{errors.email}</div>
          <div>{errors.role}</div>
          
        </div>
      </div>

      <div className="form-group inputs">
        <h4>General information</h4>

        
        <label>
          Password&nbsp;
          <input
            value={values.password}
            onChange={onChange}
            name="password"
            type="text"
          />
        </label>

        <label>
          Email
          <input
            value={values.email}
            onChange={onChange}
            name="email"
            type="text"
          />
        </label>

       
        <label>
          Role
          <select onChange={onChange} value={values.role} name="role">
            <option value="">- Select an option -</option>
            <option value="student">Student</option>
            <option value="alumni">Alumni</option>
            <option value="instructor">Instructor</option>
            <option value="tl">Team Lead</option>
          </select>
        </label>
      </div>

      <div className="form-group checkboxes">
        <h4>Terms Of Service</h4>
        <label>
            Agree
          <input
            type="checkbox"
            name="Agree"
            checked={values.agree}
            onChange={onChange}
          />
        </label>
      </div>
    </form>
  );
}
