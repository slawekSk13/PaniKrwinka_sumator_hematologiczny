import styled, { keyframes } from "styled-components";

const Input = styled.input`
  height: 0;
  width: 0;
  opacity: 0;
  z-index: -1;
`;

const popIn = keyframes`
from {
  opacity: 0;
  transform: translate(-50%, -50%) scale(1.5) ;
}
to {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1) ;
}
`;

const Label = styled.label`
  color: ${props => props.colors.primaryColor};
  position: relative;
  display: inline-block;
  cursor: pointer;
  margin: 1.3rem 1.2rem .6rem;
  font-size: 1.2rem;
  text-transform: lowercase;
  &:last-of-type {
    margin-right: 0;
  }
`;

const Indicator = styled.div`
  border: 3px solid ${props => props.colors.primaryColor};
  border-radius: 1em;
  width: 1.05em;
  height: 1.05em;
  position: absolute;
  top: .3rem;
  left: -1.3em;

  ${Label}:hover & {
    background: ${props => props.colors.placeholderPrimaryColor};
  }

  &::after {
    content: "";
    position: absolute;
    display: none;
  }

  ${Input}:checked + &::after {
    display: block;
    border: solid ${props => props.colors.primaryColor};
    border-radius: 1em;
    background-color: ${props => props.colors.primaryColor};
    width: 0.2em;
    height: 0.2em;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation-name: ${popIn};
    animation-duration: 0.4s;
    animation-fill-mode: forwards;
  }
`;

export {Input, Label, Indicator}