import styled from "styled-components";

export const StyledLabel = styled.label`
  font-size: 1.2rem;
  font-weight: bold;
  color: #000;
  margin-bottom: 0.5rem;
  display: block;
`;

export const StyledInput = styled.div`
  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1.2rem;
    color: #000;
    margin-bottom: 1rem;
    &:focus {
      outline: none;
      border-color: #000;
    }
  }
`;