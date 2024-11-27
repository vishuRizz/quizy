import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const SignupCard = () => {
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("https://quizy-app.onrender.com/auth/register", {
        role,
        username,
        password,
      });

      const token = `Bearer ${response.data.access_token}`;
      const userRole = response.data.role;
      localStorage.setItem("role", userRole);
      localStorage.setItem("token", token);

      if (userRole === "teacher") {
        navigate("/teacher-dashboard");
      } else if (userRole === "student") {
        navigate("/all-quizes");
      }
    } catch (error) {
      console.error("Login failed:", error.response ? error.response.data : error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledWrapper>
      <form className="form" onSubmit={handleSignIn}>
        <div className="flex-column">
          <label>Role</label>
          <div className="inputForm">
            <select
              className="dropdown"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select Role</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </select>
          </div>
        </div>
        <div className="flex-column">
          <label>Username</label>
        </div>
        <div className="inputForm">
          <input
            type="text"
            className="input"
            placeholder="Enter your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="flex-column">
          <label>Password</label>
        </div>
        <div className="inputForm">
          <input
            type="password"
            className="input"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <StyledButton type="submit" disabled={loading} loading={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </StyledButton>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #ffffff;
    padding: 30px;
    width: 450px;
    border-radius: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .flex-column > label {
    color: #151717;
    font-weight: 600;
  }

  .inputForm {
    border: 1.5px solid #ecedec;
    border-radius: 10px;
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    transition: 0.2s ease-in-out;
  }

  .dropdown {
    width: 100%;
    height: 100%;
    border: none;
    background-color: transparent;
    font-size: 16px;
    color: #151717;
    font-weight: 500;
  }

  .dropdown:focus {
    outline: none;
  }

  .input {
    margin-left: 10px;
    border-radius: 10px;
    border: none;
    width: 85%;
    height: 100%;
  }

  .input:focus {
    outline: none;
  }

  .inputForm:focus-within {
    border: 1.5px solid #2d79f3;
  }
`;

const StyledButton = styled.button`
  margin: 20px 0 10px 0;
  background-color: ${(props) => (props.loading ? '#a5a5a5' : '#151717')};
  border: none;
  color: white;
  font-size: 15px;
  font-weight: 500;
  border-radius: 10px;
  height: 50px;
  width: 100%;
  cursor: ${(props) => (props.loading ? 'not-allowed' : 'pointer')};
  &:hover {
    background-color: ${(props) => (props.loading ? '#a5a5a5' : '#252727')};
  }
`;

export default SignupCard;
