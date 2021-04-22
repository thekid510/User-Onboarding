import React from 'react'

export function User({ details }) {
    if (!details) {
      return <h3>Working fetching your user form &apos;s details...</h3>
    }
  
    return (
      <div className='user container'>
        <h1>{details.username} </h1>
        <h2>{details.password}</h2>
        <p>Email: {details.email}</p>
        <p>Role: {details.role}</p>
  
        {
        !!details.hobbies && !!details.hobbies.length &&
        <div>
          Hobbies:
          <ul>
            {details.hobbies.map((like, idx) => <li key={idx}>{like}</li>)}
          </ul>
        </div>
      }
        
      </div>
    )
  }
  