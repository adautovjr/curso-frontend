import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";
import { StyledInput, StyledLabel } from "./styles";

interface Props {
  name: string;
  label?: string;
}

type InputProps = JSX.IntrinsicElements["input"] & Props;

export const Input: React.FC<InputProps> = ({ name, label, ...rest }) => {
  const inputRef = useRef(
    null
  ) as React.MutableRefObject<HTMLInputElement | null>;
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <div className="input-block">
      {label && <StyledLabel htmlFor={fieldName}>{label}</StyledLabel>}
      <StyledInput>
        <input
          id={fieldName}
          ref={inputRef}
          defaultValue={defaultValue}
          {...rest}
        />
      </StyledInput>
      {error && <div>{error} </div>}
    </div>
  );
};

export default Input;
