import { ComponentProps } from "react";
import { Container } from "./styles";

interface ButtonProps extends ComponentProps<"button"> {
  title: string;
}

export function Button({ title, ...props }: ButtonProps) {
  return <Container {...props}>{title}</Container>;
}
