import React, { ComponentProps } from "react";
import { Container } from "./styles";

interface InputProps extends ComponentProps<"input"> {
  lightInput?: boolean;
}

// eslint-disable-next-line react/display-name
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ lightInput = false, ...props }, ref) => {
    return <Container {...props} $light={lightInput} ref={ref} />;
  }
);
