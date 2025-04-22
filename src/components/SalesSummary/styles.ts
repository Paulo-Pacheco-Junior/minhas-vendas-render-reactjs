import styled from "styled-components";

export const SalesFilter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 2rem;
`;

export const SalesCount = styled.div`
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
