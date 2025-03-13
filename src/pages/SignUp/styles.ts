import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  place-content: center;
  height: 100vh;

  > div {
    background-color: ${({ theme }) => theme.COLORS.BG_GRAY_700};
    width: 40rem;
    padding: 4rem 4rem 7rem;
    margin: 0 auto;
    border-radius: 0.5rem;

    h1 {
      margin-bottom: 0.8rem;
    }

    h2 {
      margin: 3rem 0 2rem;
    }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  hr {
    margin: 1.4rem 0;
    border: 0px;
    border-top: 1px solid #a0a0a0;
  }
`;

export const ErrorMsg = styled.div`
  color: #ed8285;
  background-color: #513036;
  padding: 0 1.4rem;
  margin: 0.6rem 0 1rem;
`;

export const NavBtn = styled(Link)`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1.4rem;
  background-color: ${({ theme }) => theme.COLORS.BG_GRAY_700};
  color: ${({ theme }) => theme.COLORS.GRAY_100};

  text-decoration-thickness: 12%;
  text-decoration-color: #8234e9;
  text-underline-offset: 3px;

  &:hover {
    filter: brightness(1);
    transition: 0.2s;
    color: white;
  }

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;
