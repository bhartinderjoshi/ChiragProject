import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'

const LoginPopup = ({ setShowLogin }) => {

  const [currState, setCurrState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  

  try {
    const endpoint = currState === "Login" ? "/login" : "/signup";
    const res = await fetch(`http://localhost:5000${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        currState === "Login"
          ? { email, password }
          : { name, email, password }
      ),
    })

    const data = await res.json();

    if (data.success) {
      alert(`${currState} successful`);
      console.log(data);
      setShowLogin(false);
    } else {
      alert(`${data.message || `${currState} failed`} `);
      console.log(data);
    }
  }
  catch (err) {
    console.log(err);
    alert("Something went wrong");

  }
};
return (
  <div className='login-popup'>
    <form className="login-popup-container" onSubmit={handleSubmit}>
      <div className="login-popup-title">
        <h2>{currState}</h2>
        <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
      </div>
      <div className="login-popup-inputs">
        {currState === "Login" ? <></> : <input type="text" placeholder='Your name' value={name} onChange={(e)=>setName(e.target.value)}required />}

        <input type="email" placeholder='Your email' value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button>{currState === "Sign Up" ? "Create account" : "Login"}</button>
      <div className="login-popup-condition">
        <input type="checkbox" required />
        <p>By continuing, I agree to the terms of use & privacy policy.</p>
      </div>
      {currState === "Login"
        ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span>
        </p>
        : <p>Already have an account?<span onClick={() => setCurrState("Login")}>login here</span></p>
      }


    </form>
  </div>
)
}

export default LoginPopup
