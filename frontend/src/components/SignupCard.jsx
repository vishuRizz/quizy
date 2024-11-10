import React, { useState } from 'react';
import styled from 'styled-components';

const SignupCard = () => {
    const [role, setRole] = useState('Teacher');
  return (
    <StyledWrapper>
    <form className="form">
      {/* Role Selection */}
      <RoleSelection>
        <span className={role === 'Teacher' ? 'active' : ''} onClick={() => setRole('Teacher')}>
          Teacher
        </span>
        <span className={role === 'Student' ? 'active' : ''} onClick={() => setRole('Student')}>
          Student
        </span>
      </RoleSelection>

      <div className="flex-column">
        <label>Username </label>
      </div>
      <div className="inputForm">
        {/* Username Input */}
        <svg height={20} viewBox="0 0 32 32" width={20} xmlns="http://www.w3.org/2000/svg">
          {/* SVG Path */}
        </svg>
        <input type="text" className="input" placeholder="Enter your Email" />
      </div>

      <div className="flex-column">
        <label>Password </label>
      </div>
      <div className="inputForm">
        {/* Password Input */}
        <svg height={20} viewBox="-64 0 512 512" width={20} xmlns="http://www.w3.org/2000/svg">
          {/* SVG Path */}
        </svg>
        <input type="password" className="input" placeholder="Enter your Password" />
      </div>

      {/* Other form elements */}
      <button className="button-submit">Sign In</button>
    </form>
  </StyledWrapper>
  );
}
const RoleSelection = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  margin-bottom: 20px;
  
  span {
    cursor: pointer;
    padding: 8px 20px;
    border-radius: 20px;
    font-weight: 500;
    color: #777;
    transition: 0.3s ease;
  }

  .active {
    background-color: #2d79f3;
    color: white;
  }

  span:hover {
    background-color: #2d79f3;
    color: white;
  }
`;

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

  ::placeholder {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .form button {
    align-self: flex-end;
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

  .flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
  }

  .flex-row > div > label {
    font-size: 14px;
    color: black;
    font-weight: 400;
  }

  .span {
    font-size: 14px;
    margin-left: 5px;
    color: #2d79f3;
    font-weight: 500;
    cursor: pointer;
  }

  .button-submit {
    margin: 20px 0 10px 0;
    background-color: #151717;
    border: none;
    color: white;
    font-size: 15px;
    font-weight: 500;
    border-radius: 10px;
    height: 50px;
    width: 100%;
    cursor: pointer;
  }

  .button-submit:hover {
    background-color: #252727;
  }

  .p {
    text-align: center;
    color: black;
    font-size: 14px;
    margin: 5px 0;
  }

  .btn {
    margin-top: 10px;
    width: 100%;
    height: 50px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    gap: 10px;
    border: 1px solid #ededef;
    background-color: white;
    cursor: pointer;
    transition: 0.2s ease-in-out;
  }

  .btn:hover {
    border: 1px solid #2d79f3;
    ;
  }`;

export default SignupCard;
