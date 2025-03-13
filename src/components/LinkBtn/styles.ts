import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled(Link)`
  text-align: center;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.COLORS.GRAY_200};
  padding: 0.6rem 1.6rem;
`;
