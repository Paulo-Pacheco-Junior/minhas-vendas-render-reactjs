import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  main {
    padding-top: 3.5rem;
    padding-left: 10rem;
  }

  p {
    text-align: center;
  }

  select,
  option {
    margin-top: 1rem;
    padding: 0.4rem 0.5rem;
    font-weight: 500;
    background-color: ${({ theme }) => theme.COLORS.BG_GRAY_900};
    color: ${({ theme }) => theme.COLORS.GRAY_100};
    border-radius: 4px;
  }

  select {
    margin-left: 5rem;
    margin-right: 1rem;
  }
`;

export const NewSaleBtn = styled(Link)`
  display: block;
  position: fixed;
  bottom: 30px;
  right: 40px;
  text-decoration: none;
  background-color: ${({ theme }) => theme.COLORS.BG_ORANGE};
  color: black;
  background-color: #8af24e;
  color: #192b1c;
  font-size: 1.8rem;
  font-weight: 700;
  padding: 1.2rem 1.6rem;
  outline: none;
  border: none;
  border-radius: 0.8rem;
`;

export const ScrollBtn = styled.button`
  display: block;
  position: fixed;
  bottom: 30px;
  right: 40px;
  text-decoration: none;
  /* background-color: ${({ theme }) => theme.COLORS.BG_ORANGE}; */
  color: black;
  font-size: 1.8rem;
  font-weight: 700;
  padding: 0.2rem 0.8rem;
  outline: none;
  border: none;
  border-radius: 0.8rem;
  opacity: 0.5;
`;

export const SalesFilter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 4rem;
`;

export const SalesCount = styled.div`
  margin-top: 3rem;
  margin-left: 1rem;

  span {
    font-size: 2rem;
    padding: 0.2rem 1rem;
    font-weight: 700;
    background-color: ${({ theme }) => theme.COLORS.BG_GRAY_700};
    color: ${({ theme }) => theme.COLORS.GRAY_100};

    border-radius: 8px;
  }
`;

export const SalesFilterSellers = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 2rem;
`;

export const SalesCountSellers = styled.div`
  display: flex;
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 0.4rem;
  margin-top: -1rem;
  margin-bottom: -5rem;

  span {
    font-size: 1.2rem;
    padding: 0 0.4rem;
    font-weight: 600;
    background-color: ${({ theme }) => theme.COLORS.BG_GRAY_700};
    color: ${({ theme }) => theme.COLORS.GRAY_100};
    border-radius: 8px;
  }
`;

export const AgentRoleButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 1rem;
  margin: 0 auto;
  margin-top: 3rem;

  button {
    text-align: center;
    font-size: 1.5rem;
    color: white;
    font-weight: 700;
    padding: 0.6rem 1.6rem;
    background-color: transparent;
    border-radius: 8px;

    &.selected {
      background-color: #8bf24e;
      color: #192b1c;
    }
  }
`;

export const EmployeeIdInputs = styled.div`
  display: flex;
  gap: 2rem;
  margin-left: 4rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 2rem;

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
