import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 1.4rem;
  margin-top: 3rem;
  float: left;
`;

export const LinkButton = styled(Link)`
  display: block;
  text-decoration: none;
  text-align: center;
  background-color: ${({ theme }) => theme.COLORS.BG_ORANGE};
  background-color: #8af24e;
  color: #192b1c;
  padding: 0.5rem 0.8rem;
  width: 10rem;
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 2rem;
  border-radius: 8px;
`;
