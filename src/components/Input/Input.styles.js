import styled from 'styled-components';

const InputStyled = styled.input.attrs({
type: 'text',
})`
  font-size: 1.5rem;
  text-transform: uppercase;
  text-align: center;
  color: #951B81;
  padding: 1rem;
  background: #F9F9F9;
  border: 2px solid #951B81;
  box-shadow: 0 4px 4px rgba(0, 0, 0, .25);
  border-radius: 10px;
  &::placeholder {
    color: rgba(149, 27, 129, 0.5);
  }
    &:focus {
      outline: none;
      border: 2px solid #CD1719;
      box-shadow: inset 0 4px 4px rgba(0, 0, 0, .25);
      color: rgba(205, 23, 25, 0.9);
      &::placeholder {
        color: rgba(205, 23, 25, 0.5);
    }
  }
`;

export {InputStyled};