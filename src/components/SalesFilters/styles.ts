import styled from "styled-components";

export const Container = styled.div`
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
