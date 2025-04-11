import styled from "styled-components";

export const Container = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 2px solid;

  width: 95%;
  margin: 0 auto;
  padding: 0.8rem 0.6rem 1rem;

  list-style: none;

  background-color: ${({ theme }) => theme.COLORS.BG_GRAY_700};
  color: ${({ theme }) => theme.COLORS.GRAY_100};
  font-weight: 500;

  p {
    color: ${({ theme }) => theme.COLORS.GRAY_100};
    font-weight: 600;
    margin-bottom: 0.4rem;
    font-size: 1.4rem;
    text-align: start;
  }

  span {
    color: ${({ theme }) => theme.COLORS.GRAY_300};
    font-weight: 500;
    font-size: 1.3rem;
  }

  margin-bottom: 2rem;
  border-radius: 8px;
`;

export const SaleContent = styled.div`
  display: flex;
  width: 100%;
  padding: 0 0.6rem;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
`;

export const Footer = styled.footer`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 0.6rem;
`;

export const Agent = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  padding: 0.2rem 0.6rem;
  font-size: 1.3rem;
  font-weight: 400;

  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.COLORS.GRAY_300};

  color: ${({ theme }) => theme.COLORS.GRAY_100};
  background-color: ${({ theme }) => theme.COLORS.BG_GRAY_900};
`;

export const SaleButtons = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;

  .leftbtns {
    display: flex;
    gap: 1.2rem;
    margin-right: 1rem;
    justify-content: space-between;
    margin-left: 0.6rem;

    button {
      padding: 0.3rem 0.6rem;
      border-radius: 4px;
      border: 0;
      background-color: ${({ theme }) => theme.COLORS.BG_RED};
      color: #daddcc;
      font-weight: 600;
      font-size: 1.2rem;
    }
  }
`;

export const Observation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  textarea {
    padding: 0.2rem 0.6rem;
    background-color: transparent;
    color: ${({ theme }) => theme.COLORS.GRAY_100};
    font-size: 1.3rem;
    font-weight: 300;
    border: 1px solid ${({ theme }) => theme.COLORS.GRAY_300};
    border-radius: 4px;
    resize: none;
  }
`;
export const ObservationBtn = styled.div`
  button {
    width: 5rem;
    padding: 0.2rem 0.6rem;
    margin-right: 0.8rem;
    background-color: transparent;
    color: ${({ theme }) => theme.COLORS.GRAY_100};
    font-size: 1.3rem;
    font-weight: 500;
    border: 1px solid ${({ theme }) => theme.COLORS.GRAY_300};
    border-radius: 4px;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
`;
