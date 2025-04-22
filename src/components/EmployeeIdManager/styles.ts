import styled from "styled-components";

export const EmployeeIdInputs = styled.div`
  display: flex;
  gap: 2rem;
  margin-left: 4rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 2rem;
  margin-top: 6rem;
  padding-left: 4rem;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  input {
    padding: 0 0.4rem;
    border-radius: 4px;
    width: 10rem;
    margin-right: 1rem;
    border: 1px solid white;
    background-color: rgba(244, 244, 244, 0.9);
  }

  button {
    width: 40%;
    width: 9rem;
    padding: 0.4rem 0;
    border: none;
    border-radius: 0.3rem;
    font-weight: bold;
    font-size: 1.2rem;
    background-color: rgba(138, 242, 78, 0.59);
    color: #192b1c;
    cursor: pointer;
  }
`;
