
import React, { useState } from 'react';

const API_BASE = 'http://localhost:9876/api';

function Register() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', mobile: '' });
    const [message, setMessage] = useState('');
    console.log(formData)
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch(`${API_BASE}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          });
          const data = await response.json();
          setMessage(data.message);
        } catch (error) {
          setMessage('Registration failed');
        }
    };


    return (
      <div>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
          <input name="mobile" placeholder="Mobile" onChange={handleChange} required />
          <button type="submit">Register</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    );
}
  
export default Register;