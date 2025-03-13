import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 90%;
  margin: 8rem auto;
  padding: 2rem;

  list-style: none;

  background-color: ${({ theme }) => theme.COLORS.BG_GRAY_700};
  color: ${({ theme }) => theme.COLORS.GRAY_100};
  font-weight: 500;

  p {
    margin-bottom: 1.2rem;
  }

  span {
    color: ${({ theme }) => theme.COLORS.GRAY_100};
    font-weight: 400;
  }

  margin-bottom: 4rem;
  border-radius: 8px;

  form {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 2rem;

    label {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      width: 100%;
    }

    input,
    select {
      padding: 1rem;
      border-radius: 8px;
      border: 0;
      font-size: 1.6rem;
      font-weight: 600;
      width: 100%;
    }

    div {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      margin: 2rem;
    }

    .buttons {
      display: flex;
      justify-content: flex-end;
      align-items: end;
    }
  }
`;

export const NewSaleBtn = styled.button`
  background-color: ${({ theme }) => theme.COLORS.BG_ORANGE};
  background-color: #35a69b;
  background-color: #cdcd69;
  color: #daddcc;
  color: black;
  font-size: 1.6rem;
  font-weight: 700;
  /* width: 12rem; */
  padding: 1rem 1.2rem;
  outline: none;
  border: none;
  border-radius: 0.8rem;
`;
