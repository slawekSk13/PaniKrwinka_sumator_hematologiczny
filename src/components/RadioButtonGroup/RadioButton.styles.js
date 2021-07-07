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
  color: #951B81;
  position: relative;
  display: inline-block;
  cursor: pointer;
  margin: 0.6rem 2rem;
  font-size: 1.5rem;
  text-transform: lowercase;
`;

const Indicator = styled.div`
  border: 3px solid #951B81;
  border-radius: 1em;
  width: 1.2em;
  height: 1.2em;
  position: absolute;
  top: .25rem;
  left: -1.75em;

  ${Label}:hover & {
    background: hsla(310, 69%, 35%, .3);
  }

  &::after {
    content: "";
    position: absolute;
    display: none;
  }

  ${Input}:checked + &::after {
    display: block;
    border: solid #951B81;
    border-radius: 1em;
    background-color: #951B81;
    width: 0.5em;
    height: 0.5em;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation-name: ${popIn};
    animation-duration: 0.4s;
    animation-fill-mode: forwards;
  }
`;

export {Input, Label, Indicator}