import React, { useState } from 'react';
import './CSS/LoginSignup.css';

const LoginSignup = () => {
  // State to keep track of the current form (either "Login" or "Sign Up")
  const [state, setState] = useState('Login');

  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
  })

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  //login call the api 
  const login = async () => {
    console.log("Login Function Executed", formData);
    let responseData;
    await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),


    }).then((response) => response.json()).then((data) => responseData = data)
    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);

      window.location.replace("/");

    }
    else {
      alert(responseData.errors)
    }
  }
  //sign up all the api
  const signup = async () => {
    console.log("Signup Function Executed", formData);
    let responseData;
    await fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data)
    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    }
    else {
      alert(responseData.errors)
    }
  }

  // Handlers for switching between login and signup forms
  const handleSwitchToLogin = () => setState('Login');
  const handleSwitchToSignup = () => setState('Sign Up');

  // JSX for the component
  return (
    <div className='loginsignup'>
      <div className='loginsignup-container'>
        <h1>{state}</h1>
        <div className='loginsignup-fields'>
          {/* Show "Your Name" input only in Sign Up form */}
          {state === 'Sign Up' && (
            <input name='name' value={formData.name} onChange={changeHandler} type='text' placeholder='Your Name' required />
          )}
          {/* Email input, common to both Login and Sign Up */}
          <input name='email' value={formData.email} onChange={changeHandler} type='email' placeholder='Your Email' required />
          {/* Password input, common to both Login and Sign Up */}
          <input name='password' value={formData.password} onChange={changeHandler} type='password' placeholder='Password' required />
        </div>

        {/* Continue button */}
        <button onClick={() => { state === "Login" ? login() : signup() }}>Continue</button>

        {/* Conditionally render "Already have an account?" if in Sign Up state */}
        {state === 'Sign Up' && (
          <p className='loginsignup-login'>
            Already have an account?{' '}
            <span onClick={handleSwitchToLogin} style={{ cursor: 'pointer' }}>
              Login here
            </span>
          </p>
        )}

        {/* Always render "Create a new account" link */}
        {state === 'Login' && (
          <p className='loginsignup-login'>
            Create a new account?{' '}
            <span onClick={handleSwitchToSignup} style={{ cursor: 'pointer' }}>
              Sign Up here
            </span>
          </p>
        )}

        {/* Agreement section */}
        <div className='loginsignup-agree'>
          <input type='checkbox' name='terms' id='terms' required />
          <label htmlFor='terms'>
            By continuing, I agree to the terms of use & privacy policy.
          </label>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
