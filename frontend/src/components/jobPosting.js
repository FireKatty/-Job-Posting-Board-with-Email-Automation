

import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const API_BASE = 'https://job-posting-board-with-email-automation-lr7m.onrender.com/api';

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
  min-height: 100vh;
  background: url('bg.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: white;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 500px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  @media (max-width: 600px) {
    padding: 15px;
    max-width: 90%;
  }
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid ${(props) => (props.isInvalid ? 'red' : '#ddd')};
  border-radius: 5px;
  &:focus {
    outline: none;
    border-color: ${(props) => (props.isInvalid ? 'red' : '#007bff')};
    box-shadow: 0 0 3px ${(props) => (props.isInvalid ? 'rgba(255, 0, 0, 0.5)' : 'rgba(0, 123, 255, 0.5)')};
  }
`;

const TextArea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: vertical;
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 3px rgba(0, 123, 255, 0.5);
  }
`;

const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  color: #fff;
  background-color: #28a745;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #218838;
  }
`;

const AddButton = styled(Button)`
  background-color: #007bff;
  &:hover {
    background-color: #0056b3;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #dc3545;
  &:hover {
    background-color: #c82333;
  }
`;

const LogoutButton = styled(Button)`
  background-color: #ff5722;
  &:hover {
    background-color: #e64a19;
  }
  align-self: flex-end;
  margin-bottom: 10px;
`;

const CandidateField = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CandidateError = styled.span`
  font-size: 18px;
  color: black;
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: bold;
`;

const Message = styled.p`
  margin-top: 15px;
  font-size: 32px;
  color: ${(props) => (props.success ? 'green' : 'chartreuse')};
`;

function PostJob() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    experienceLevel: 'BEGINNER',
    endDate: '',
    candidates: [],
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCandidateChange = (e, index) => {
    const updatedCandidates = [...formData.candidates];
    updatedCandidates[index] = { email: e.target.value };
    setFormData({ ...formData, candidates: updatedCandidates });
  };

  const addCandidateField = () => {
    setFormData({ ...formData, candidates: [...formData.candidates, { email: '', isValid: true }] });
  };

  const deleteCandidateField = (index) => {
    const updatedCandidates = formData.candidates.filter((_, i) => i !== index);
    setFormData({ ...formData, candidates: updatedCandidates });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const areAllEmailsValid = formData.candidates.every((candidate) => isValidEmail(candidate.email));

    if (!areAllEmailsValid) {
      setMessage('Please ensure all candidate emails are valid.');
      return;
    }

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

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data from localStorage
    navigate('/'); // Redirect to login
  };

  // const handleLogout = () => {
  //   localStorage.removeItem('user'); // Clear user data from local storage
  //   fetch(`${API_BASE}/auth/logout`, {
  //     method: 'POST',
  //     credentials: 'include', // Ensure cookies are sent for logout
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         console.log('Logged out successfully');
  //         navigate('/'); // Redirect to login
  //       } else {
  //         console.error('Failed to logout');
  //       }
  //     })
  //     .catch((error) => console.error('Error during logout:', error));
  // };
  
  return (
    <Container>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      <Title>Post Job</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          name="title"
          placeholder="Job Title"
          onChange={handleChange}
          required
        />
        <TextArea
          name="description"
          placeholder="Job Description"
          rows="4"
          onChange={handleChange}
          required
        />
        <Select name="experienceLevel" onChange={handleChange}>
          <option value="BEGINNER">BEGINNER</option>
          <option value="INTERMEDIATE">INTERMEDIATE</option>
          <option value="EXPERT">EXPERT</option>
        </Select>
        <Input
          name="endDate"
          type="date"
          onChange={handleChange}
          required
        />
        <AddButton type="button" onClick={addCandidateField}>
          Add Candidate
        </AddButton>
        {formData.candidates.map((candidate, index) => (
          <CandidateField key={index}>
            <Input
              placeholder="Candidate Email"
              value={candidate.email}
              onChange={(e) => handleCandidateChange(e, index)}
              isInvalid={!isValidEmail(candidate.email)}
              required
            />
            <DeleteButton type="button" onClick={() => deleteCandidateField(index)}>
              Delete
            </DeleteButton>
            {!isValidEmail(candidate.email) && (
              <CandidateError>Invalid email format</CandidateError>
            )}
          </CandidateField>
        ))}
        <Button type="submit">Post Job</Button>
      </Form>
      {message && <Message success={message === 'Job posted successfully'}>{message}</Message>}
    </Container>
  );
}

export default PostJob;
