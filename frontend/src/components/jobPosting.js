import React, { useState } from 'react';



const API_BASE =  'http://localhost:9876/api';

function PostJob() {
    const [formData, setFormData] = useState({ title: '', description: '', experienceLevel: 'BEGINNER', endDate: '', candidates: [] });
    const [message, setMessage] = useState('');
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleCandidateChange = (e, index) => {
      const updatedCandidates = [...formData.candidates];
      updatedCandidates[index] = { email: e.target.value };
      setFormData({ ...formData, candidates: updatedCandidates });
    };
  
    const addCandidateField = () => {
      setFormData({ ...formData, candidates: [...formData.candidates, { email: '' }] });
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch(`${API_BASE}/jobs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(formData),
          });
          const data = await response.json();
          setMessage(data.message);
        } catch (error) {
          setMessage('Job posting failed');
        }
    };
    
  
    return (
      <div>
        <h2>Post Job</h2>
        <form onSubmit={handleSubmit}>
          <input name="title" placeholder="Job Title" onChange={handleChange} required />
          <textarea name="description" placeholder="Job Description" onChange={handleChange} required />
          <select name="experienceLevel" onChange={handleChange}>
            <option value="BEGINNER">BEGINNER</option>
            <option value="INTERMEDIATE">INTERMEDIATE</option>
            <option value="EXPERT">EXPERT</option>
          </select>
          <input name="endDate" type="date" onChange={handleChange} required />
          <button type="button" onClick={addCandidateField}>Add Candidate</button>
          {formData.candidates.map((candidate, index) => (
            <input
              key={index}
              placeholder="Candidate Email"
              value={candidate.email}
              onChange={(e) => handleCandidateChange(e, index)}
              required
            />
          ))}
          <button type="submit">Post Job</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    );
}

export default PostJob;
  