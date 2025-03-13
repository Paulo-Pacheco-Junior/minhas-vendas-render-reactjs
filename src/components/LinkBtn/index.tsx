import { Container } from "./styles";

interface LinkBtnProps {
  to: string;
  title: string;
  onClick?: () => void;
}

export function LinkBtn({ to, title, ...props }: LinkBtnProps) {
  return (
    <Container {...props} to={to}>
      {title}
    </Container>
  );
}
