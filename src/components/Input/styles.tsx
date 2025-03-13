import styled from "styled-components";

interface ContainerProps {
  $light?: boolean;
}

export const Container = styled.input<ContainerProps>`
  background-color: ${({ theme, $light }) =>
    $light ? theme.COLORS.BG_GRAY_700 : theme.COLORS.BG_GRAY_900};
  color: ${({ theme }) => theme.COLORS.GRAY_200};
  width: 100%;
  padding: 0 1.4rem;
  height: 4.5rem;
  outline: none;
  border: none;
  border-radius: 0.8rem;
`;
