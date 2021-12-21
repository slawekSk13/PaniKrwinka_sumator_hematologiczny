import styled from "styled-components";

import arrow from '../../assets/arrowd.png';

const SelectStyled = styled.select`
  border: none;
  width: 75%;
  margin: 1rem;
  padding: 1.2rem;
  font-size: 1em;
  font-weight: 600;
  box-shadow: 0 4px 4px 0 ${(props) => props.colors.shadowColor};
  border-radius: 11px;
  color: ${(props) => props.colors.fontColor};
  background-image: url(${arrow});
  background-position: 94%;
  background-size: 15%;
  background-repeat: no-repeat;
  background-color: ${(props) => props.colors.primaryColor};
  -webkit-appearance: none;
  transition: 0.4s;
  &:hover{
    background-color: ${(props) => props.colors.accentColor};
  }
  &:hover,
  &:active,
  &:focus {
    outline: none;
    cursor: pointer;
  }
 

  option {
    color: ${(props) => props.colors.accentColor};
    background-color: ${(props) => props.colors.fontColor};
  }
`;

export { SelectStyled };
